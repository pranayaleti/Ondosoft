import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import ServiceSchema from "../components/ServiceSchema";
import HeroCTA from "../components/HeroCTA";
import { companyInfo } from "../constants/companyInfo";
import { getFeaturedCities, getFeaturedStates, getGeoPath, getPlaceLabel } from "../data/geoPages";

// Lazy load heavy components
const Services = lazy(() => import("../components/Services"));
const CalendlyModal = lazy(() => import("../components/CalendlyModal"));
const Footer = lazy(() => import("../components/Footer"));

const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canonical = `${companyInfo.urls.website}/services`;
  
  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${companyInfo.urls.website}/services#services`,
        "name": "Software Development Services",
        "description": "Full stack web, mobile, and platform development with a senior product team.",
        "provider": {
          "@id": `${companyInfo.urls.website}/#organization`
        },
        "serviceType": "Software Development",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Full Stack Web Development",
                "description": "Complete web application development using React, Node.js, Python, and modern frameworks"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SaaS Platform Development",
                "description": "End-to-end SaaS product design, development, and scaling solutions"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile App Development",
                "description": "Native and cross-platform mobile application development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Project Development",
                "description": "Software development for any project type—web, mobile, SaaS, and beyond. Flexible engagement for projects of any scope."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI & Video Code Assistance",
                "description": "Complete and refine AI-generated or video tutorial code. We finish incomplete implementations and bring them to production."
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": companyInfo.urls.website
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": canonical
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Software Development Services | Ondosoft"
        description="Custom software delivery from a US-based product team. We build and scale web apps, SaaS platforms, mobile experiences, and cloud infrastructure with clear roadmaps and reliable support."
        keywords="software development services, web app development, SaaS development, mobile app development, cloud engineering"
        canonicalUrl={canonical}
        structuredData={servicesStructuredData}
      />
      <ServiceSchema
        serviceName="Software Development Services"
        serviceDescription="Comprehensive software development services including full stack web development, SaaS platform creation, and mobile app development across the United States."
        serviceType="Software Development"
        pageUrl={`${companyInfo.urls.website}/services`}
      />
      <div>
        <div className="mx-auto pt-20">
          <div id="services" className="scroll-mt-20">
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>}>
              <Services />
            </Suspense>
          </div>
        </div>
        
        <section className="px-4 py-16 border-t border-gray-700/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Where we work
            </h2>
            <p className="text-gray-400 max-w-3xl mb-8">
              Ondosoft is based in Lehi, Utah, and partners remotely with teams in the markets below. These are real pages for locations we already name — not a page for every US city.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">States</h3>
                <ul className="flex flex-wrap gap-2">
                  {getFeaturedStates().map((state) => (
                    <li key={state.slug}>
                      <Link
                        to={getGeoPath(state)}
                        className="inline-block px-3 py-1.5 rounded-md border border-gray-700 text-sm text-orange-400 hover:border-orange-500/50 hover:text-orange-300"
                      >
                        {state.name}{state.isHq ? ' (HQ)' : ''}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cities</h3>
                <ul className="flex flex-wrap gap-2">
                  {getFeaturedCities().map((city) => (
                    <li key={city.slug}>
                      <Link
                        to={getGeoPath(city)}
                        className="inline-block px-3 py-1.5 rounded-md border border-gray-700 text-sm text-orange-400 hover:border-orange-500/50 hover:text-orange-300"
                      >
                        {getPlaceLabel(city)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hero CTA Section */}
        <HeroCTA onOpenSchedule={() => setIsModalOpen(true)} />
        
        <Suspense fallback={<div className="h-32" />}>
          <Footer />
        </Suspense>
        {isModalOpen && (
          <Suspense fallback={null}>
            <CalendlyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default ServicesPage;
