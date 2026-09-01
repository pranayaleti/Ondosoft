import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { blogCategories, getFeaturedPosts, getRecentPosts } from '../data/blogData';
import { loadPublicBlogIndex } from '../utils/blogStore';
import { FinalCTA, SectionHeading, SectionShell } from '../components/product';

const Footer = lazy(() => import('../components/Footer'));

const InsightsPage = () => {
  const canonical = getCanonicalUrl('/insights');
  const [featured, setFeatured] = useState(() => getFeaturedPosts(6));
  const [recent, setRecent] = useState(() => getRecentPosts(6));

  useEffect(() => {
    let cancelled = false;
    loadPublicBlogIndex()
      .then((data) => {
        if (cancelled) return;
        setFeatured(data.getFeaturedPosts(6));
        setRecent(data.getRecentPosts(6));
      })
      .catch(() => {
        if (cancelled) return;
        setFeatured(getFeaturedPosts(6));
        setRecent(getRecentPosts(6));
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Insights | Ondosoft',
        url: canonical,
        description: 'Engineering and product writing from Ondosoft.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Insights | Ondosoft"
        description="Ondosoft insights on product engineering, SaaS, automation, and web development — the same writing published on our blog."
        keywords="software engineering insights, SaaS blog, automation, web development"
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      <div className="bg-ink pt-10 pb-16 lg:pb-0">
        <SectionShell labelledBy="insights-heading">
          <SectionHeading
            as="h1"
            titleId="insights-heading"
            eyebrow="Insights"
            title="Writing from the studio"
          >
            This hub points at existing blog posts. Full articles still live at /blogs.
          </SectionHeading>

          <div className="flex flex-wrap gap-2 mb-10">
            {blogCategories.map((category) => (
              <Link
                key={category.slug}
                to="/blogs"
                className="min-h-10 px-3 py-2 border border-line text-sm text-neutral-300 hover:text-bone hover:border-signal"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {(featured.length ? featured : recent).map((post) => (
              <article key={post.slug} className="border border-line bg-panel p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                  {post.readingTime || post.readTime}
                </p>
                <h2 className="font-display text-2xl text-bone mt-2">
                  <Link to={`/blogs/${post.slug}`} className="hover:text-ember">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-neutral-400 leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>

          <p className="mt-8">
            <Link to="/blogs" className="text-ember font-semibold">
              All articles
            </Link>
          </p>
        </SectionShell>
        <FinalCTA />
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default InsightsPage;
