import { API_URL } from './apiConfig';
import {
  blogCategories,
  blogPosts as staticPosts,
  getRelatedPosts as staticRelated,
} from '../data/blogData';

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
    publishDate: row.publish_date || row.publishDate,
    lastUpdated: row.updated_at || row.lastUpdated || row.publish_date || row.publishDate,
    category: row.category || 'web-development',
    tags,
    featured: Boolean(row.featured),
    content: row.content || '',
    published: row.published !== false,
    source: row.source || 'cms',
  };
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
    const res = await fetch(`${API_URL}/blogs`, { credentials: 'include' });
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
    getFeaturedPosts: () => posts.filter((post) => post.featured),
    getRecentPosts: (limit = 6) => posts.slice(0, limit),
  };
}

export async function loadPublicBlogPost(slug) {
  let cmsPost = null;
  try {
    const res = await fetch(`${API_URL}/blogs/${encodeURIComponent(slug)}`, {
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.post) cmsPost = mapCmsPost(data.post);
    }
  } catch {
    cmsPost = null;
  }

  const { blogPosts } = await loadPublicBlogIndex();
  const post = cmsPost || blogPosts.find((item) => item.slug === slug) || null;
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
