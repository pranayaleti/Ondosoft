import { lazy, Suspense, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { getProductBySlug, getProductPath } from '../data/productsCatalog';
import { BUILD_TEAM_PATH } from '../constants/productEngineering';
import { FinalCTA, PrimaryButton, SecondaryButton } from '../components/product';
import NotFoundPage from './NotFoundPage';

const Footer = lazy(() => import('../components/Footer'));

const ProductDetailPage = () => {
  const { slug } = useParams();
  const item = getProductBySlug(slug);
  const path = item ? getProductPath(item) : '';
  const canonical = path ? getCanonicalUrl(path) : '';
  const pageTitle = item ? `${item.name} | Ondosoft Catalog` : 'Not found | Ondosoft';

  useEffect(() => {
    if (item) document.title = pageTitle;
  }, [item, pageTitle]);

  if (!item) {
    return <NotFoundPage />;
  }
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonical}#offer`,
        name: item.name,
        description: item.summary,
        url: getCanonicalUrl(item.href),
        provider: { '@id': `${companyInfo.urls.website}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Products', item: getCanonicalUrl('/products') },
          { '@type': 'ListItem', position: 3, name: item.name, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={item.summary}
        keywords={`${item.name}, Ondosoft, software development`}
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      <div className="bg-ink pt-16 pb-16 lg:pb-0">
        <section className="px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              <Link to="/" className="hover:text-bone">Home</Link>
              <span aria-hidden="true"> / </span>
              <Link to="/products" className="hover:text-bone">Products</Link>
              <span aria-hidden="true"> / </span>
              <span className="text-bone">{item.name}</span>
            </nav>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{item.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-bone mt-3">{item.name}</h1>
            <p className="mt-6 text-lg text-neutral-300 leading-relaxed">{item.catalogCopy}</p>
            <p className="mt-4 text-neutral-400">{item.audience}</p>
            <p className="mt-6 text-sm text-neutral-500">
              Canonical page: <Link to={item.href} className="text-ember hover:underline">{item.href}</Link>.
              Studio HQ is Lehi, Utah.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton to={item.href}>Open the full page</PrimaryButton>
              <SecondaryButton to={BUILD_TEAM_PATH}>Build My Team</SecondaryButton>
            </div>
          </div>
        </section>
        <FinalCTA heading={`Talk through ${item.name}`} />
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default ProductDetailPage;
