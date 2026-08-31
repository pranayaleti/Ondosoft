import techstartDashboard from '../assets/portfolio/techstart-dashboard.jpg';
import techstartAnalytics from '../assets/portfolio/techstart-analytics.jpg';
import techstartMobile from '../assets/portfolio/techstart-mobile.jpg';
import retailmaxHomepage from '../assets/portfolio/retailmax-homepage.jpg';
import retailmaxProduct from '../assets/portfolio/retailmax-product.jpg';
import retailmaxCheckout from '../assets/portfolio/retailmax-checkout.jpg';
import dataflowDashboard from '../assets/portfolio/dataflow-dashboard.jpg';
import dataflowAnalytics from '../assets/portfolio/dataflow-analytics.jpg';
import dataflowReports from '../assets/portfolio/dataflow-reports.jpg';

export const caseStudies = [
  {
    id: 1,
    slug: 'techstart-saas-platform',
    title: 'TechStart Inc. — SaaS Platform Development',
    client: 'TechStart Inc.',
    industry: 'SaaS',
    duration: '6 months',
    team: '4 developers',
    challenge: 'Needed a scalable SaaS platform to handle 10,000+ users with subscription billing, multi-tenant architecture, and real-time analytics.',
    solution: 'Built a React-based SaaS platform with Node.js backend, PostgreSQL database, Stripe integration, and AWS deployment.',
    results: {
      users: '10,000+',
      growth: '300%',
      efficiency: '40%',
      satisfaction: '4.9/5',
    },
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
    testimonial: 'Ondosoft transformed our business. We went from 100 to 10,000+ users in just 6 months with zero downtime. The platform handles everything seamlessly.',
    author: 'Sarah Martinez',
    role: 'CEO, TechStart Inc.',
    beforeAfter: {
      before: {
        users: '100',
        revenue: '$5K/month',
        efficiency: '60%',
        issues: 'Frequent downtime',
      },
      after: {
        users: '10,000+',
        revenue: '$50K/month',
        efficiency: '95%',
        issues: 'Zero downtime',
      },
    },
    screenshots: [techstartDashboard, techstartAnalytics, techstartMobile],
    resultLine: '100 → 10,000+ users in 6 months',
    relatedSolutions: ['product-engineering', 'dedicated-teams', 'cloud-devops'],
  },
  {
    id: 2,
    slug: 'retailmax-ecommerce',
    title: 'RetailMax — E-commerce Solution',
    client: 'RetailMax',
    industry: 'E-commerce',
    duration: '4 months',
    team: '3 developers',
    challenge: 'Legacy e-commerce system couldn\'t handle increased traffic and lacked modern features like mobile optimization and real-time inventory.',
    solution: 'Developed a modern e-commerce platform with React frontend, Node.js API, real-time inventory management, and mobile-first design.',
    results: {
      traffic: '500%',
      sales: '250%',
      mobile: '80%',
      satisfaction: '4.8/5',
    },
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    testimonial: 'Our online sales increased by 250% in the first month after launch. The mobile experience is incredible and our customers love it.',
    author: 'Mike Chen',
    role: 'CTO, RetailMax',
    beforeAfter: {
      before: {
        traffic: '1,000/day',
        sales: '$10K/month',
        mobile: '20%',
        issues: 'Poor mobile experience',
      },
      after: {
        traffic: '5,000/day',
        sales: '$35K/month',
        mobile: '80%',
        issues: 'Excellent mobile UX',
      },
    },
    screenshots: [retailmaxHomepage, retailmaxProduct, retailmaxCheckout],
    resultLine: '250% sales increase after launch',
    relatedSolutions: ['web-mobile', 'legacy-modernization', 'product-engineering'],
  },
  {
    id: 3,
    slug: 'dataflow-analytics',
    title: 'DataFlow Solutions — Custom Web Application',
    client: 'DataFlow Solutions',
    industry: 'Data Analytics',
    duration: '3 months',
    team: '2 developers',
    challenge: 'Needed a custom data visualization dashboard to replace multiple disconnected tools and provide real-time insights.',
    solution: 'Created a comprehensive data analytics platform with interactive dashboards, real-time data processing, and automated reporting.',
    results: {
      efficiency: '60%',
      insights: 'Real-time',
      reports: 'Automated',
      satisfaction: '5.0/5',
    },
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL', 'Docker'],
    testimonial: 'The new platform has revolutionized how we analyze data. What used to take hours now takes minutes, and the insights are incredible.',
    author: 'Emily Rodriguez',
    role: 'Data Director, DataFlow Solutions',
    beforeAfter: {
      before: {
        efficiency: '40%',
        insights: 'Daily reports',
        reports: 'Manual',
        issues: 'Data silos',
      },
      after: {
        efficiency: '95%',
        insights: 'Real-time',
        reports: 'Automated',
        issues: 'Unified platform',
      },
    },
    screenshots: [dataflowDashboard, dataflowAnalytics, dataflowReports],
    resultLine: 'Hours of analysis reduced to minutes',
    relatedSolutions: ['product-engineering', 'ai', 'cloud-devops'],
  },
];

export const getCaseStudyBySlug = (slug) => caseStudies.find((item) => item.slug === slug);

export const caseStudiesBySolution = (slug) =>
  caseStudies.filter((item) => item.relatedSolutions?.includes(slug));
