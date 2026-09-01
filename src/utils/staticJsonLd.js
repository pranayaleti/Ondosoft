/**
 * JSON-LD graphs for prerendered HTML and the live client.
 * Global Organization / WebSite / LocalBusiness / Service matches SchemaMarkup.
 * Page graphs match the existing per-route SEOHead payloads.
 */
import {
  companyInfo,
  getCanonicalUrl,
  getContactPointSchema,
  getOpeningHoursSchema,
  getPostalAddressSchema,
} from '../constants/companyInfo';
import { faqData, generateFAQStructuredData } from '../constants/faqData';
import { getSolutionBySlug, getSolutionSchema } from '../constants/productEngineering';
import { buildGeoStructuredData, getGeoPageBySlug } from '../data/geoPages';
import { getProductBySlug } from '../data/productsCatalog';

export const PRERENDER_GLOBAL_ID = 'ondo-ld-global';
export const PRERENDER_PAGE_ID = 'ondo-ld-page';

const website = companyInfo.urls.website;

const crumbs = (...items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

export function buildGlobalSchema() {
  const openingHours = getOpeningHoursSchema() || [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${website}/#organization`,
        name: companyInfo.name,
        url: website,
        logo: `${website}/logo.png`,
        description:
          'Ondosoft is a US-based product team building custom software, AI-enabled products, and scalable platforms.',
        foundingDate: companyInfo.foundingDate,
        contactPoint: [
          getContactPointSchema('customer service'),
          { ...getContactPointSchema('sales'), email: companyInfo.salesEmail },
        ],
        address: getPostalAddressSchema(),
        sameAs: [companyInfo.urls.linkedin, companyInfo.urls.github],
      },
      {
        '@type': 'WebSite',
        '@id': `${website}/#website`,
        url: website,
        name: companyInfo.name,
        description:
          'Full stack software development, AI products, and platform engineering for modern teams.',
        publisher: { '@id': `${website}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${website}/#services`,
        name: 'Software Development Services',
        description:
          'Full-stack web, mobile, AI, and cloud development delivered by a senior product team.',
        provider: { '@id': `${website}/#organization` },
        serviceType: 'Software Development',
        areaServed: {
          '@type': 'Country',
          name: companyInfo.location.country,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Web Applications',
                description:
                  'Modern web apps with React, Node.js, and scalable cloud infrastructure.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SaaS & Platform Builds',
                description:
                  'End-to-end product development, including architecture, billing, and observability.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile & Cross-Platform',
                description:
                  'iOS, Android, and cross-platform apps that integrate with your stack.',
              },
            },
          ],
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${website}/#localbusiness`,
        name: `${companyInfo.name} Software Development`,
        description: 'US-based software development studio delivering secure, scalable products.',
        url: website,
        image: `${website}/logo.png`,
        telephone: companyInfo.phoneE164,
        email: companyInfo.email,
        address: getPostalAddressSchema(),
        priceRange: '$$',
        ...(openingHours.length ? { openingHours } : {}),
        geo: {
          '@type': 'GeoCoordinates',
          latitude: companyInfo.coordinates.latitude,
          longitude: companyInfo.coordinates.longitude,
        },
        areaServed: {
          '@type': 'Country',
          name: companyInfo.location.country,
        },
      },
    ],
  };
}

function hqAddress() {
  return {
    name: companyInfo.name,
    telephone: companyInfo.phoneE164,
    email: companyInfo.email,
    streetAddress: companyInfo.address.streetAddress,
    addressLocality: companyInfo.address.addressLocality,
    addressRegion: companyInfo.address.addressRegion,
    postalCode: companyInfo.address.postalCode,
    addressCountry: companyInfo.address.addressCountry,
  };
}

function buildServicesSchema() {
  const canonical = getCanonicalUrl('/services');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonical}#services`,
        name: 'Software Development Services',
        description:
          'Full stack web, mobile, and platform development with a senior product team.',
        provider: { '@id': `${website}/#organization` },
        serviceType: 'Software Development',
        areaServed: { '@type': 'Country', name: 'United States' },
      },
      crumbs(
        { name: 'Home', item: website },
        { name: 'Services', item: canonical },
      ),
    ],
  };
}

