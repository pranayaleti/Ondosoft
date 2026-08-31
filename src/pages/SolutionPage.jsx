import { lazy, Suspense } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ServiceSchema from '../components/ServiceSchema';
import { getCanonicalUrl } from '../constants/companyInfo';
import { BUILD_TEAM_PATH, getSolutionBySlug, getSolutionSchema } from '../constants/productEngineering';
import { caseStudiesBySolution } from '../constants/caseStudies';
import { CaseStudyCard, FinalCTA, PrimaryButton, SecondaryButton } from '../components/product';

const Footer = lazy(() => import('../components/Footer'));

const SolutionPage = () => {
  const { slug } = useParams();
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const canonical = getCanonicalUrl(solution.href);
  const related = caseStudiesBySolution(solution.slug);

  return (
    <>
      <SEOHead
        title={solution.seoTitle}
        description={solution.seoDescription}
        keywords={`${solution.name}, Ondosoft, ${solution.technologies.join(', ')}`}
        canonicalUrl={canonical}
        structuredData={getSolutionSchema(solution, canonical)}
      />
      <ServiceSchema
        serviceName={solution.name}
        serviceDescription={solution.seoDescription}
        serviceType={solution.name}
        pageUrl={canonical}
      />
      <div className="bg-ink pt-16 pb-16 lg:pb-0">
        <section className="px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              <Link to="/solutions" className="hover:text-bone">
                Solutions
              </Link>
              <span aria-hidden="true"> / </span>
              {solution.name}
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-bone tracking-tight mt-4">
              {solution.name}
            </h1>
            <p className="mt-5 text-xl text-neutral-400 leading-relaxed">{solution.description}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <PrimaryButton to={`${BUILD_TEAM_PATH}&source=solution-${solution.slug}`}>
                Build My Team
              </PrimaryButton>
              <SecondaryButton to="/case-studies">See What We’ve Built</SecondaryButton>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="border border-line bg-panel p-6 sm:p-8">
              <h2 className="font-display text-2xl text-bone">Capabilities</h2>
              <ul className="mt-4 space-y-2 text-neutral-300">
                {solution.capabilities.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
            <div className="border border-line bg-panel p-6 sm:p-8">
              <h2 className="font-display text-2xl text-bone">Technologies we already list</h2>
              <p className="mt-4 font-mono text-sm text-neutral-400 leading-relaxed">
                {solution.technologies.join(' · ')}
              </p>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="px-4 sm:px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-3xl text-bone mb-6">Related work</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {related.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <FinalCTA />
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default SolutionPage;
