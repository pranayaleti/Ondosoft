#!/usr/bin/env node
/*
 * Generates public/sitemap.xml, public/sitemap-blogs.xml, and public/robots.txt
 * from src/utils/sitemapGenerator.js so search engines get real static files
 * (not the SPA shell) even without an SSR layer.
 *
 * The generator transitively imports src/data/blogData.js, which imports Vite
 * asset URLs (`.jpg`, `.png`, etc.). Native Node cannot resolve those, so we
 * bundle the entry with esbuild and stub asset imports to a placeholder URL.
 */

import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync, writeFileSync, existsSync, copyFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { build } from 'esbuild';
import { fetchPublishedCmsPosts, mergeBlogPosts } from './loadPublishedBlogs.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const publicDir = resolve(rootDir, 'public');
const distDir = resolve(rootDir, 'dist');
const generatorEntry = resolve(rootDir, 'src/utils/sitemapGenerator.js');

const assetStubPlugin = {
  name: 'asset-stub',
  setup(build) {
    build.onResolve({ filter: /\.(jpg|jpeg|png|gif|svg|webp|avif|webm|mp4|css)$/i }, (args) => ({
      path: args.path,
      namespace: 'asset-stub',
    }));
    build.onLoad({ filter: /.*/, namespace: 'asset-stub' }, (args) => {
      const filename = args.path.split('/').pop();
      const stubUrl = `/assets/${filename}`;
      return {
        contents: `export default ${JSON.stringify(stubUrl)};`,
        loader: 'js',
      };
    });
  },
};

const tmpDir = mkdtempSync(resolve(tmpdir(), 'ondo-sitemap-'));
const bundlePath = resolve(tmpDir, 'sitemap-bundle.mjs');

try {
  await build({
    entryPoints: [generatorEntry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    outfile: bundlePath,
    plugins: [assetStubPlugin],
    logLevel: 'error',
  });

  const {
    generateSitemap,
    generateBlogSitemap,
    generateRobotsTxt,
    getStaticBlogPosts,
  } = await import(pathToFileURL(bundlePath).href);

  const { posts: cmsPosts, source: cmsSource, warning: cmsWarning } = await fetchPublishedCmsPosts();
  if (cmsWarning && cmsPosts.length === 0) {
    console.warn(`generate-sitemap: ${cmsWarning}`);
  }
  const mergedPosts = mergeBlogPosts(getStaticBlogPosts?.() || [], cmsPosts);

  const sitemap = generateSitemap();
  const blogSitemap = generateBlogSitemap(mergedPosts);
  const robots = generateRobotsTxt();

  mkdirSync(publicDir, { recursive: true });
  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8');
  writeFileSync(resolve(publicDir, 'sitemap-blogs.xml'), blogSitemap, 'utf8');
  writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8');

  const cmsNote = cmsPosts.length ? ` (included ${cmsPosts.length} CMS posts via ${cmsSource})` : '';
  console.log(`Wrote sitemap.xml, sitemap-blogs.xml, robots.txt to public/${cmsNote}`);

  if (existsSync(distDir)) {
    copyFileSync(resolve(publicDir, 'sitemap.xml'), resolve(distDir, 'sitemap.xml'));
    copyFileSync(resolve(publicDir, 'sitemap-blogs.xml'), resolve(distDir, 'sitemap-blogs.xml'));
    copyFileSync(resolve(publicDir, 'robots.txt'), resolve(distDir, 'robots.txt'));
    console.log('Copied sitemap/robots into dist/');
  }
} finally {
  rmSync(tmpDir, { recursive: true, force: true });
}
