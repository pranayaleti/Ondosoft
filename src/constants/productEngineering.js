import { companyInfo } from './companyInfo';

export const BUILD_TEAM_PATH = '/contact?intent=build-team';
export const SCHEDULE_PATH = '/contact#book';
export const PORTFOLIO_PATH = '/case-studies';

export const trustMetrics = [
  {
    value: companyInfo.ratings.display,
    label: 'Client rating',
    note: `${companyInfo.ratings.reviewCount} reviews on file`,
    verified: true,
  },
  {
    value: '50+',
    label: 'Launches delivered',
    note: 'From the About page — SaaS, enterprise, and web',
    verified: true,
  },
  {
    value: 'US-based',
    label: companyInfo.location.short,
    note: `Founded ${companyInfo.foundingDateDisplay}`,
    verified: true,
  },
  {
    value: 'Weekly demos',
    label: 'Direct engineer access',
    note: 'Existing delivery practice — not a marketplace match SLA',
    verified: true,
  },
];

export const solutions = [
  {
    slug: 'product-engineering',
    name: 'Product Engineering',
    eyebrow: 'From concept to production',
    summary: 'We design and ship production-grade web and platform software — architecture, product UI, APIs, and the operating layer around them.',
    description: 'Ondosoft builds high-performance web applications and SaaS products. From complex internal tools to customer-facing platforms, we deliver production-grade code with a strategy-first roadmap.',
    capabilities: [
      'Product discovery and technical roadmapping',
      'React and Next.js application engineering',
      'Node.js and Python APIs',
      'Database design and integration',
      'Authentication, billing, and admin surfaces',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Stripe'],
    href: '/solutions/product-engineering',
    cta: 'Explore solution',
    seoTitle: 'Product Engineering | Ondosoft',
    seoDescription: 'Ondosoft product engineering for custom web apps and SaaS platforms. US-based engineers shipping React, Node.js, and Python systems with clear roadmaps.',
  },
  {
    slug: 'dedicated-teams',
    name: 'Dedicated Engineering Teams',
    eyebrow: 'An extension of your org',
    summary: 'Embed senior engineers who operate like your own team — weekly demos, direct access, and delivery you can plan around.',
    description: 'Need capacity without the overhead of a traditional agency bench? Ondosoft embeds as a dedicated product team: strategy, design, and engineering with transparent weekly demos and founder-level attention.',
    capabilities: [
      'Dedicated full-stack engineers',
      'Direct access to the people writing the code',
      'Fixed-price or agile billing',
      'Weekly demos and shared roadmap',
      'Post-launch support included',
    ],
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'CI/CD'],
    href: '/solutions/dedicated-teams',
    cta: 'Explore solution',
    seoTitle: 'Dedicated Engineering Teams | Ondosoft',
    seoDescription: 'Dedicated Ondosoft engineering teams that operate like your own. Senior full-stack delivery, weekly demos, and flexible engagement for startups and enterprises.',
  },
  {
    slug: 'ai',
    name: 'AI & GenAI',
    eyebrow: 'Production, not a demo',
    summary: 'Turn AI from an experiment into a shipped capability — LLM features, automation, and data pipelines wired into real products.',
    description: 'Ondosoft builds AI-enabled software: LLM-powered product features, intelligent automation, and data pipelines. We also finish incomplete AI-generated implementations and take them to production.',
    capabilities: [
      'LLM-powered product features',
      'Business process automation',
      'Data pipelines and NLP',
      'Computer vision where the product needs it',
      'Productionizing AI-generated or tutorial code',
    ],
    technologies: ['OpenAI', 'LangChain', 'Python', 'Node.js', 'PostgreSQL', 'Data pipelines'],
    href: '/solutions/ai',
    cta: 'Explore AI Engineering',
    seoTitle: 'AI Engineering | Ondosoft',
    seoDescription: 'Ondosoft AI engineering: LLM features, automation, NLP, and data pipelines shipped into production software — not slide-deck prototypes.',
  },
  {
    slug: 'legacy-modernization',
    name: 'Legacy Modernization',
    eyebrow: 'Replace risk with a path',
    summary: 'Re-platform aging systems into maintainable, cloud-ready software without inventing a greenfield fantasy.',
    description: 'We modernize legacy applications into current stacks — React frontends, Node.js or Python APIs, and cloud infrastructure — so teams can ship again instead of firefighting.',
    capabilities: [
      'Application re-architecture',
      'UI modernization on React',
      'API extraction and integration',
      'Data migration',
      'Cloud cutover and observability',
    ],
    technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    href: '/solutions/legacy-modernization',
    cta: 'Explore solution',
    seoTitle: 'Legacy Modernization | Ondosoft',
    seoDescription: 'Modernize legacy software with Ondosoft. Re-architecture, React UI, APIs, data migration, and cloud cutover from a US-based product team.',
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    eyebrow: 'Operate what you ship',
    summary: 'Cloud infrastructure, CI/CD, and the operational habits that keep products stable as traffic and teams grow.',
    description: 'Ondosoft deploys and operates software on AWS and Google Cloud — containers, CI/CD, infrastructure as code, and the monitoring needed for production systems.',
    capabilities: [
      'AWS and Google Cloud architecture',
      'Docker and Kubernetes',
      'CI/CD pipelines',
      'Infrastructure as code (Terraform)',
      'Performance, security, and uptime practices',
    ],
    technologies: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    href: '/solutions/cloud-devops',
    cta: 'Explore solution',
    seoTitle: 'Cloud & DevOps | Ondosoft',
    seoDescription: 'Cloud engineering and DevOps from Ondosoft: AWS, GCP, Docker, Kubernetes, CI/CD, and Terraform for software that stays up in production.',
  },
  {
    slug: 'web-mobile',
    name: 'Web & Mobile',
    eyebrow: 'One product, every surface',
    summary: 'Responsive web, React Native and Flutter apps, and the APIs that keep them in sync.',
    description: 'We deliver web applications and native-quality mobile experiences across iOS and Android, with a shared backend and a mobile-first design bar.',
    capabilities: [
      'Responsive web applications',
      'React Native development',
      'Flutter and native iOS/Android',
      'App Store deployment',
      'Shared APIs and authentication',
    ],
    technologies: ['React', 'React Native', 'Flutter', 'iOS', 'Android', 'Node.js'],
    href: '/solutions/web-mobile',
    cta: 'Explore solution',
    seoTitle: 'Web & Mobile Development | Ondosoft',
    seoDescription: 'Web and mobile development from Ondosoft — React, React Native, Flutter, and native iOS/Android with shared APIs and production deployment.',
  },
];

