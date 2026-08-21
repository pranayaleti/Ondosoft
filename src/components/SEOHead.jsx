import React from 'react';
import { Helmet } from 'react-helmet-async';
import { companyInfo } from '../constants/companyInfo';

// The global <SchemaMarkup /> in App.jsx emits Organization / Website /
// LocalBusiness / Service. Per-page schema passed here (via `structuredData`)
// should only add page-specific graphs (FAQPage, Article/BlogPosting,
// BreadcrumbList, ContactPage, etc.). We no longer emit a default global
// graph from SEOHead to avoid conflicting Organization/Service duplicates.

const SEOHead = ({
  title = 'Ondosoft | Custom Software, SaaS, and AI Engineering',
  description = 'Ondosoft is a US-based product team delivering custom software, SaaS platforms, and AI-enabled experiences with secure, scalable engineering.',
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  structuredData = null,
  noIndex = false,
}) => {
  const finalCanonicalUrl = canonicalUrl || companyInfo.urls.website;
  const finalOgImage = ogImage || `${companyInfo.urls.website}${companyInfo.ogImage.path}`;
  const finalKeywords = keywords || 'ondosoft, custom software development, SaaS development, AI engineering, React, Node.js, Python';

  const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
  const bingVerification = import.meta.env.VITE_BING_SITE_VERIFICATION;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content={companyInfo.ogImage.width} />
      <meta property="og:image:height" content={companyInfo.ogImage.height} />
      <meta property="og:image:alt" content={`${companyInfo.name} - ${title}`} />
      <meta property="og:site_name" content={companyInfo.name} />
      <meta property="og:locale" content="en_US" />
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={companyInfo.social.twitter} />
      <meta name="twitter:creator" content={companyInfo.social.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={`${companyInfo.name} - ${title}`} />

      {/* Author / language */}
      <meta name="author" content={companyInfo.name} />
      <meta name="language" content="en-US" />
      <link rel="alternate" hrefLang="en-US" href={finalCanonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />

      {/* Mobile / app metadata */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#f97316" />
      <meta name="application-name" content={companyInfo.name} />
      <meta name="apple-mobile-web-app-title" content={companyInfo.name} />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Optional webmaster verification, only rendered when env var is set */}
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
      {bingVerification && <meta name="msvalidate.01" content={bingVerification} />}

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
      <link rel="shortcut icon" type="image/png" href="/logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />

      {/* Page-specific structured data (FAQ, Article, Breadcrumb, etc.) */}
      {structuredData && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Helmet>
  );
};

export default SEOHead;
