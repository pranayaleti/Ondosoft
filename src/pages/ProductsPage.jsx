import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { caseStudies } from '../constants/caseStudies';
import { getProductPath, productCatalog } from '../data/productsCatalog';
import { FinalCTA, PrimaryButton, SectionHeading, SectionShell } from '../components/product';

const Footer = lazy(() => import('../components/Footer'));

const ProductsPage = () => {
  const pageTitle = 'What Ondosoft Offers | Product Catalog';
  const canonical = getCanonicalUrl('/products');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#catalog`,
        name: 'What Ondosoft Offers',
        url: canonical,
        description:
          'Catalog of existing Ondosoft offerings: solutions, software development services, and the capabilities deck.',
      },
      {
        '@type': 'ItemList',
        itemListElement: productCatalog.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: getCanonicalUrl(getProductPath(item)),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Products', item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description="A catalog of Ondosoft offerings that already exist on this site: product engineering, dedicated teams, AI, modernization, cloud, web and mobile, services, and the capabilities deck."
        keywords="Ondosoft products, product engineering, dedicated teams, software development services, capabilities deck"
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      <div className="bg-ink pt-16 pb-16 lg:pb-0">
        <SectionShell>
          <SectionHeading
            eyebrow="Catalog"
            title="What we already offer"
            as="h1"
          >
            This is an index of lanes and resources that already live on Ondosoft.com — not a store of invented SKUs.
            HQ is Lehi, Utah; other cities on the services pages are service areas.
          </SectionHeading>

          <ul className="grid md:grid-cols-2 gap-5">
            {productCatalog.map((item) => (
              <li key={item.slug}>
                <Link
                  to={getProductPath(item)}
                  className="block h-full rounded-sm border border-white/10 bg-white/[0.03] p-6 hover:border-ember/50 transition-colors"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{item.eyebrow}</p>
                  <h2 className="font-display text-2xl text-bone mt-2">{item.name}</h2>
                  <p className="text-neutral-400 mt-3 leading-relaxed">{item.summary}</p>
                  <span className="inline-block mt-4 text-ember font-semibold">Open catalog entry →</span>
                </Link>
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell>
          <SectionHeading
            eyebrow="Shipped work"
            title="Case studies already on the site"
          >
            These are portfolio write-ups, not products for sale. They sit here so buyers can see the work next to the lanes above.
          </SectionHeading>
          <ul className="space-y-3">
            {caseStudies.map((sample) => (
              <li key={sample.slug}>
                <Link to={`/case-studies/${sample.slug}`} className="block border border-white/10 rounded-sm px-4 py-3 hover:border-ember/40">
                  <span className="text-bone font-semibold">{sample.title}</span>
                  <span className="text-neutral-500 text-sm ml-2">{sample.industry}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PrimaryButton to="/case-studies">All case studies</PrimaryButton>
          </div>
        </SectionShell>

        <FinalCTA heading="Need a team for one of these lanes?" />
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default ProductsPage;
