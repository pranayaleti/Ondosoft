import { lazy, Suspense } from 'react';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { caseStudies } from '../constants/caseStudies';
import { CaseStudyCard, FinalCTA, SectionHeading, SectionShell } from '../components/product';

const Footer = lazy(() => import('../components/Footer'));

const CaseStudiesPage = () => {
  const canonical = getCanonicalUrl('/case-studies');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Ondosoft Case Studies',
        url: canonical,
        description: 'Software projects delivered by Ondosoft, written as problem, solution, technology, and result.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Case Studies', item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Case Studies | Ondosoft Product Engineering"
        description="Read Ondosoft case studies as problem, solution, technology, and result. SaaS, e-commerce, and analytics work from the existing portfolio."
        keywords="Ondosoft case studies, software portfolio, SaaS case study, ecommerce development"
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      <div className="bg-ink pt-10 pb-16 lg:pb-0">
        <SectionShell labelledBy="cases-page-heading">
          <SectionHeading
            as="h1"
            titleId="cases-page-heading"
            eyebrow="Case studies"
            title="Work you can inspect"
          >
            These write-ups already lived on the portfolio page. We did not add metrics that were
            not already recorded.
          </SectionHeading>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </SectionShell>
        <FinalCTA heading="Build something in this family of work." />
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default CaseStudiesPage;
