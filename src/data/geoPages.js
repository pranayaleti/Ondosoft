/**
 * Featured geo landing pages.
 * Only locations the site already claims: HQ (Lehi, Utah) plus the
 * TOP_CITIES list and their parent states. Not a 50-state doorway farm.
 */

export const GEO_KIND = {
  STATE: 'state',
  CITY: 'city',
};

const STATES = [
  {
    kind: GEO_KIND.STATE,
    slug: 'utah',
    name: 'Utah',
    abbreviation: 'UT',
    isHq: true,
    h1: 'Product engineering from Lehi, Utah',
    title: 'Utah Software Development | Ondosoft Lehi',
    description:
      'Ondosoft builds custom software, SaaS, and AI products from our studio in Lehi, Utah. Weekly demos, senior engineers, and a path to production for Silicon Slopes and nationwide teams.',
    keywords: 'Utah software development, Lehi product engineering, Silicon Slopes SaaS, Ondosoft Utah',
    intro:
      'Ondosoft is based in Lehi, on the Silicon Slopes. This is our home market: founders and product teams who want a US studio that writes production code, not a slide deck.',
    focus:
      'From our Thanksgiving Way studio we ship React, Node.js, and Python systems with the same cadence we use for remote clients — weekly demos, a shared roadmap, and engineers you can talk to. Utah companies get same-timezone collaboration (America/Denver) without giving up a national delivery practice.',
    industries: ['SaaS & Technology', 'Finance & FinTech', 'Healthcare & Medical', 'Education & EdTech'],
    citySlugs: ['lehi-ut'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'california',
    name: 'California',
    abbreviation: 'CA',
    isHq: false,
    h1: 'Software development for California product teams',
    title: 'California Software Development | Ondosoft',
    description:
      'Ondosoft partners with California startups and enterprises on custom web, SaaS, mobile, and AI engineering. A US-based product team in Utah working with LA and San Francisco companies.',
    keywords: 'California software development, Los Angeles SaaS, San Francisco product engineering, Ondosoft',
    intro:
      'California teams often need more shipping capacity than they can hire locally — without handing the product to an anonymous bench. Ondosoft works as a dedicated engineering team for companies in Los Angeles, San Francisco, and across the state.',
    focus:
      'We cover the product surface you already run: React applications, billing and multi-tenant SaaS, mobile clients, and AI features that have to survive production traffic. You keep the roadmap; we embed like an extension of your org, with weekly demos on Pacific time.',
    industries: ['SaaS & Technology', 'Entertainment & Media', 'Finance & FinTech', 'E-commerce & Retail'],
    citySlugs: ['los-angeles-ca', 'san-francisco-ca'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'texas',
    name: 'Texas',
    abbreviation: 'TX',
    isHq: false,
    h1: 'Custom software for Texas companies',
    title: 'Texas Software Development | Ondosoft',
    description:
      'Ondosoft builds web apps, SaaS platforms, and cloud systems for Houston and Dallas teams. Senior US engineers, weekly demos, and production delivery — not a staffing marketplace.',
    keywords: 'Texas software development, Houston SaaS, Dallas product engineering, Ondosoft',
    intro:
      'Houston and Dallas companies are scaling operations software, customer platforms, and internal tools as fast as the market moves. Ondosoft gives those teams a senior product studio they can plan a quarter around.',
    focus:
      'Typical Texas work for us is logistics dashboards, payments-backed SaaS, and modernization of systems that still run on last decade’s stack. We meet Central time for standups and ship on AWS or GCP with CI/CD you can inherit.',
    industries: ['Logistics & Supply Chain', 'Manufacturing', 'Finance & FinTech', 'SaaS & Technology'],
    citySlugs: ['houston-tx', 'dallas-tx'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'new-york',
    name: 'New York',
    abbreviation: 'NY',
    isHq: false,
    h1: 'Product engineering for New York teams',
    title: 'New York Software Development | Ondosoft',
    description:
      'Ondosoft delivers custom software and SaaS for New York companies — React, Node.js, Python, and AI features with a US studio and weekly demos.',
    keywords: 'New York software development, NYC SaaS development, Ondosoft product engineering',
    intro:
      'New York product orgs move quickly and expect the people writing the code to show up. Ondosoft works with NYC teams as a dedicated engineering partner, not a ticket queue overseas.',
    focus:
      'We take on customer-facing platforms, fintech-adjacent tooling, and media products that need reliable APIs and a React UI that holds up. Eastern-time overlap is built into how we schedule demos and reviews.',
    industries: ['Finance & FinTech', 'SaaS & Technology', 'Entertainment & Media', 'E-commerce & Retail'],
    citySlugs: ['new-york-ny'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'florida',
    name: 'Florida',
    abbreviation: 'FL',
    isHq: false,
    h1: 'Software development for Florida businesses',
    title: 'Florida Software Development | Ondosoft',
    description:
      'Ondosoft builds web, mobile, and SaaS products for Miami and Florida teams. A US-based studio with clear roadmaps, weekly demos, and production cloud delivery.',
    keywords: 'Florida software development, Miami SaaS, Ondosoft web development',
    intro:
      'Florida companies — especially in Miami — are standing up consumer products, hospitality platforms, and operations software with a lean internal team. We fill the engineering gap without a local hiring freeze.',
    focus:
      'Expect web and mobile surfaces, booking-adjacent portals, and cloud setups that stay up when traffic spikes. We collaborate across Eastern time and keep the same weekly demo cadence we use everywhere else.',
    industries: ['Travel & Hospitality', 'E-commerce & Retail', 'Finance & FinTech', 'SaaS & Technology'],
    citySlugs: ['miami-fl'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'illinois',
    name: 'Illinois',
    abbreviation: 'IL',
    isHq: false,
    h1: 'Custom software for Illinois and Chicago teams',
    title: 'Illinois Software Development | Ondosoft',
    description:
      'Ondosoft partners with Chicago and Illinois companies on SaaS platforms, internal tools, and legacy modernization. Senior US engineers with weekly delivery reviews.',
    keywords: 'Illinois software development, Chicago SaaS, Ondosoft product engineering',
    intro:
      'Chicago teams often inherit a mix of solid operations and aging software. Ondosoft helps Illinois companies ship the next platform without pausing the business that already works.',
    focus:
      'We modernize UIs on React, extract APIs from older systems, and stand up the cloud and CI/CD those products need. Central-time overlap makes planning and demos straightforward.',
    industries: ['Logistics & Supply Chain', 'Finance & FinTech', 'Manufacturing', 'SaaS & Technology'],
    citySlugs: ['chicago-il'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'georgia',
    name: 'Georgia',
    abbreviation: 'GA',
    isHq: false,
    h1: 'Software development for Georgia companies',
    title: 'Georgia Software Development | Ondosoft',
    description:
      'Ondosoft builds custom web, mobile, and cloud products for Atlanta and Georgia teams. Dedicated US engineers, weekly demos, and a path from backlog to production.',
    keywords: 'Georgia software development, Atlanta SaaS, Ondosoft Atlanta',
    intro:
      'Atlanta is a logistics, payments, and SaaS hub. Georgia companies come to Ondosoft when they need a product team that can own a slice of the roadmap and actually ship it.',
    focus:
      'Typical work includes operations dashboards, customer portals, and cloud cutovers. We schedule against Eastern time and keep engineers on the call — not a rotating account manager.',
    industries: ['Logistics & Supply Chain', 'Finance & FinTech', 'SaaS & Technology', 'Healthcare & Medical'],
    citySlugs: ['atlanta-ga'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'washington',
    name: 'Washington',
    abbreviation: 'WA',
    isHq: false,
    h1: 'Product engineering for Washington State teams',
    title: 'Washington Software Development | Ondosoft',
    description:
      'Ondosoft works with Seattle and Washington companies on SaaS, AI features, and cloud-native platforms. A US studio that embeds like your own team.',
    keywords: 'Washington software development, Seattle SaaS, Ondosoft product engineering',
    intro:
      'Seattle-area teams already know how software should be built. They hire Ondosoft for extra senior capacity — people who can sit in the architecture conversation and then write the code.',
    focus:
      'We ship React and Node/Python systems, production AI features, and AWS or GCP infrastructure with Terraform and CI/CD. Pacific-time demos keep the loop tight with your existing eng leadership.',
    industries: ['SaaS & Technology', 'E-commerce & Retail', 'Healthcare & Medical', 'Logistics & Supply Chain'],
    citySlugs: ['seattle-wa'],
  },
  {
    kind: GEO_KIND.STATE,
    slug: 'massachusetts',
    name: 'Massachusetts',
    abbreviation: 'MA',
    isHq: false,
    h1: 'Software development for Massachusetts teams',
    title: 'Massachusetts Software Development | Ondosoft',
    description:
      'Ondosoft delivers custom software and SaaS for Boston and Massachusetts companies — healthcare-conscious delivery, fintech tooling, and production AI features.',
    keywords: 'Massachusetts software development, Boston SaaS, Ondosoft product engineering',
    intro:
      'Boston product teams sit at the intersection of healthcare, education, and fintech. Ondosoft partners with those orgs when they need production engineering without inflating headcount.',
    focus:
      'We build patient- and campus-adjacent web applications (without inventing clinical certifications we do not hold), subscription platforms, and internal tools. Eastern-time collaboration and weekly demos are the default.',
    industries: ['Healthcare & Medical', 'Education & EdTech', 'Finance & FinTech', 'SaaS & Technology'],
    citySlugs: ['boston-ma'],
  },
];

const CITIES = [
  {
    kind: GEO_KIND.CITY,
    slug: 'lehi-ut',
    name: 'Lehi',
    state: 'UT',
    stateName: 'Utah',
    stateSlug: 'utah',
    displayName: 'Lehi, UT',
    isHq: true,
    h1: 'Ondosoft — software studio in Lehi, Utah',
    title: 'Lehi, Utah Software Development | Ondosoft HQ',
    description:
      'Ondosoft is a product engineering studio at 2701 N Thanksgiving Way, Lehi, Utah. Custom software, SaaS, and AI delivery for Silicon Slopes teams and remote clients nationwide.',
    keywords: 'Lehi software development, Ondosoft Lehi, Silicon Slopes product studio, Utah SaaS',
    intro:
      'Our office is in Lehi. If you are on the Silicon Slopes and want a studio that will sit in the room, walk the roadmap, and then ship, this is the page for that conversation.',
    focus:
      'Lehi work looks like dedicated product teams for local SaaS companies, modernization of tools that grew faster than their stack, and AI features that have to land in production — not a hackathon demo. Same-timezone standups are the easy part; the hard part is the engineering, and that is what we sell.',
    industries: ['SaaS & Technology', 'Finance & FinTech', 'Education & EdTech'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'new-york-ny',
    name: 'New York',
    state: 'NY',
    stateName: 'New York',
    stateSlug: 'new-york',
    displayName: 'New York, NY',
    isHq: false,
    h1: 'Software development for New York City teams',
    title: 'New York City Software Development | Ondosoft',
    description:
      'Ondosoft builds SaaS platforms, fintech tooling, and customer-facing web apps for New York City companies. US-based engineers, weekly demos, Eastern-time overlap.',
    keywords: 'NYC software development, New York SaaS, hire developers New York, Ondosoft',
    intro:
      'New York City teams rarely lack ideas. They lack a product engineering partner who will own a milestone and show working software every week. That is the engagement we run.',
    focus:
      'We take multi-tenant SaaS, payments-backed products, and media experiences from backlog to a production release. You get React, Node.js or Python, and cloud infrastructure — plus humans on the demo, not a status email.',
    industries: ['Finance & FinTech', 'Entertainment & Media', 'SaaS & Technology', 'E-commerce & Retail'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'los-angeles-ca',
    name: 'Los Angeles',
    state: 'CA',
    stateName: 'California',
    stateSlug: 'california',
    displayName: 'Los Angeles, CA',
    isHq: false,
    h1: 'Custom software for Los Angeles companies',
    title: 'Los Angeles Software Development | Ondosoft',
    description:
      'Ondosoft partners with Los Angeles teams on web, mobile, and media-adjacent products. A Utah-based US studio that embeds with LA companies and ships on a weekly cadence.',
    keywords: 'Los Angeles software development, LA SaaS, Ondosoft Los Angeles',
    intro:
      'Los Angeles companies in media, retail, and consumer products need software that holds up on mobile and survives a launch spike. Ondosoft is the remote product team that still shows up for the review.',
    focus:
      'Typical LA work: customer-facing React apps, React Native or Flutter clients, and the APIs that keep content and commerce in sync. Pacific-time demos, a shared roadmap, and no bait-and-switch staffing.',
    industries: ['Entertainment & Media', 'E-commerce & Retail', 'SaaS & Technology'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'san-francisco-ca',
    name: 'San Francisco',
    state: 'CA',
    stateName: 'California',
    stateSlug: 'california',
    displayName: 'San Francisco, CA',
    isHq: false,
    h1: 'Product engineering for San Francisco teams',
    title: 'San Francisco Software Development | Ondosoft',
    description:
      'Ondosoft works with San Francisco startups and scale-ups on SaaS platforms, AI features, and cloud infrastructure. Senior US engineers who operate like your own team.',
    keywords: 'San Francisco software development, SF SaaS, Bay Area product engineering, Ondosoft',
    intro:
      'San Francisco teams already have strong product taste. They hire Ondosoft when they need more senior full-stack capacity — architecture, APIs, and the operating layer — without another six-month hiring loop.',
    focus:
      'We ship multi-tenant products, LLM features wired into real workflows, and AWS/GCP setups with Terraform and CI/CD. You keep technical direction; we take a slice of the roadmap to production.',
    industries: ['SaaS & Technology', 'Finance & FinTech', 'Healthcare & Medical'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'chicago-il',
    name: 'Chicago',
    state: 'IL',
    stateName: 'Illinois',
    stateSlug: 'illinois',
    displayName: 'Chicago, IL',
    isHq: false,
    h1: 'Software development for Chicago teams',
    title: 'Chicago Software Development | Ondosoft',
    description:
      'Ondosoft builds custom platforms and modernizes legacy systems for Chicago companies. Logistics, finance, and SaaS delivery from a US product studio.',
    keywords: 'Chicago software development, Chicago SaaS, Illinois product engineering, Ondosoft',
    intro:
      'Chicago engineering orgs often run a stable core and a pile of systems that should have been replaced two years ago. We help you ship the replacement without a freeze on the business.',
    focus:
      'Legacy UI on React, API extraction, data migration, and cloud cutover are the usual shape. Central-time collaboration and weekly demos keep your stakeholders in the loop.',
    industries: ['Logistics & Supply Chain', 'Finance & FinTech', 'Manufacturing', 'SaaS & Technology'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'houston-tx',
    name: 'Houston',
    state: 'TX',
    stateName: 'Texas',
    stateSlug: 'texas',
    displayName: 'Houston, TX',
    isHq: false,
    h1: 'Custom software for Houston companies',
    title: 'Houston Software Development | Ondosoft',
    description:
      'Ondosoft delivers web apps, operations platforms, and cloud systems for Houston teams. Senior US engineers with weekly demos and a clear path to production.',
    keywords: 'Houston software development, Houston SaaS, Texas product engineering, Ondosoft',
    intro:
      'Houston companies run complex operations — energy-adjacent workflows, logistics, and industrial software that cannot be a weekend prototype. Ondosoft builds the durable version.',
    focus:
      'We replace spreadsheet-shaped processes with internal tools, stand up customer portals, and put CI/CD under releases that used to be manual. Central-time overlap is the default.',
    industries: ['Logistics & Supply Chain', 'Manufacturing', 'SaaS & Technology'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'dallas-tx',
    name: 'Dallas',
    state: 'TX',
    stateName: 'Texas',
    stateSlug: 'texas',
    displayName: 'Dallas, TX',
    isHq: false,
    h1: 'Software development for Dallas–Fort Worth teams',
    title: 'Dallas Software Development | Ondosoft',
    description:
      'Ondosoft partners with Dallas companies on SaaS, payments-backed products, and cloud platforms. A US studio that embeds with your team and ships weekly.',
    keywords: 'Dallas software development, DFW SaaS, Texas product engineering, Ondosoft',
    intro:
      'Dallas–Fort Worth has a deep bench of finance, logistics, and SaaS companies that need more delivery than they can staff. Ondosoft is the dedicated team for that gap.',
    focus:
      'Subscription billing, multi-tenant architecture, and React admin surfaces show up often. We work Central time and keep the people writing the code on the weekly demo.',
    industries: ['Finance & FinTech', 'Logistics & Supply Chain', 'SaaS & Technology'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'miami-fl',
    name: 'Miami',
    state: 'FL',
    stateName: 'Florida',
    stateSlug: 'florida',
    displayName: 'Miami, FL',
    isHq: false,
    h1: 'Product engineering for Miami companies',
    title: 'Miami Software Development | Ondosoft',
    description:
      'Ondosoft builds web, mobile, and hospitality-adjacent products for Miami teams. US-based engineers, Eastern-time collaboration, and production cloud delivery.',
    keywords: 'Miami software development, Miami SaaS, Florida product engineering, Ondosoft',
    intro:
      'Miami startups and operators want consumer-grade surfaces and back-office software that does not collapse on a Friday night. We build both sides of that product.',
    focus:
      'Booking-adjacent portals, mobile clients, and payments-aware web apps are common. We schedule Eastern-time reviews and treat launch as an engineering problem, not a marketing date.',
    industries: ['Travel & Hospitality', 'Finance & FinTech', 'E-commerce & Retail', 'SaaS & Technology'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'atlanta-ga',
    name: 'Atlanta',
    state: 'GA',
    stateName: 'Georgia',
    stateSlug: 'georgia',
    displayName: 'Atlanta, GA',
    isHq: false,
    h1: 'Custom software for Atlanta teams',
    title: 'Atlanta Software Development | Ondosoft',
    description:
      'Ondosoft delivers SaaS, logistics platforms, and cloud engineering for Atlanta companies. Dedicated US product engineers with weekly demos.',
    keywords: 'Atlanta software development, Atlanta SaaS, Georgia product engineering, Ondosoft',
    intro:
      'Atlanta is where logistics, payments, and SaaS operators need software that talks to the rest of the stack. Ondosoft builds those integrations and the product UI around them.',
    focus:
      'Tracking dashboards, customer portals, and cloud infrastructure with CI/CD are the usual brief. Eastern-time standups, a shared roadmap, and engineers you can email directly.',
    industries: ['Logistics & Supply Chain', 'Finance & FinTech', 'SaaS & Technology'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'seattle-wa',
    name: 'Seattle',
    state: 'WA',
    stateName: 'Washington',
    stateSlug: 'washington',
    displayName: 'Seattle, WA',
    isHq: false,
    h1: 'Software development for Seattle teams',
    title: 'Seattle Software Development | Ondosoft',
    description:
      'Ondosoft works with Seattle companies on SaaS platforms, AI-enabled products, and cloud-native systems. Senior US engineers who operate like an in-house team.',
    keywords: 'Seattle software development, Seattle SaaS, Washington product engineering, Ondosoft',
    intro:
      'Seattle engineering cultures expect code review, observability, and a boring production path. Ondosoft shows up with that bar — and the capacity your current team cannot staff this quarter.',
    focus:
      'We add LLM features to existing products, modernize frontends on React, and run AWS or GCP with Terraform. Pacific-time demos keep your tech lead in the conversation.',
    industries: ['SaaS & Technology', 'E-commerce & Retail', 'Healthcare & Medical'],
  },
  {
    kind: GEO_KIND.CITY,
    slug: 'boston-ma',
    name: 'Boston',
    state: 'MA',
    stateName: 'Massachusetts',
    stateSlug: 'massachusetts',
    displayName: 'Boston, MA',
    isHq: false,
    h1: 'Product engineering for Boston companies',
    title: 'Boston Software Development | Ondosoft',
    description:
      'Ondosoft builds healthcare-conscious web apps, EdTech products, and SaaS platforms for Boston teams. A US studio with Eastern-time overlap and weekly delivery reviews.',
    keywords: 'Boston software development, Boston SaaS, Massachusetts product engineering, Ondosoft',
    intro:
      'Boston companies in healthcare, education, and fintech need software that is careful without being slow. Ondosoft is the product team for that mix.',
    focus:
      'We ship portals, admin tools, and subscription platforms. We do not invent clinical certifications we do not hold — we do ship secure, maintainable React and API systems your team can own.',
    industries: ['Healthcare & Medical', 'Education & EdTech', 'Finance & FinTech', 'SaaS & Technology'],
  },
];

export const featuredGeoPages = [...STATES, ...CITIES];

const bySlug = new Map(featuredGeoPages.map((page) => [page.slug, page]));

export function getGeoPageBySlug(slug) {
  if (!slug) return null;
  return bySlug.get(slug) || null;
}

export function getFeaturedStates() {
  return featuredGeoPages.filter((page) => page.kind === GEO_KIND.STATE);
}

export function getFeaturedCities() {
  return featuredGeoPages.filter((page) => page.kind === GEO_KIND.CITY);
}

export function getRelatedGeoPages(place) {
  if (!place) return [];

  switch (place.kind) {
    case GEO_KIND.STATE: {
      const cities = (place.citySlugs || [])
        .map((slug) => bySlug.get(slug))
        .filter(Boolean);
      return cities;
    }
    case GEO_KIND.CITY: {
      const parent = bySlug.get(place.stateSlug);
      const siblings = getFeaturedCities().filter(
        (city) => city.stateSlug === place.stateSlug && city.slug !== place.slug
      );
      return [parent, ...siblings].filter(Boolean);
    }
    default: {
      const _exhaustive = place.kind;
      throw new Error(`Unhandled geo kind: ${_exhaustive}`);
    }
  }
}

export function getPlaceLabel(place) {
  if (!place) return '';
  switch (place.kind) {
    case GEO_KIND.STATE:
      return place.name;
    case GEO_KIND.CITY:
      return place.displayName;
    default: {
      const _exhaustive = place.kind;
      throw new Error(`Unhandled geo kind: ${_exhaustive}`);
    }
  }
}

export function getGeoPath(place) {
  return `/services/${place.slug}`;
}

export function getGeoSitemapEntries(lastmod) {
  return featuredGeoPages.map((page) => ({
    url: getGeoPath(page),
    priority: page.isHq ? '0.7' : page.kind === GEO_KIND.CITY ? '0.65' : '0.6',
    changefreq: 'monthly',
    lastmod,
  }));
}

export function getGeoPrerenderRoutes() {
  return featuredGeoPages.map((page) => ({
    path: getGeoPath(page),
    title: page.title,
    description: page.description,
  }));
}

export function buildGeoStructuredData(place, { website, canonical, address }) {
  const label = getPlaceLabel(place);
  const areaServed = (() => {
    switch (place.kind) {
      case GEO_KIND.STATE:
        return {
          '@type': 'State',
          name: place.name,
          alternateName: place.abbreviation,
        };
      case GEO_KIND.CITY:
        return {
          '@type': 'City',
          name: place.name,
          containedInPlace: {
            '@type': 'State',
            name: place.stateName,
          },
        };
      default: {
        const _exhaustive = place.kind;
        throw new Error(`Unhandled geo kind: ${_exhaustive}`);
      }
    }
  })();

  const graph = [
    {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: `Software Development in ${label}`,
      description: place.description,
      provider: { '@id': `${website}/#organization` },
      serviceType: 'Software Development',
      url: canonical,
      areaServed,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: website,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${website}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: label,
          item: canonical,
        },
      ],
    },
  ];

  if (place.isHq && address) {
    graph.push({
      '@type': 'LocalBusiness',
      '@id': `${canonical}#localbusiness`,
      name: `${address.name} ${label}`,
      description: place.description,
      url: canonical,
      telephone: address.telephone,
      email: address.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      },
      parentOrganization: { '@id': `${website}/#organization` },
      areaServed,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
