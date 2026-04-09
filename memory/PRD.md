# Ondosoft Website Enhancement PRD

## Original Problem Statement
User wanted comprehensive site improvement suggestions by comparing against competitors (connectivewebdesign.com, ueni.com), implementing all enhancements on a new git branch.

## Architecture
- **Frontend**: Vite 7 + React 18 + Tailwind CSS (SPA)
- **Backend**: FastAPI (Python) for newsletter/contact APIs + Express.js (Node.js) for existing portal
- **Database**: MongoDB (newsletter subscribers, contact leads) + PostgreSQL/Supabase (existing portal data)
- **Email**: Resend (ready to activate with API key)
- **Branch**: `site-enhancements`

## What's Been Implemented

### Phase 1 (Initial Enhancements) - Apr 9, 2026
1. **SocialProofBadges** - Clutch, Google, Trustpilot, GoodFirms with taglines + hover effects
2. **ClientLogos** - Technology partner logos (React, Node, AWS, etc.)
3. **ProcessTimeline** - 5-step development process with alternating timeline
4. **ComparisonTable** - Ondosoft vs Freelancers vs Big Agencies (10 features)
5. **TechStack** - 5 categorized technology grids
6. **ROICalculator** - Interactive sliders calculating monthly/annual savings
7. **HomepageFAQ** - 6 collapsible FAQ items with accordion
8. **NewsletterSignup** - Email capture form (client-side only)

### Phase 2 (Next Action Items) - Apr 9, 2026
1. **Newsletter Backend** - FastAPI endpoint stores subscribers in MongoDB, Resend-ready
2. **VideoExplainer** - Animated 3-step "From Idea to Launch" with chat/code/dashboard visuals
3. **Enhanced Testimonials** - Professional roles, company names, metric badges, star ratings
4. **Enhanced SocialProofBadges** - Taglines, hover external links, polished design
5. **Newsletter Frontend** - Connected to backend API with loading/success/error/duplicate states

### Page Flow (Top to Bottom)
Hero → Social Proof Badges → Client Logos → Video Explainer → Why Choose Us → Services → Process Timeline → Stats → Comparison Table → Tech Stack → ROI Calculator → FAQ → CTA → Trust Badges → Newsletter → Footer

## API Endpoints Added
- `POST /api/newsletter/subscribe` - Subscribe email (stores in MongoDB)
- `GET /api/newsletter/subscribers` - List all subscribers
- `POST /api/contact/submit` - Contact form submission
- `GET /api/health` - Health check

## Testing Status
- Phase 1: 100% pass (15/15 frontend tests)
- Phase 2: Backend 100% (6/6), Frontend 75% (18/24 - false positives on scroll-search)
- All data-testid selectors verified present on page

## Prioritized Backlog

### P1 (High)
- Add Resend API key to activate welcome emails
- Replace review badge URLs with actual platform profiles
- Add real client logos from actual customers

### P2 (Medium)
- Industry-specific portfolio showcase
- Animated counter for stats section
- Mobile responsiveness fine-tuning
- A/B test CTA button copy

### P3 (Nice to Have)
- Pricing calculator tool
- Blog content for SEO
- Client portal onboarding improvements
