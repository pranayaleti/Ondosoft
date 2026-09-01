import { lazy, Suspense, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { companyInfo, getCanonicalUrl } from '../constants/companyInfo';
import { BUILD_TEAM_PATH, solutions } from '../constants/productEngineering';
import {
  buildGeoStructuredData,
  GEO_KIND,
  getGeoPageBySlug,
  getGeoPath,
  getPlaceLabel,
  getRelatedGeoPages,
} from '../data/geoPages';
import { FinalCTA, PrimaryButton, SecondaryButton } from '../components/product';
import NotFoundPage from './NotFoundPage';

const Footer = lazy(() => import('../components/Footer'));

const GeoServicePage = () => {
  const { slug } = useParams();
  const place = getGeoPageBySlug(slug);

  if (!place) {
    return <NotFoundPage />;
  }

  const label = getPlaceLabel(place);
  const path = getGeoPath(place);
  const canonical = getCanonicalUrl(path);
  const related = getRelatedGeoPages(place);
  const structuredData = buildGeoStructuredData(place, {
    website: companyInfo.urls.website,
    canonical,
    address: {
      name: companyInfo.name,
      telephone: companyInfo.phoneE164,
      email: companyInfo.email,
      streetAddress: companyInfo.address.streetAddress,
      addressLocality: companyInfo.address.addressLocality,
      addressRegion: companyInfo.address.addressRegion,
      postalCode: companyInfo.address.postalCode,
      addressCountry: companyInfo.address.addressCountry,
    },
  });

  useEffect(() => {
    document.title = place.title;
  }, [place.title]);

  const locationNote = (() => {
    switch (place.kind) {
      case GEO_KIND.STATE:
        return place.isHq
          ? 'This is our home state. The studio is in Lehi; we also work with teams across the US.'
          : `We do not claim a storefront in ${place.name}. Ondosoft is based in Lehi, Utah, and works remotely with ${place.name} teams.`;
      case GEO_KIND.CITY:
        return place.isHq
          ? `Studio address: ${companyInfo.address.streetAddress}, ${companyInfo.address.addressLocality}, ${companyInfo.address.addressRegion} ${companyInfo.address.postalCode}.`
          : `No local Ondosoft office in ${place.displayName} — we partner remotely from Lehi, Utah, with weekly demos on your timezone.`;
      default: {
        const _exhaustive = place.kind;
        throw new Error(`Unhandled geo kind: ${_exhaustive}`);
      }
    }
  })();

  return (
    <>
      <SEOHead
        title={place.title}
        description={place.description}
        keywords={place.keywords}
        canonicalUrl={canonical}
        structuredData={structuredData}
      />
      <div className="bg-ink pt-16 pb-16 lg:pb-0">
        <section className="px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              <Link to="/" className="hover:text-bone">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <Link to="/services" className="hover:text-bone">
                Services
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-bone">{label}</span>
            </nav>
            <h1 className="font-display text-4xl md:text-6xl text-bone tracking-tight mt-4">
              {place.h1}
            </h1>
            <p className="mt-5 text-xl text-neutral-400 leading-relaxed">{place.intro}</p>
            <p className="mt-4 text-base text-neutral-500 leading-relaxed">{locationNote}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <PrimaryButton to={`${BUILD_TEAM_PATH}&source=geo-${place.slug}`}>
                Build My Team
              </PrimaryButton>
              <SecondaryButton to="/solutions">See solutions</SecondaryButton>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-bone">How we work with {label}</h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">{place.focus}</p>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="border border-line bg-panel p-6 sm:p-8">
              <h2 className="font-display text-2xl text-bone">Industries we already name</h2>
              <p className="mt-3 text-sm text-neutral-500">
                From the industries page — applied here because they show up in this market, not invented for SEO.
              </p>
              <ul className="mt-4 space-y-2 text-neutral-300">
                {place.industries.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
              <Link
                to="/industries"
                className="inline-block mt-6 text-sm text-signal hover:text-bone"
              >
                All industries
              </Link>
            </div>
            <div className="border border-line bg-panel p-6 sm:p-8">
              <h2 className="font-display text-2xl text-bone">What we ship</h2>
              <ul className="mt-4 space-y-3">
                {solutions.map((solution) => (
                  <li key={solution.slug}>
                    <Link
                      to={solution.href}
                      className="text-bone hover:text-signal transition-colors"
                    >
                      {solution.name}
                    </Link>
                    <p className="text-sm text-neutral-500 mt-0.5">{solution.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-4 sm:px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl text-bone mb-6">
                {place.kind === GEO_KIND.STATE ? `Cities we list in ${place.name}` : 'Nearby pages'}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={getGeoPath(item)}
                    className="border border-line bg-panel p-5 hover:border-signal/50 transition-colors"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
                      {item.kind === GEO_KIND.STATE ? 'State' : 'City'}
                    </p>
                    <p className="mt-2 text-lg text-bone">{getPlaceLabel(item)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA
          heading={`Have a product to build in ${label}?`}
          body="Tell us what you are trying to ship. We will come back with a team shape, a sequence, and a path to production — from our Lehi studio or remote, on your timezone."
        />
        <Suspense fallback={<div className="h-24" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default GeoServicePage;