export const getSolutionBySlug = (slug) => solutions.find((item) => item.slug === slug);

export const selectorOptions = [
  {
    id: 'new-product',
    label: 'Build a new product',
    solutionSlug: 'product-engineering',
    team: ['Product engineer', 'Full-stack engineer', 'UI/UX'],
    engagement: 'Project-based or dedicated team after discovery',
    ctaLabel: 'Build My Team',
    ctaHref: '/contact?intent=build-team&source=selector-new-product',
  },
  {
    id: 'add-engineers',
    label: 'Add engineers to my team',
    solutionSlug: 'dedicated-teams',
    team: ['Dedicated full-stack engineers', 'Shared technical lead'],
    engagement: 'Dedicated team that works as an extension of yours',
    ctaLabel: 'Build My Team',
    ctaHref: '/contact?intent=build-team&source=selector-add-engineers',
  },
  {
    id: 'modernize',
    label: 'Modernize legacy software',
    solutionSlug: 'legacy-modernization',
    team: ['Engineering director (consult)', 'Full-stack engineers', 'DevOps'],
    engagement: 'Phased modernization — assess, extract, cut over',
    ctaLabel: 'Talk to an Engineering Director',
    ctaHref: '/contact?intent=modernize&source=selector-modernize',
  },
  {
    id: 'add-ai',
    label: 'Add AI to my product',
    solutionSlug: 'ai',
    team: ['AI-capable full-stack engineer', 'Data/pipeline support'],
    engagement: 'Feature sprint or dedicated AI workstream',
    ctaLabel: 'Explore AI Engineering',
    ctaHref: '/solutions/ai',
  },
  {
    id: 'scale-app',
    label: 'Scale my application',
    solutionSlug: 'cloud-devops',
    team: ['Cloud/DevOps engineer', 'Backend engineer'],
    engagement: 'Infrastructure and performance engagement',
    ctaLabel: 'Build My Team',
    ctaHref: '/contact?intent=build-team&source=selector-scale',
  },
  {
    id: 'reduce-cost',
    label: 'Reduce engineering costs',
    solutionSlug: 'dedicated-teams',
    team: ['Right-sized dedicated team', 'Shared lead'],
    engagement: 'Illustrative cost model first, then a scoped proposal',
    ctaLabel: 'Estimate Team Cost',
    ctaHref: '#cost-calculator',
  },
  {
    id: 'mobile-app',
    label: 'Build a mobile application',
    solutionSlug: 'web-mobile',
    team: ['Mobile engineer', 'API engineer', 'UI/UX'],
    engagement: 'Project-based mobile + API delivery',
    ctaLabel: 'Build My Team',
    ctaHref: '/contact?intent=build-team&source=selector-mobile',
  },
];

