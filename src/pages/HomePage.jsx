import { memo, lazy, Suspense } from 'react';
import SEOHead from '../components/SEOHead';
import { getCanonicalUrl } from '../constants/companyInfo';
import { caseStudies } from '../constants/caseStudies';
import {
  ProductHero,
  SolutionSelector,
  SolutionsGrid,
  BusinessStage,
  CostCalculator,
  CaseStudyCard,
  HealthAssessment,
  WhyOndo,
  TechnologyGrid,
  AISection,
  EngineeringProcess,
  ProductTestimonial,
  FinalCTA,
  SectionHeading,
  SectionShell,
} from '../components/product';

const Footer = lazy(() => import('../components/Footer'));
const HomepageFAQ = lazy(() => import('../components/HomepageFAQ'));
const NewsletterSignup = lazy(() => import('../components/NewsletterSignup'));

const HomePage = () => {
  const canonical = getCanonicalUrl();

  return (
    <>
      <SEOHead
        title="Ondosoft | Product Engineering Teams to Build, Scale, and Modernize"
        description="Build, scale, and modernize software with a US-based engineering team that operates like your own. Custom web, SaaS, mobile, cloud, and AI engineering from Ondosoft in Lehi, Utah."
        keywords="product engineering, dedicated engineering teams, custom software development, SaaS development, AI engineering, legacy modernization, cloud devops, mobile app development"
        canonicalUrl={canonical}
      />
      <div className="bg-ink pb-16 lg:pb-0">
        <ProductHero />
        <SolutionSelector />
        <SolutionsGrid />
        <BusinessStage />
        <CostCalculator />

        <SectionShell id="case-studies" labelledBy="cases-heading">
          <SectionHeading
            titleId="cases-heading"
            eyebrow="Work"
            title="Problem → solution → technology → result"
          >
            Existing portfolio write-ups. Metrics appear only where the original case already
            recorded them.
          </SectionHeading>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </SectionShell>

        <HealthAssessment />
        <WhyOndo />
        <TechnologyGrid />
        <ProductTestimonial />
        <EngineeringProcess />
        <AISection />
        <FinalCTA />

        <Suspense fallback={<div className="h-24" />}>
          <HomepageFAQ />
        </Suspense>
        <Suspense fallback={<div className="h-24" />}>
          <NewsletterSignup />
        </Suspense>
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default memo(HomePage);