function buildContactSchema() {
  const canonical = getCanonicalUrl('/contact');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${canonical}#contact-page`,
        name: `Contact ${companyInfo.name}`,
        url: canonical,
        description:
          'Get in touch with Ondosoft for custom software, SaaS, and platform development support.',
        mainEntity: {
          '@type': 'Organization',
          name: companyInfo.name,
          contactPoint: {
            ...getContactPointSchema('customer service'),
            availableLanguage: 'English',
          },
          address: getPostalAddressSchema(),
        },
      },
      crumbs(
        { name: 'Home', item: website },
        { name: 'Contact', item: canonical },
      ),
    ],
  };
}

function buildCollectionSchema(path, name, description) {
  const canonical = getCanonicalUrl(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name,
        url: canonical,
        description,
      },
      crumbs(
        { name: 'Home', item: website },
        { name: name.split('|')[0].trim(), item: canonical },
      ),
    ],
  };
}

function buildHomeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${website}/#webpage`,
        url: `${website}/`,
        name: 'Ondosoft | Product Engineering Teams to Build, Scale, and Modernize',
        isPartOf: { '@id': `${website}/#website` },
        about: { '@id': `${website}/#organization` },
        description:
          'Build, scale, and modernize software with a US-based engineering team that operates like your own.',
      },
      crumbs({ name: 'Home', item: website }),
    ],
  };
}

function buildFaqSchema() {
  const canonical = getCanonicalUrl('/faq');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateFAQStructuredData(faqData),
      crumbs(
        { name: 'Home', item: website },
        { name: 'FAQ', item: canonical },
      ),
    ],
  };
}

function buildBlogPostSchema(post) {
  const canonical = getCanonicalUrl(`/blogs/${post.slug}`);
  const image = [post.socialImage, post.image, post.featuredImage].find(
    (url) => typeof url === 'string' && url.length > 0,
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    ...(image ? { image } : {}),
    mainEntityOfPage: canonical,
    url: canonical,
    keywords: Array.isArray(post.tags) ? post.tags : [],
    inLanguage: 'en-US',
    datePublished: post.publishDate,
    dateModified: post.lastUpdated || post.updatedAt || post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: companyInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: `${website}/logo.png`,
      },
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'Ondosoft Blog',
      url: getCanonicalUrl('/blogs'),
    },
    breadcrumb: crumbs(
      { name: 'Home', item: website },
      { name: 'Blogs', item: getCanonicalUrl('/blogs') },
      { name: post.title, item: canonical },
    ),
  };
}

/**
 * Page-specific graph for a marketing path. Returns null when the route only
 * needs the global Organization / WebSite / LocalBusiness / Service graph.
 */
