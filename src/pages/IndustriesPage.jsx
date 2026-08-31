import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { industries } from '../constants/productEngineering';
import { FinalCTA, SectionHeading, SectionShell } from '../components/product';

const Footer = lazy(() => import('../components/Footer'));

const IndustriesPage = () => {
  const canonical = getCanonicalUrl('/industries');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Industries | Ondosoft',
        url: canonical,
        description: 'Industries Ondosoft already lists as served, from e-commerce to SaaS.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Industries | Ondosoft Product Engineering"
        description="Ondosoft works across e-commerce, healthcare, fintech, education, logistics, SaaS, and more — the industries already listed in our capabilities deck."
        keywords="software development industries, SaaS, ecommerce, healthcare software, fintech engineering"
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      <div className="bg-ink pt-10 pb-16 lg:pb-0">
        <SectionShell labelledBy="industries-heading">
          <SectionHeading
            as="h1"
            titleId="industries-heading"
            eyebrow="Industries"
            title="The sectors we already name"
          >
            Taken from the Ondosoft capabilities deck. No invented vertical case results.
          </SectionHeading>
          <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
            {industries.map((industry) => (
              <article key={industry.slug} className="bg-panel p-6 sm:p-8">
                <h2 className="font-display text-2xl text-bone">{industry.name}</h2>
                <p className="mt-3 text-neutral-400 leading-relaxed">{industry.summary}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-neutral-500">
            Looking for a specific product motion instead?{' '}
            <Link to="/solutions" className="text-ember hover:text-orange-400">
              Browse solutions
            </Link>
            .
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

export default IndustriesPage;