export const businessStages = [
  {
    id: 'startups',
    name: 'Startups',
    headline: 'Ship an MVP that can become the real product',
    body: 'Founder-led studio pace: discovery, a clear build plan, and production software — not a throwaway prototype.',
    capabilities: [
      'Product discovery and MVP scoping',
      'Custom web applications',
      'SaaS foundations (auth, billing, admin)',
      'Mobile when the product needs a native surface',
      'Launch hosting, analytics, and support',
    ],
  },
  {
    id: 'scaleups',
    name: 'Scale-ups',
    headline: 'Add senior capacity without losing the plot',
    body: 'Dedicated engineers, architecture that survives the next ten thousand users, and weekly demos so the roadmap stays honest.',
    capabilities: [
      'Dedicated engineering teams',
      'Multi-tenant SaaS architecture',
      'API and third-party integrations',
      'Performance and cloud scale-out',
      'Continuous delivery and post-launch iteration',
    ],
  },
  {
    id: 'enterprises',
    name: 'Enterprises',
    headline: 'Modernize and operate with a senior product team',
    body: 'Strategy-first discovery, enterprise security practices, and software that can live next to the systems you already run.',
    capabilities: [
      'Legacy application modernization',
      'Enterprise web and internal tools',
      'Cloud deployment and DevOps',
      'Security-conscious delivery (GDPR/CCPA-aware practices)',
      'Ongoing maintenance and measurable uptime',
    ],
  },
];

export const processSteps = [
  {
    num: '01',
    title: 'Tell us what you’re building',
    desc: 'A working session on goals, users, constraints, and the software you already have. We leave with a clear problem statement — not a slide deck.',
  },
  {
    num: '02',
    title: 'Meet your engineering team',
    desc: 'You work with the people who will write the code. Direct access, not a layered account team.',
  },
  {
    num: '03',
    title: 'Align on architecture and roadmap',
    desc: 'We lock scope, sequence, and technical approach before the first production sprint. Ondosoft does not advertise a free trial — discovery is the paid, serious start.',
  },
  {
    num: '04',
    title: 'Build and iterate',
    desc: 'Agile sprints with weekly demos. You see the product, not a status report about the product.',
  },
  {
    num: '05',
    title: 'Scale when needed',
    desc: 'Launch, monitor, and keep iterating. Expand the team or the surface area when the product earns it.',
  },
];

export const whyOndo = [
  {
    title: 'Strategy before code',
    body: 'Discovery and a written roadmap come first. We align on goals and scope so delivery stays on a track you can inspect.',
  },
  {
    title: 'A studio, not a bench',
    body: 'Founded by Pranay Reddy Aleti in April 2022. You get a senior product team that ships — not a marketplace of anonymous profiles.',
  },
  {
    title: 'Direct access to engineers',
    body: 'Weekly demos and a line to the people writing the software. No account-manager telephone game.',
  },
  {
    title: 'On-time, production-grade delivery',
    body: 'We move quickly without treating quality as optional. Production engineering, delivered when we say we will.',
  },
  {
    title: 'US-based, nationwide collaboration',
    body: `Based in ${companyInfo.location.full}. We work with teams across the United States on web, mobile, SaaS, and AI-enabled products.`,
  },
  {
    title: 'Support after launch',
    body: 'Maintenance, updates, and uptime after the first release. We do not ship and disappear.',
  },
];

export const technologyGroups = [
  {
    id: 'frontend',
    name: 'Frontend',
    outcome: 'Interfaces people can actually finish a job in',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
  },
  {
    id: 'backend',
    name: 'Backend',
    outcome: 'APIs and services that stay correct under load',
    techs: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'REST APIs'],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    outcome: 'Environments you can reason about in an incident',
    techs: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes'],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    outcome: 'Native-quality apps that share a real backend',
    techs: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    id: 'data-ai',
    name: 'Data & AI',
    outcome: 'Models and pipelines wired into the product, not a sidecar demo',
    techs: ['PostgreSQL', 'OpenAI', 'LangChain', 'Data pipelines', 'NLP', 'Computer Vision'],
  },
  {
    id: 'devops',
    name: 'DevOps',
    outcome: 'A path from commit to production you can trust',
    techs: ['CI/CD', 'Terraform', 'GitHub Actions', 'Docker', 'Monitoring'],
  },
];

