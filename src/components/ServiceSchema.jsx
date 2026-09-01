import { useLocation } from 'react-router-dom';
import { companyInfo } from '../constants/companyInfo';
import { shouldEmitPageJsonLd } from '../utils/staticJsonLd';

// Service-specific schema markup for individual service pages.
// Provider references the global Organization graph (@id) instead of
// re-emitting a full Organization, so we do not duplicate the entity.
const ServiceSchema = ({ serviceName, serviceDescription, serviceType, pageUrl }) => {
  const { pathname } = useLocation();
  if (!shouldEmitPageJsonLd(pathname)) {
    return null;
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": { "@id": `${companyInfo.urls.website}/#organization` },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": serviceType,
    "category": "Software Development",
    "url": pageUrl,
    "offers": {
      "@type": "Offer",
      "description": serviceDescription,
      "priceRange": "$$",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema)
      }}
    />
  );
};

// LocalBusiness schema for city-specific pages
const CityServiceSchema = ({ city, state, serviceName, serviceDescription, pageUrl }) => {
  const cityServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${companyInfo.name} - ${serviceName} in ${city}, ${state}`,
    "description": `${serviceDescription} services in ${city}, ${state}. Professional software development, custom projects, and SaaS solutions.`,
    "url": pageUrl || `${companyInfo.urls.website}/services/${city.toLowerCase().replace(/\s+/g, '-')}-${state.toLowerCase()}`,
    "telephone": companyInfo.phoneE164,
    "email": companyInfo.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": city,
      "containedInPlace": {
        "@type": "State",
        "name": state
      }
    },
    "serviceArea": {
      "@type": "City",
      "name": city,
      "containedInPlace": {
        "@type": "State",
        "name": state
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Services in ${city}, ${state}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName,
            "description": serviceDescription
          }
        }
      ]
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": companyInfo.name,
      "url": companyInfo.urls.website
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cityServiceSchema)
      }}
    />
  );
};

// SoftwareApplication schema for SaaS and app development
const SoftwareApplicationSchema = ({ appName, appDescription, category }) => {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": appName,
    "description": appDescription,
    "applicationCategory": category,
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": companyInfo.name,
      "url": companyInfo.urls.website
    },
    "publisher": {
      "@type": "Organization",
      "name": companyInfo.name,
      "url": companyInfo.urls.website
    },
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareAppSchema)
      }}
    />
  );
};

export { ServiceSchema, CityServiceSchema, SoftwareApplicationSchema };
export default ServiceSchema;
