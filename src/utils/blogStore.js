import { API_URL } from './apiConfig';
import {
  blogCategories,
  blogPosts as staticPosts,
  getRelatedPosts as staticRelated,
} from '../data/blogData';

function dateField(value) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  return value || '';
}

export function mapCmsPost(row) {
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

const CMS_FETCH_MS = 4000;

async function fetchCms(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CMS_FETCH_MS);
  try {
    return await fetch(url, { credentials: 'include', signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function featuredFrom(posts, limit) {
  const featured = posts.filter((post) => post.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

function mergePosts(cmsPosts) {
  const cmsSlugs = new Set(cmsPosts.map((post) => post.slug));
  return [...cmsPosts, ...staticPosts.filter((post) => !cmsSlugs.has(post.slug))].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
  );
}

export async function loadPublicBlogIndex() {
  let cms = [];
  try {
    const res = await fetchCms(`${API_URL}/blogs`);
    if (res.ok) {
      const data = await res.json();
      cms = (data.posts || []).map(mapCmsPost);
    }
  } catch {
    cms = [];
  }

  const posts = mergePosts(cms);
  return {
    blogPosts: posts,
    blogCategories,
    getFeaturedPosts: (limit) => featuredFrom(posts, limit),
    getRecentPosts: (limit = 6) => posts.slice(0, limit),
  };
}

export async function loadPublicBlogPost(slug) {
  let cmsPost = null;
  try {
    const res = await fetchCms(`${API_URL}/blogs/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.post) cmsPost = mapCmsPost(data.post);
    }
  } catch {
    cmsPost = null;
  }

  const { blogPosts } = await loadPublicBlogIndex();
  const fromIndex = blogPosts.find((item) => item.slug === slug) || null;
  const staticMatch = staticPosts.find((item) => item.slug === slug) || null;
  const withBody = [cmsPost, fromIndex, staticMatch].find((item) => item?.content);
  const post = withBody || cmsPost || fromIndex || staticMatch || null;
  const related = post
    ? blogPosts
        .filter((item) => item.slug !== post.slug && (
          item.category === post.category
          || (Array.isArray(item.tags) && Array.isArray(post.tags) && item.tags.some((tag) => post.tags.includes(tag)))
        ))
        .slice(0, 3)
    : staticRelated({ id: -1, category: '', tags: [] }, 0);

  const categoryName = blogCategories.find((cat) => cat.id === post?.category)?.name || null;
  return { post, relatedPosts: related, categoryName, blogCategories };
}