export const aiCapabilities = [
  {
    title: 'LLM product features',
    body: 'Assistive experiences inside the product — grounded in your workflows, not a generic chat window.',
  },
  {
    title: 'Intelligent automation',
    body: 'Custom automation that removes repetitive operations work. The same discipline we already apply to business process automation.',
  },
  {
    title: 'Data pipelines & NLP',
    body: 'Ingest, clean, and surface language and structured data so the model has something true to work with.',
  },
  {
    title: 'Computer vision when it earns its place',
    body: 'Image and vision features only where they change a user outcome — listed in our working stack, used with intent.',
  },
  {
    title: 'Finish what a generator started',
    body: 'We complete and harden AI-generated or tutorial code so it can run in production.',
  },
];

export const industries = [
  {
    slug: 'ecommerce-retail',
    name: 'E-commerce & Retail',
    summary: 'Stores, catalogs, and checkout flows with inventory and payments — the same class of work as our e-commerce delivery practice.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & Medical',
    summary: 'Patient-facing and operations software with a security-conscious delivery bar. We do not claim specific clinical certifications unless a project requires them.',
  },
  {
    slug: 'finance-fintech',
    name: 'Finance & FinTech',
    summary: 'SaaS platforms, payments integration, and internal tools. Stripe and subscription systems are part of our standard stack.',
  },
  {
    slug: 'education',
    name: 'Education & EdTech',
    summary: 'Learning products, portals, and admin tools built as custom web or mobile applications.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    summary: 'Listing, operations, and customer portals — custom web applications rather than generic site templates.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    summary: 'Internal tools and process automation that replace spreadsheet-shaped workflows.',
  },
  {
    slug: 'logistics',
    name: 'Logistics & Supply Chain',
    summary: 'Tracking, operations dashboards, and integrations across the tools a logistics team already runs.',
  },
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    summary: 'Ordering, operations, and customer-facing web or mobile surfaces for restaurants and brands.',
  },
  {
    slug: 'media',
    name: 'Entertainment & Media',
    summary: 'Content products and audience experiences on modern web and mobile stacks.',
  },
  {
    slug: 'travel',
    name: 'Travel & Hospitality',
    summary: 'Booking-adjacent web applications and customer portals with reliable integrations.',
  },
  {
    slug: 'saas',
    name: 'SaaS & Technology',
    summary: 'Multi-tenant products, billing, APIs, and the cloud layer required to grow a software business.',
  },
  {
    slug: 'nonprofit',
    name: 'Non-Profit Organizations',
    summary: 'Mission-focused sites and custom tools with the same engineering standard we use for commercial products.',
  },
];

