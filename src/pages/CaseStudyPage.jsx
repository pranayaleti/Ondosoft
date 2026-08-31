import { lazy, Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { getCaseStudyBySlug } from '../constants/caseStudies';
import { CaseStudyDetail } from '../components/product';

const Footer = lazy(() => import('../components/Footer'));

const CaseStudyPage = () => {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const canonical = getCanonicalUrl(`/case-studies/${study.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: study.title,
        description: study.challenge,
        author: { '@type': 'Organization', name: companyInfo.name },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${companyInfo.urls.website}/case-studies` },
          { '@type': 'ListItem', position: 3, name: study.client, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${study.title} | Ondosoft`}
        description={study.challenge}
        canonicalUrl={canonical}
        ogType="article"
        structuredData={structuredData}
      />
      <div className="bg-ink pt-16 px-4 sm:px-6 pb-16 lg:pb-0">
        <div className="max-w-6xl mx-auto py-12">
          <CaseStudyDetail study={study} />
        </div>
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default CaseStudyPage;
