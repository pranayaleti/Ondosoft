/**
 * Buyer-facing catalog of offerings that already exist on the site.
 * No invented SKUs — each item points at a real solutions/services/portfolio URL.
 */
export const productCatalog = [
  {
    slug: 'product-engineering',
    name: 'Product Engineering',
    kind: 'solution',
    href: '/solutions/product-engineering',
    eyebrow: 'Build',
    summary: 'Architecture, product UI, APIs, and the operating layer — the same lane described on our Product Engineering page.',
    catalogCopy:
      'Use this when you need a web or SaaS product designed and shipped by a senior US team. It is not a packaged license; it is the engagement we already sell under Product Engineering.',
    audience: 'Founders and product leads with a roadmap, not a staffing request.',
  },
  {
    slug: 'dedicated-teams',
    name: 'Dedicated Engineering Teams',
    kind: 'solution',
    href: '/solutions/dedicated-teams',
    eyebrow: 'Embed',
    summary: 'Senior engineers who operate like your own team — weekly demos, direct access, flexible billing.',
    catalogCopy:
      'This is capacity you can plan around. Same offering as Dedicated Engineering Teams: no anonymous bench, no marketplace match.',
    audience: 'Teams that need shipping capacity without a hiring freeze workaround.',
  },
  {
    slug: 'ai',
    name: 'AI & GenAI',
    kind: 'solution',
    href: '/solutions/ai',
    eyebrow: 'Production AI',
    summary: 'LLM features, automation, and data pipelines wired into real products — not slide-deck prototypes.',
    catalogCopy:
      'The AI lane already on /solutions/ai. We also finish incomplete AI-generated implementations and take them to production.',
    audience: 'Product teams with an AI idea that has to survive traffic and review.',
  },
  {
    slug: 'legacy-modernization',
    name: 'Legacy Modernization',
    kind: 'solution',
    href: '/solutions/legacy-modernization',
    eyebrow: 'Replace risk',
    summary: 'Re-platform aging systems into maintainable, cloud-ready software without a greenfield fantasy.',
    catalogCopy:
      'Same modernization practice as /solutions/legacy-modernization: React UI, APIs, data migration, and a cutover you can schedule.',
    audience: 'Operators stuck on a system that is expensive to change and riskier to leave.',
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    kind: 'solution',
    href: '/solutions/cloud-devops',
    eyebrow: 'Operate',
    summary: 'AWS, GCP, Docker, Kubernetes, CI/CD, and Terraform for software that stays up.',
    catalogCopy:
      'Infrastructure and delivery habits we already list under Cloud & DevOps. Not a generic “we do cloud” badge.',
    audience: 'Teams whose product is outgrowing the original deploy story.',
  },
  {
    slug: 'web-mobile',
    name: 'Web & Mobile',
    kind: 'solution',
    href: '/solutions/web-mobile',
    eyebrow: 'Every surface',
    summary: 'React, React Native, Flutter, and native iOS/Android with shared APIs.',
    catalogCopy:
      'The Web & Mobile lane already on the site. One product, the surfaces your users actually use.',
    audience: 'Companies that need web and mobile to stay in sync.',
  },
  {
    slug: 'software-development-services',
    name: 'Software Development Services',
    kind: 'service',
    href: '/services',
    eyebrow: 'Services hub',
    summary: 'The full-stack services index — web, SaaS, mobile, and cloud — with the regions we already name.',
    catalogCopy:
      'This is the /services hub, not a new package. From here you can also reach the city and state pages we actually operate as service areas from Lehi, Utah.',
    audience: 'Buyers comparing a services engagement rather than a single solution lane.',
  },
  {
    slug: 'capabilities-deck',
    name: 'Capabilities Deck',
    kind: 'resource',
    href: '/capabilities-deck',
    eyebrow: 'Leave-behind',
    summary: 'The existing capabilities deck: services, stack, and how we ship.',
    catalogCopy:
      'Not a product SKU. It is the same deck already published at /capabilities-deck, listed here so procurement can find it next to the lanes it describes.',
    audience: 'Stakeholders who need a single PDF-style overview before a call.',
  },
];

export function getProductBySlug(slug) {
  return productCatalog.find((item) => item.slug === slug) || null;
}

export function getProductPath(item) {
  return `/products/${item.slug}`;
}

export function getProductPrerenderRoutes() {
  return [
    {
      path: '/products',
      title: 'What Ondosoft Offers | Product Catalog',
      description:
        'A catalog of Ondosoft offerings that already exist on this site: product engineering, dedicated teams, AI, modernization, cloud, web and mobile, services, and the capabilities deck.',
    },
    ...productCatalog.map((item) => ({
      path: getProductPath(item),
      title: `${item.name} | Ondosoft Catalog`,
      description: item.summary,
    })),
  ];
}
