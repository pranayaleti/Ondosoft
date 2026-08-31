import { lazy, Suspense } from 'react';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { SolutionsGrid, FinalCTA } from '../components/product';

const Footer = lazy(() => import('../components/Footer'));

const SolutionsIndexPage = () => {
  const canonical = getCanonicalUrl('/solutions');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Ondosoft Solutions',
        url: canonical,
        description: 'Product engineering, dedicated teams, AI, modernization, cloud, and web & mobile.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Solutions | Ondosoft Product Engineering"
        description="Explore Ondosoft solutions: product engineering, dedicated teams, AI, legacy modernization, cloud & DevOps, and web & mobile development."
        keywords="product engineering, dedicated teams, AI engineering, legacy modernization, cloud devops, web mobile development"
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      <div className="bg-ink pt-16 pb-16 lg:pb-0">
        <SolutionsGrid headingAs="h1" />
        <FinalCTA heading="Not sure which lane you need?" />
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default SolutionsIndexPage;
