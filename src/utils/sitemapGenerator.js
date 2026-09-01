import { blogPosts } from '../data/blogData';
import { companyInfo } from '../constants/companyInfo';
import { getGeoSitemapEntries } from '../data/geoPages';

const today = new Date().toISOString().split('T')[0];

export const generateSitemap = () => {
  const baseUrl = companyInfo.urls.website;

  const mainPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { url: '/solutions', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { url: '/solutions/product-engineering', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { url: '/solutions/dedicated-teams', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { url: '/solutions/ai', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { url: '/solutions/legacy-modernization', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '/solutions/cloud-devops', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '/solutions/web-mobile', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '/case-studies', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '/case-studies/techstart-saas-platform', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/case-studies/retailmax-ecommerce', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/case-studies/dataflow-analytics', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/industries', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '/insights', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { url: '/services', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { url: '/products', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { url: '/products/product-engineering', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/products/dedicated-teams', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/products/ai', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/products/legacy-modernization', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/products/cloud-devops', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/products/web-mobile', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/products/software-development-services', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/products/capabilities-deck', priority: '0.6', changefreq: 'monthly', lastmod: today },
    { url: '/pricing', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '/testimonials', priority: '0.6', changefreq: 'monthly', lastmod: today },
    { url: '/portfolio', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/feedback', priority: '0.7', changefreq: 'monthly', lastmod: today },
    { url: '/about', priority: '0.6', changefreq: 'monthly', lastmod: today },
    { url: '/faq', priority: '0.6', changefreq: 'monthly', lastmod: today },
    { url: '/blogs', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { url: '/legal', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { url: '/terms-of-use', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { url: '/nda', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { url: '/licensing', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { url: '/accessibility', priority: '0.5', changefreq: 'yearly', lastmod: today },
    { url: '/capabilities-deck', priority: '0.6', changefreq: 'monthly', lastmod: today },
    { url: '/sitemap', priority: '0.4', changefreq: 'monthly', lastmod: today },
    ...getGeoSitemapEntries(today),
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  mainPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url === '/' ? '/' : page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export function getStaticBlogPosts() {
  return blogPosts;
}

export const generateBlogSitemap = (posts = blogPosts) => {
  const baseUrl = companyInfo.urls.website;

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

  sitemap += `
  <url>
    <loc>${baseUrl}/blogs</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  posts.forEach(post => {
    const lastmod = post.lastUpdated || post.publishDate || today;
    const publishDate = post.publishDate || today;

    sitemap += `
  <url>
    <loc>${baseUrl}/blogs/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${post.featured ? '0.9' : '0.7'}</priority>`;

    const imageCandidates = [post.socialImage, post.featuredImage, post.image];
    const imageUrl = imageCandidates.find(
      (url) => typeof url === 'string' && /^https?:\/\//.test(url)
    );
    if (imageUrl) {
      sitemap += `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.excerpt || post.metaDescription || ''}</image:caption>
    </image:image>`;
    }

    const publishDateObj = new Date(publishDate);
    const daysSincePublish = (new Date() - publishDateObj) / (1000 * 60 * 60 * 24);
    if (daysSincePublish <= 2) {
      sitemap += `
    <news:news>
      <news:publication>
        <news:name>Ondosoft Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publishDate}T00:00:00+00:00</news:publication_date>
      <news:title>${post.title}</news:title>
    </news:news>`;
    }

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => {
  const baseUrl = companyInfo.urls.website;

  return `# robots.txt for Ondosoft
# Public marketing pages are indexable. Authenticated and API surfaces are blocked.

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /dashboard/
Disallow: /portal/
Disallow: /auth/
Disallow: /reset-password
Disallow: /demo
Disallow: /api/

Allow: /sitemap.xml
Allow: /sitemap-blogs.xml

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-blogs.xml`;
};

export const generateAndSaveSitemap = (blogPostsOverride) => {
  const sitemap = generateSitemap();
  const blogSitemap = generateBlogSitemap(blogPostsOverride);
  const robotsTxt = generateRobotsTxt();

  return {
    sitemap,
    blogSitemap,
    robotsTxt
  };
};

export const generateSitemapIndex = () => {
  const baseUrl = companyInfo.urls.website;

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blogs.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
};