export const assessmentQuestions = [
  {
    id: 'deployments',
    prompt: 'How do you ship to production?',
    options: [
      { label: 'Manual copy to a server when someone remembers', score: 1 },
      { label: 'Scripted deploys, still mostly by hand', score: 4 },
      { label: 'Automated deploys for the main branch', score: 8 },
      { label: 'Automated, frequent, reversible deploys', score: 10 },
    ],
  },
  {
    id: 'cicd',
    prompt: 'What does CI/CD look like today?',
    options: [
      { label: 'No pipeline — tests run on laptops if at all', score: 1 },
      { label: 'A build runs, but it is optional', score: 4 },
      { label: 'CI on every pull request', score: 8 },
      { label: 'CI plus gated, observable CD', score: 10 },
    ],
  },
  {
    id: 'tests',
    prompt: 'How much of the critical path is covered by automated tests?',
    options: [
      { label: 'Almost none', score: 1 },
      { label: 'A few unit tests around new work', score: 4 },
      { label: 'Solid coverage on the money paths', score: 8 },
      { label: 'Unit, integration, and a release checklist that is automated', score: 10 },
    ],
  },
  {
    id: 'monitoring',
    prompt: 'When production breaks, how do you find out?',
    options: [
      { label: 'A customer emails us', score: 1 },
      { label: 'Someone watches a dashboard during business hours', score: 4 },
      { label: 'Metrics and error tracking with alerts', score: 8 },
      { label: 'Metrics, traces, logs, and an on-call path', score: 10 },
    ],
  },
  {
    id: 'cloud',
    prompt: 'How cloud-native is the platform?',
    options: [
      { label: 'A single server or desktop-era host', score: 1 },
      { label: 'Lifted to a VM in a cloud account', score: 4 },
      { label: 'Managed services, containers, environment parity', score: 8 },
      { label: 'Designed for elasticity, isolation, and recovery', score: 10 },
    ],
  },
  {
    id: 'security',
    prompt: 'Do you scan for vulnerabilities as part of delivery?',
    options: [
      { label: 'Not in any systematic way', score: 1 },
      { label: 'Occasional manual review', score: 4 },
      { label: 'Dependency and secret scanning in CI', score: 8 },
      { label: 'Scanning plus a regular review of auth, data, and access', score: 10 },
    ],
  },
  {
    id: 'dependencies',
    prompt: 'How current are your critical dependencies?',
    options: [
      { label: 'Years behind, upgrades feel unsafe', score: 1 },
      { label: 'We upgrade when something breaks', score: 4 },
      { label: 'A cadence exists for routine upgrades', score: 8 },
      { label: 'Dependencies are current and the upgrade path is practiced', score: 10 },
    ],
  },
  {
    id: 'debt',
    prompt: 'How is technical debt treated?',
    options: [
      { label: 'It is the product', score: 1 },
      { label: 'We know the hotspots and avoid them', score: 4 },
      { label: 'Debt is listed and paid down in the roadmap', score: 8 },
      { label: 'Architecture review is a habit, not a rescue mission', score: 10 },
    ],
  },
  {
    id: 'recovery',
    prompt: 'Could you recover from a serious outage or data loss?',
    options: [
      { label: 'We have not practiced it', score: 1 },
      { label: 'Backups exist; restore is untested', score: 4 },
      { label: 'Documented restore with a recent test', score: 8 },
      { label: 'Tested disaster recovery with a known RPO/RTO', score: 10 },
    ],
  },
  {
    id: 'ai',
    prompt: 'How ready is the platform for production AI features?',
    options: [
      { label: 'No data contracts, no place to put a model', score: 1 },
      { label: 'We have tried a prototype in isolation', score: 4 },
      { label: 'Clean APIs and data we could ground a feature on', score: 8 },
      { label: 'Evaluation, observability, and a path to ship AI as product', score: 10 },
    ],
  },
];

export const assessmentThemes = {
  deployments: { strength: 'You can ship without heroics', risk: 'Releases depend on people, not a path' },
  cicd: { strength: 'The pipeline is a teammate', risk: 'Quality is optional at merge time' },
  tests: { strength: 'The critical path is guarded', risk: 'Regressions are found by users' },
  monitoring: { strength: 'You see incidents before customers do', risk: 'Outages arrive as support tickets' },
  cloud: { strength: 'The platform can grow without a rewrite panic', risk: 'Scale and recovery are coupled to one box' },
  security: { strength: 'Vulnerabilities are found in the pipeline', risk: 'Security is a yearly conversation' },
  dependencies: { strength: 'The stack can move', risk: 'Upgrades are treated as a rewrite' },
  debt: { strength: 'Debt is visible and scheduled', risk: 'Every feature pays interest' },
  recovery: { strength: 'You have practiced getting back up', risk: 'A bad day becomes a bad quarter' },
  ai: { strength: 'AI can land in the product, not a sidecar', risk: 'AI work will stall on missing foundations' },
};

export const costModel = {
  disclaimer:
    'Figures are illustrative estimates, not a quotation and not official Ondosoft rates. Typical US costs use commonly cited fully-loaded engineering ranges. The Ondosoft column is a structural estimate for a US studio versus coastal fully-loaded hiring — confirm live rates on a call. Published project packages live on the pricing page.',
  usAnnual: {
    junior: 140000,
    mid: 185000,
    senior: 230000,
    staff: 290000,
  },
  ondoRatio: { low: 0.52, mid: 0.62, high: 0.72 },
  roleWeight: {
    developer: 1,
    techlead: 1.22,
    designer: 0.92,
    qa: 0.74,
    devops: 1.08,
  },
};

export function getSolutionSchema(solution, canonical) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: `${solution.name} — ${companyInfo.name}`,
        description: solution.seoDescription,
        provider: { '@id': `${companyInfo.urls.website}/#organization` },
        serviceType: solution.name,
        areaServed: { '@type': 'Country', name: 'United States' },
        url: canonical,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: companyInfo.urls.website },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${companyInfo.urls.website}/solutions` },
          { '@type': 'ListItem', position: 3, name: solution.name, item: canonical },
        ],
      },
    ],
  };
}
