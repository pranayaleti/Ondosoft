import React, { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { companyInfo } from '../constants/companyInfo';
import { buildPageSchema, ensurePageJsonLd } from '../utils/staticJsonLd';

// Page JSON-LD is written to <head> in useLayoutEffect, not via Helmet.
// Helmet strips prerendered application/ld+json tags during hydrate.

const SEOHead = ({
  title = 'Ondosoft | Product Engineering Teams to Build, Scale, and Modernize',
  description = 'Build, scale, and modernize software with a US-based engineering team that operates like your own. Custom web, SaaS, mobile, cloud, and AI engineering from Ondosoft in Lehi, Utah.',
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  structuredData = null,
  noIndex = false,
}) => {
  const { pathname } = useLocation();
  const isPrivateSurface =
    pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
  const shouldNoIndex = noIndex || isPrivateSurface;
  const finalCanonicalUrl = canonicalUrl || `${companyInfo.urls.website}/`;
  const finalOgImage = ogImage || `${companyInfo.urls.website}${companyInfo.ogImage.path}`;
  const finalKeywords = keywords || 'ondosoft, custom software development, SaaS development, AI engineering, React, Node.js, Python';

  const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
  const bingVerification = import.meta.env.VITE_BING_SITE_VERIFICATION;
  useLayoutEffect(() => {
    ensurePageJsonLd(pathname, structuredData || buildPageSchema(pathname));
  }, [pathname, structuredData, title]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {shouldNoIndex ? (
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

    </Helmet>
  );
};

export default SEOHead;
