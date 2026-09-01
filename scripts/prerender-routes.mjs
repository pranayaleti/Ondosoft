#!/usr/bin/env node
/*
 * After `vite build`, emit a unique HTML file for each public marketing route
 * (and each blog post) so GitHub Pages / crawlers receive real titles,
 * descriptions, and canonicals instead of the SPA shell.
 *
 * React still hydrates on top of these files. dist/404.html stays as the
 * fallback for unknown paths.
 */

import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { mkdirSync, writeFileSync, readFileSync, existsSync, copyFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { build } from 'esbuild';
import { fetchPublishedCmsPosts, mergeBlogPosts } from './loadPublishedBlogs.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');
const blogEntry = resolve(rootDir, 'src/data/blogData.js');
const geoEntry = resolve(rootDir, 'src/data/geoPages.js');
const productsEntry = resolve(rootDir, 'src/data/productsCatalog.js');
const jsonLdEntry = resolve(rootDir, 'src/utils/staticJsonLd.js');

const SITE = 'https://ondosoft.com';
const OG_IMAGE = `${SITE}/og-image.png`;

const ROUTES = [
  {
    path: '/',
    title: 'Ondosoft | Product Engineering Teams to Build, Scale, and Modernize',
    description: 'Build, scale, and modernize software with a US-based engineering team that operates like your own. Custom web, SaaS, mobile, cloud, and AI engineering from Ondosoft in Lehi, Utah.',
  },
  {
    path: '/solutions',
    title: 'Solutions | Ondosoft Product Engineering',
    description: 'Explore Ondosoft solutions: product engineering, dedicated teams, AI, legacy modernization, cloud & DevOps, and web & mobile development.',
  },
  {
    path: '/solutions/product-engineering',
    title: 'Product Engineering | Ondosoft',
    description: 'Ondosoft product engineering for custom web apps and SaaS platforms. US-based engineers shipping React, Node.js, and Python systems with clear roadmaps.',
  },
  {
    path: '/solutions/dedicated-teams',
    title: 'Dedicated Engineering Teams | Ondosoft',
    description: 'Dedicated Ondosoft engineering teams that operate like your own. Senior full-stack delivery, weekly demos, and flexible engagement for startups and enterprises.',
  },
  {
    path: '/solutions/ai',
    title: 'AI Engineering | Ondosoft',
    description: 'Ondosoft AI engineering: LLM features, automation, NLP, and data pipelines shipped into production software — not slide-deck prototypes.',
  },
  {
    path: '/solutions/legacy-modernization',
    title: 'Legacy Modernization | Ondosoft',
    description: 'Modernize legacy software with Ondosoft. Re-architecture, React UI, APIs, data migration, and cloud cutover from a US-based product team.',
  },
  {
    path: '/solutions/cloud-devops',
    title: 'Cloud & DevOps | Ondosoft',
    description: 'Cloud engineering and DevOps from Ondosoft: AWS, GCP, Docker, Kubernetes, CI/CD, and Terraform for software that stays up in production.',
  },
  {
    path: '/solutions/web-mobile',
    title: 'Web & Mobile Development | Ondosoft',
    description: 'Web and mobile development from Ondosoft — React, React Native, Flutter, and native iOS/Android with shared APIs and production deployment.',
  },
  {
    path: '/case-studies',
    title: 'Case Studies | Ondosoft Product Engineering',
    description: 'Read Ondosoft case studies as problem, solution, technology, and result. SaaS, e-commerce, and analytics work from the existing portfolio.',
  },
  {
    path: '/case-studies/techstart-saas-platform',
    title: 'TechStart Inc. — SaaS Platform Development | Ondosoft',
    description: 'Needed a scalable SaaS platform to handle 10,000+ users with subscription billing, multi-tenant architecture, and real-time analytics.',
  },
  {
    path: '/case-studies/retailmax-ecommerce',
    title: 'RetailMax — E-commerce Solution | Ondosoft',
    description: 'Legacy e-commerce system modernized with React, real-time inventory, and mobile-first design.',
  },
  {
    path: '/case-studies/dataflow-analytics',
    title: 'DataFlow Solutions — Custom Web Application | Ondosoft',
    description: 'Custom data visualization dashboard replacing disconnected tools with real-time insights.',
  },
  {
    path: '/industries',
    title: 'Industries | Ondosoft Product Engineering',
    description: 'Ondosoft works across e-commerce, healthcare, fintech, education, logistics, SaaS, and more — the industries already listed in our capabilities deck.',
  },
  {
    path: '/insights',
    title: 'Insights | Ondosoft',
    description: 'Ondosoft insights on product engineering, SaaS, automation, and web development — the same writing published on our blog.',
  },
  {
    path: '/services',
    title: 'Software Development Services | Ondosoft',
    description: 'Custom software delivery from a US-based product team. We build and scale web apps, SaaS platforms, mobile experiences, and cloud infrastructure with clear roadmaps and reliable support.',
  },
  {
    path: '/products',
    title: 'What Ondosoft Offers | Product Catalog',
    description: 'A catalog of Ondosoft offerings that already exist on this site: product engineering, dedicated teams, AI, modernization, cloud, web and mobile, services, and the capabilities deck.',
  },
  {
    path: '/pricing',
    title: 'Software Development Pricing | Ondosoft',
    description: 'Transparent pricing for software development services. Get quotes for React, Node.js, and Python web apps, SaaS platforms, and cloud builds. Serving businesses across the USA.',
  },
  {
    path: '/about',
    title: 'About Ondosoft | Full Stack Software Development Team',
    description: "Learn about Ondosoft's mission to deliver exceptional software development and SaaS solutions. Our React, Node.js, and Python engineers partner with teams across the USA.",
  },
  {
    path: '/contact',
    title: 'Contact Ondosoft | Software Development & Platform Support',
    description: 'Contact Ondosoft for custom software, SaaS, and cloud development. Schedule a strategy call about your React, Node.js, Python, or platform project.',
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions | Ondosoft Software Development',
    description: "Get answers to common questions about Ondosoft's software development and SaaS services. Learn how we scope projects, collaborate, and ship production-ready releases.",
  },
  {
    path: '/blogs',
    title: 'Business Technology Blogs | Ondosoft',
    description: 'Get expert insights on small business technology, automation, SaaS solutions, and web development. Learn how to grow your business with smart software.',
  },
  {
    path: '/portfolio',
    title: 'Portfolio | Ondosoft Software Development Projects & Success Stories',
    description: "Explore our portfolio of successful software development projects. See how we've helped businesses scale with custom web applications, SaaS platforms, and mobile solutions.",
  },
  {
    path: '/testimonials',
    title: 'Client Testimonials | Ondosoft Software Development Reviews',
    description: "Read real client testimonials and reviews for Ondosoft's software development and SaaS solutions.",
  },
  {
    path: '/legal',
    title: 'Legal Information | Ondosoft Software Development',
    description: "Ondosoft's Legal Information — privacy policy, terms of use, licensing, NDA, and accessibility statement.",
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Ondosoft Software Development',
    description: "Ondosoft's Privacy Policy — how we collect, use, and protect your personal information.",
  },
  {
    path: '/terms-of-use',
    title: 'Terms of Use | Ondosoft Software Development',
    description: "Ondosoft's Terms of Use for the website and services.",
  },
  {
    path: '/nda',
    title: 'NDA & Confidentiality | Ondosoft Software Development',
    description: "Ondosoft's Non-Disclosure Agreement and confidentiality practices.",
  },
  {
    path: '/licensing',
    title: 'Licensing & Intellectual Property | Ondosoft Software Development',
    description: "Ondosoft's licensing information for software, IP, and deliverables.",
  },
  {
    path: '/accessibility',
    title: 'Accessibility Statement | Ondosoft Software Development',
    description: "Ondosoft's Accessibility Statement — our commitment to web accessibility, WCAG, and inclusive design.",
  },
  {
    path: '/capabilities-deck',
    title: 'Capabilities Deck | Ondosoft Software Development',
    description: "Download Ondosoft's capabilities deck covering services, technology expertise, and how we ship.",
  },
  {
    path: '/feedback',
    title: 'Share Your Ideas | Feedback | Ondosoft',
    description: 'Send ideas, suggestions, and feedback to Ondosoft. We read every message.',
  },
  {
    path: '/sitemap',
    title: 'Site Map | Ondosoft Software Development',
    description: 'Complete site map of the Ondosoft website.',
  },
];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const replaceMeta = (html, { path, title, description, ogImage, ogType, jsonLd }) => {
  const canonical = path === '/' ? `${SITE}/` : `${SITE}${path}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeUrl = escapeHtml(canonical);
  const safeImage = escapeHtml(ogImage || OG_IMAGE);
  const safeType = escapeHtml(ogType || 'website');

  let next = html;
  next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  next = next.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${safeDesc}" />`
  );

  const setOrInsert = (pattern, tag) => {
    if (pattern.test(next)) {
      next = next.replace(pattern, tag);
    } else {
      next = next.replace('</title>', `</title>\n    ${tag}`);
    }
  };

  setOrInsert(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${safeUrl}" />`);
  setOrInsert(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${safeType}" />`);
  setOrInsert(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${safeUrl}" />`);
  setOrInsert(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${safeTitle}" />`);
  setOrInsert(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${safeDesc}" />`);
  setOrInsert(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${safeImage}" />`);
  setOrInsert(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${safeTitle}" />`);
  setOrInsert(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${safeDesc}" />`);
  setOrInsert(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${safeImage}" />`);

  if (jsonLd) {
    next = next.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
    next = next.replace('</head>', `    ${jsonLd}\n  </head>`);
  }

  return next;
};

const writeRoute = (html, route) => {
  const outHtml = replaceMeta(html, route);
  if (route.path === '/') {
    writeFileSync(join(distDir, 'index.html'), outHtml, 'utf8');
    return;
  }
  const dir = join(distDir, route.path.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), outHtml, 'utf8');
};

const assetStubPlugin = {
  name: 'asset-stub',
  setup(buildApi) {
    buildApi.onResolve({ filter: /\.(jpg|jpeg|png|gif|svg|webp|avif|webm|mp4|css)$/i }, (args) => ({
      path: args.path,
      namespace: 'asset-stub',
    }));
    buildApi.onLoad({ filter: /.*/, namespace: 'asset-stub' }, (args) => {
      const filename = args.path.split('/').pop();
      return {
        contents: `export default ${JSON.stringify(`/assets/${filename}`)};`,
        loader: 'js',
      };
    });
  },
};

const bundleAndImport = async (entry, outfileName) => {
  const tmpDir = mkdtempSync(resolve(tmpdir(), 'ondo-prerender-'));
  const bundlePath = resolve(tmpDir, outfileName);
  try {
    await build({
      entryPoints: [entry],
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node20',
      outfile: bundlePath,
      plugins: [assetStubPlugin],
      logLevel: 'error',
    });
    return await import(pathToFileURL(bundlePath).href);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
};

const loadBlogPosts = async () => {
  const mod = await bundleAndImport(blogEntry, 'blog-bundle.mjs');
  return mod.blogPosts || [];
};

const loadJsonLdHelpers = async () => bundleAndImport(jsonLdEntry, 'ld-bundle.mjs');

const attachJsonLd = (route, helpers, extra = {}) => {
  if (!helpers) return route;
  const globalGraph = helpers.buildGlobalSchema();
  const pageGraph = helpers.buildPageSchema(route.path, extra);
  const globalTag = `<script type="application/ld+json" id="${helpers.PRERENDER_GLOBAL_ID}">${helpers.serializeJsonLd(globalGraph)}</script>`;
  const pageTag = pageGraph
    ? `<script type="application/ld+json" id="${helpers.PRERENDER_PAGE_ID}" data-path="${escapeHtml(route.path)}">${helpers.serializeJsonLd(pageGraph)}</script>`
    : '';
  return { ...route, jsonLd: `${globalTag}\n    ${pageTag}`.trim() };
};

if (!existsSync(distDir)) {
  console.error('prerender-routes: dist/ does not exist. Run vite build first.');
  process.exit(1);
}

const template = readFileSync(join(distDir, 'index.html'), 'utf8');

let jsonLdHelpers = null;
try {
  jsonLdHelpers = await loadJsonLdHelpers();
} catch (error) {
  console.warn('prerender-routes: JSON-LD helpers skipped:', error.message);
}

for (const route of ROUTES) {
  writeRoute(template, attachJsonLd(route, jsonLdHelpers));
}

let geoCount = 0;
try {
  const geoMod = await import(pathToFileURL(geoEntry).href);
  const geoRoutes = geoMod.getGeoPrerenderRoutes() || [];
  for (const route of geoRoutes) {
    writeRoute(template, attachJsonLd(route, jsonLdHelpers));
  }
  geoCount = geoRoutes.length;
} catch (error) {
  console.warn('prerender-routes: geo pages skipped:', error.message);
}

let productCount = 0;
try {
  const productMod = await bundleAndImport(productsEntry, 'products-bundle.mjs');
  const productRoutes = (productMod.getProductPrerenderRoutes() || []).filter((route) => route.path !== '/products');
  for (const route of productRoutes) {
    writeRoute(template, attachJsonLd(route, jsonLdHelpers));
  }
  productCount = productRoutes.length;
} catch (error) {
  console.warn('prerender-routes: product pages skipped:', error.message);
}

try {
  const staticPosts = await loadBlogPosts();
  const { posts: cmsPosts, source: cmsSource, warning: cmsWarning } = await fetchPublishedCmsPosts();
  if (cmsWarning && cmsPosts.length === 0) {
    console.warn(`prerender-routes: ${cmsWarning}`);
  }
  const posts = mergeBlogPosts(staticPosts, cmsPosts);
  for (const post of posts) {
    if (!post?.slug) continue;
    writeRoute(template, attachJsonLd({
      path: `/blogs/${post.slug}`,
      title: `${post.title} | Ondosoft Blogs`,
      description: post.metaDescription || post.excerpt || post.title,
      ogType: 'article',
      ogImage: typeof post.socialImage === 'string' && post.socialImage.startsWith('http')
        ? post.socialImage
        : undefined,
    }, jsonLdHelpers, { blogPost: post }));
  }
  const cmsNote = cmsPosts.length
    ? ` (${staticPosts.length} static + ${cmsPosts.length} CMS via ${cmsSource || 'unknown'})`
    : '';
  console.log(`Prerendered ${ROUTES.length} marketing routes, ${geoCount} geo pages, ${productCount} product pages, and ${posts.length} blog posts${cmsNote}.`);
} catch (error) {
  console.warn('prerender-routes: blog posts skipped:', error.message);
  console.log(`Prerendered ${ROUTES.length} marketing routes, ${geoCount} geo pages, and ${productCount} product pages.`);
}

const homeHtml = readFileSync(join(distDir, 'index.html'), 'utf8');
let notFoundHtml = homeHtml
  .replace(/<title>[\s\S]*?<\/title>/, '<title>404 - Page Not Found | Ondosoft</title>')
  .replace(/<link rel="canonical"[^>]*>/, '')
  .replace(/<meta name="robots"[^>]*>/g, '')
  .replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
notFoundHtml = notFoundHtml.replace(
  '</title>',
  '</title>\n    <meta name="robots" content="noindex, nofollow, noarchive" />'
);
writeFileSync(join(distDir, '404.html'), notFoundHtml, 'utf8');
console.log('Wrote dist/404.html with noindex');
