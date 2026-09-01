#!/usr/bin/env node
/*
 * Build-time loader for published CMS blog posts.
 * Used by prerender-routes and generate-sitemap. Never throws: missing DB/API
 * returns [] plus a warning so GitHub Pages static builds still succeed.
 */

import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

function applyEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, 'utf8');
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

export function loadBuildEnv() {
  applyEnvFile(resolve(rootDir, '.env'));
  applyEnvFile(resolve(rootDir, 'backend/.env'));
}

function dateField(value) {
  if (!value) return '';
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value);
  return text.length >= 10 ? text.slice(0, 10) : text;
}

export function mapCmsRow(row) {
  const tags = Array.isArray(row.tags)
    ? row.tags
    : typeof row.tags === 'string'
      ? row.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

  return {
    id: row.source === 'static' ? row.id : `cms-${row.id}`,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    metaDescription: row.meta_description || row.metaDescription || row.excerpt || '',
    keywords: row.keywords || '',
    readingTime: row.reading_time || row.readingTime || '',
    featuredImage: row.featured_image || row.featuredImage || '',
    socialImage: row.social_image || row.socialImage || '',
    author: row.author || 'Ondosoft',
    authorRole: row.author_role || row.authorRole || '',
    publishDate: dateField(row.publish_date || row.publishDate),
    lastUpdated: dateField(row.updated_at || row.lastUpdated || row.publish_date || row.publishDate),
    category: row.category || 'web-development',
    tags,
    featured: Boolean(row.featured),
    content: row.content || '',
    published: row.published !== false,
    source: row.source || 'cms',
  };
}

export function mergeBlogPosts(staticPosts, cmsPosts) {
  const staticList = Array.isArray(staticPosts) ? staticPosts : [];
  const cmsList = Array.isArray(cmsPosts) ? cmsPosts.filter((post) => post?.slug) : [];
  const cmsSlugs = new Set(cmsList.map((post) => post.slug));
  return [...cmsList, ...staticList.filter((post) => post?.slug && !cmsSlugs.has(post.slug))].sort(
    (a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0),
  );
}

function resolvePgPool() {
  const candidates = [
    resolve(rootDir, 'backend/package.json'),
    resolve(rootDir, 'package.json'),
  ];
  for (const pkg of candidates) {
    try {
      const requireFrom = createRequire(pkg);
      return requireFrom('pg').Pool;
    } catch {
      // try the next package root
    }
  }
  return null;
}

function apiBlogsUrl() {
  const explicit = (process.env.PRERENDER_BLOGS_API || '').trim();
  if (explicit.startsWith('http')) return explicit;

  const vite = (process.env.VITE_API_URL || '').trim();
  if (!vite.startsWith('http')) return '';
  const withApi = vite.endsWith('/api')
    ? vite
    : vite.endsWith('/')
      ? `${vite}api`
      : `${vite}/api`;
  return `${withApi.replace(/\/$/, '')}/blogs`;
}

async function fetchFromDatabase(databaseUrl) {
  const Pool = resolvePgPool();
  if (!Pool) {
    return { posts: [], warning: 'CMS blogs skipped: `pg` is not installed (expected under backend/).' };
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
    max: 1,
    connectionTimeoutMillis: 5000,
    statement_timeout: 10000,
  });

  try {
    const result = await pool.query(
      `SELECT id, title, slug, excerpt, meta_description, keywords, content, author, category, tags,
              featured_image, social_image, publish_date, published, featured, created_at, updated_at
       FROM blog_posts
       WHERE published = true
       ORDER BY publish_date DESC NULLS LAST, created_at DESC`,
    );
    return { posts: result.rows.map(mapCmsRow), source: 'database' };
  } finally {
    await pool.end().catch(() => {});
  }
}

async function fetchFromApi(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    return { posts: [], warning: `CMS blogs skipped: ${url} returned HTTP ${res.status}.` };
  }
  const data = await res.json().catch(() => ({}));
  const rows = Array.isArray(data.posts) ? data.posts : [];
  return { posts: rows.map(mapCmsRow), source: 'api' };
}

export async function fetchPublishedCmsPosts() {
  loadBuildEnv();

  const databaseUrl = (process.env.DATABASE_URL || '').trim();
  if (databaseUrl) {
    try {
      const fromDb = await fetchFromDatabase(databaseUrl);
      if (!fromDb.warning) return fromDb;
    } catch (error) {
      const viaApi = apiBlogsUrl();
      if (viaApi) {
        try {
          const fromApi = await fetchFromApi(viaApi);
          if (fromApi.posts?.length || !fromApi.warning) return fromApi;
        } catch {
          // fall through to the combined warning
        }
      }
      return {
        posts: [],
        warning: `CMS blogs skipped (database): ${error.message}. Static blogData.js posts will still prerender.`,
      };
    }
  }

  const viaApi = apiBlogsUrl();
  if (viaApi) {
    try {
      return await fetchFromApi(viaApi);
    } catch (error) {
      return {
        posts: [],
        warning: `CMS blogs skipped (API ${viaApi}): ${error.message}. Static blogData.js posts will still prerender.`,
      };
    }
  }

  return {
    posts: [],
    warning:
      'CMS blogs skipped: no DATABASE_URL or PRERENDER_BLOGS_API / VITE_API_URL. Static blogData.js posts will still prerender.',
  };
}