export function buildPageSchema(path, { blogPost } = {}) {
  if (!path || path === '/') return buildHomeSchema();

  if (path === '/services') return buildServicesSchema();
  if (path === '/contact') return buildContactSchema();
  if (path === '/faq') return buildFaqSchema();
  if (path === '/solutions') {
    return buildCollectionSchema(
      '/solutions',
      'Ondosoft Solutions',
      'Product engineering, dedicated teams, AI, modernization, cloud, and web & mobile.',
    );
  }
  if (path === '/industries') {
    return buildCollectionSchema(
      '/industries',
      'Industries | Ondosoft',
      'Industries Ondosoft already lists as served, from e-commerce to SaaS.',
    );
  }
  if (path === '/blogs') {
    return buildCollectionSchema(
      '/blogs',
      'Ondosoft Blog',
      'Insights on product engineering, SaaS, automation, and web development.',
    );
  }
  if (path === '/products') {
    return buildCollectionSchema(
      '/products',
      'What Ondosoft Offers',
      'Catalog of existing Ondosoft offerings: solutions, services, and the capabilities deck.',
    );
  }

  if (path.startsWith('/products/')) {
    const slug = path.slice('/products/'.length);
    const item = getProductBySlug(slug);
    if (!item) return null;
    const canonical = getCanonicalUrl(path);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: item.name,
          description: item.summary,
          url: getCanonicalUrl(item.href),
          provider: { '@id': `${website}/#organization` },
        },
        crumbs(
          { name: 'Home', item: website },
          { name: 'Products', item: getCanonicalUrl('/products') },
          { name: item.name, item: canonical },
        ),
      ],
    };
  }

  if (path.startsWith('/solutions/')) {
    const slug = path.slice('/solutions/'.length);
    const solution = getSolutionBySlug(slug);
    return solution ? getSolutionSchema(solution, getCanonicalUrl(path)) : null;
  }

  if (path.startsWith('/services/')) {
    const slug = path.slice('/services/'.length);
    const place = getGeoPageBySlug(slug);
    if (!place) return null;
    return buildGeoStructuredData(place, {
      website,
      canonical: getCanonicalUrl(path),
      address: hqAddress(),
    });
  }

  if (path.startsWith('/blogs/') && blogPost) {
    return buildBlogPostSchema(blogPost);
  }

  return null;
}

export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getStaticPageJsonLdPath() {
  if (typeof document === 'undefined') return null;
  return document.getElementById(PRERENDER_PAGE_ID)?.getAttribute('data-path') ?? null;
}

/**
 * Read-only: true when the client should emit page JSON-LD.
 * Does not mutate the DOM — call syncPrerenderedPageJsonLd after paint
 * so SPA navigations drop a stale prerendered page graph.
 */
export function shouldEmitPageJsonLd(pathname) {
  if (typeof document === 'undefined') return true;
  const el = document.getElementById(PRERENDER_PAGE_ID);
  return !el || el.getAttribute('data-path') !== pathname;
}

/** Remove a prerendered page graph that belongs to a previous route. */
export function syncPrerenderedPageJsonLd(pathname) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(PRERENDER_PAGE_ID);
  if (el && el.getAttribute('data-path') !== pathname) {
    el.remove();
  }
}

/**
 * Drop JSON-LD that React rendered into #root. Official graphs live in
 * <head> (#ondo-ld-global / #ondo-ld-page or Helmet). Body copies confuse
 * JS crawlers and were the hydrate-duplicate source.
 */
export function stripRootJsonLdDuplicates() {
  if (typeof document === 'undefined') return;
  document.getElementById('root')
    ?.querySelectorAll('script[type="application/ld+json"]')
    .forEach((el) => el.remove());
}

export function hasPrerenderedGlobalJsonLd() {
  return typeof document !== 'undefined' && !!document.getElementById(PRERENDER_GLOBAL_ID);
}

/** Inject the global graph into <head> when the prerendered tag is missing (SPA / 404 fallback). */
export function ensureGlobalJsonLd() {
  if (typeof document === 'undefined') return;
  stripRootJsonLdDuplicates();
  if (document.getElementById(PRERENDER_GLOBAL_ID)) return;
  const script = document.createElement('script');
  script.id = PRERENDER_GLOBAL_ID;
  script.type = 'application/ld+json';
  script.textContent = serializeJsonLd(buildGlobalSchema());
  document.head.appendChild(script);
}

/**
 * Keep exactly one page graph in <head>. Helmet is not used for JSON-LD
 * because it strips prerendered application/ld+json tags on hydrate.
 */
export function ensurePageJsonLd(pathname, data) {
  if (typeof document === 'undefined') return;
  stripRootJsonLdDuplicates();
  syncPrerenderedPageJsonLd(pathname);
  if (!data || !shouldEmitPageJsonLd(pathname)) return;
  const script = document.createElement('script');
  script.id = PRERENDER_PAGE_ID;
  script.type = 'application/ld+json';
  script.setAttribute('data-path', pathname);
  script.textContent = serializeJsonLd(data);
  document.head.appendChild(script);
}
