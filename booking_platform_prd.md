# Booking Platform PRD

## 1. Executive Summary
The goal is to evolve our rudimentary static React/JSON application into a modern, performant, scalable booking platform with a clean, consistent design system and a maintainable architecture. We will remove redundancies, unify data flows, adopt best practices (including Azure hosting where applicable), and deliver an accessible, SEO-friendly, mobile-first user experience.

## 2. Current State & Key Loopholes
- **Redundant static pages** under both `build/` and `public/`.
- **Data duplicated** in multiple JSON files; no single source of truth or API layer.
- **No routing**; navigation is manual linking.
- **Minimal styling**—layout is inflexible and not responsive.
- **No authentication backend**; `AuthContext` is stubbed.
- **Poor performance**: unoptimized images, no code splitting, no caching strategy.
- **Accessibility & SEO gaps**: missing alt tags, semantic markup, metadata.
- **No CI/CD**, telemetry, analytics or automated tests.

## 3. Objectives
1. **UX/UI**: Deliver a cohesive, responsive design system, mobile-first.
2. **Architecture**: Introduce a REST/GraphQL API back end, single-page React frontend, centralized state.
3. **Data Layer**: Migrate from flat JSON files to a headless CMS or database API.
4. **Performance**: Optimize asset loading, implement code splitting, caching, image resizing.
5. **Accessibility & SEO**: Achieve WCAG 2.1 AA compliance, enrich metadata, friendly URLs.
6. **Security**: Implement secure authentication/authorization (e.g. Azure AD B2C or JWT).
7. **DevOps**: Automated CI/CD pipeline with linting, testing, deployment to Azure Static Web Apps or App Service.
8. **Analytics & Monitoring**: Integrate Google Analytics / Azure Application Insights.

## 4. User Personas
- **Event Seeker – Emma**: Browses events, books tickets fast on mobile.
- **Movie Buff – Marco**: Filters by genre, views trailers, logs in to save watchlist.
- **Concert Planner – Carol**: Manages group bookings, views past history.
- **Support Agent – Sam**: Reviews, responds to support requests via dashboard.

## 5. User Journeys
1. **Discovery → Search → Filter → Book** (anonymous or authenticated)
2. **Sign up / Login → Profile → View / Manage bookings**
3. **View offers → Add to booking → Checkout**
4. **Submit support request → Track resolution**

## 6. Functional Requirements

### 6.1. Public Facing
- Unified SPA with React Router.
- Home screen: hero carousel, featured events/offers.
- Global search bar with type-ahead and filters (date, category, location).
- Event/Movie/Concert detail pages with media gallery, seat map (if applicable), related items.
- Offers page: personalized deals (requires auth).

### 6.2. Auth & User
- Secure sign-up / login (email+password, social).
- Password reset, email verification.
- Profile management: name, preferences, payment methods.
- Booking history with re-book option.

### 6.3. Booking Flow
- Multi-step booking wizard: select tickets, customer info, payment.
- Integrate payment gateway (Stripe or Azure Payment).
- Email confirmations, calendar invites.

### 6.4. Admin / Support
- Admin dashboard (separate app or route-protected SPA) to view bookings, events, users, support tickets.
- CRUD for events/offers.
- Ticket inventory management.

### 6.5. APIs & Data
- Design REST/GraphQL endpoints:
  - GET /events, /movies, /concerts, /offers, /bookings, /support.
  - POST /auth/login, /auth/signup, /bookings, /support.
  - PUT/DELETE admin operations with role-based auth.
- Data validation, pagination, rate limiting.

## 7. Non-Functional Requirements

| Category         | Requirement                                           |
|------------------|-------------------------------------------------------|
| Performance      | LCP <2.5s, TBT <300ms, prefetch critical data routes. |
| Scalability      | Auto-scaling back end; CDN for static assets.         |
| Security         | OWASP Top 10 mitigation, HTTPS everywhere, JWT.       |
| Accessibility    | WCAG 2.1 AA, keyboard nav, ARIA labels, color contrast. |
| SEO              | SSR or prerendering, sitemaps, meta tags per page.    |
| Reliability      | 99.9% uptime SLA, health probes.                      |
| Maintainability  | Modular code, TypeScript, unit + E2E tests.          |
| Observability    | Azure App Insights / Sentry; custom events for bookings.|

## 8. UX/UI Guidelines

- **Design System**: Build using a component library (e.g. Chakra UI or Material-UI).
- **Theming**: Light/dark mode support.
- **Responsive**: Mobile-first grid, flexible cards.
- **Consistency**: Typography scale, spacing system.
- **Motion**: Subtle micro-interactions, skeleton loaders.
- **Branding**: Consistent color palette, logo usage, imagery guidelines.

## 9. Technical Architecture

```
┌─────────────┐      ┌──────────────┐      ┌───────────┐
│   Browser   │ ⇄    │   Frontend   │ ⇄    │   API     │ ⇄ DB/CMS
│  (SPA SSR)  │      │   React/TS   │      │  Node.js  │
└─────────────┘      └──────────────┘      └───────────┘
      │                     │                    │
      │  CDN (Azure SWA)    │ Azure Functions     │ Azure SQL/Cosmos
```

- **Frontend**  
  - React + TypeScript, React Router, SWR/React-Query.  
  - SSR or prerender via Next.js or Gatsby.  
- **Back End**  
  - Serverless APIs (Azure Functions/Express on App Service).  
  - Auth via Azure AD B2C.  
- **Data**  
  - Azure Cosmos DB or SQL; blob storage for images.  
  - Image optimization with Azure Functions or a CDN transform.  
- **CI/CD**  
  - GitHub Actions: lint → test → build → deploy to Azure.  
- **Monitoring**  
  - Azure Application Insights, Log Analytics.

## 10. Data Model (excerpt)

```yaml
Event:
  id: uuid
  title: string
  description: text
  startDate: datetime
  endDate: datetime
  location: { name, address, geo }
  media: [url]
Booking:
  id: uuid
  userId: uuid
  eventId: uuid
  tickets: [{ type, quantity, price }]
  status: enum(pending, confirmed, canceled)
User:
  id: uuid
  name: string
  email: string
  roles: [user, admin]
```  

## 11. API Endpoints (excerpt)

- `POST /api/auth/signup`  
- `POST /api/auth/login` → returns JWT  
- `GET  /api/events?category=&date=&page=`  
- `POST /api/bookings` (auth)  
- `GET  /api/users/me/bookings` (auth)

## 12. Roadmap & Milestones

1. **Phase 1 – Foundation (4 weeks)**  
   - Define design system, GitHub Actions, skeleton of front end.  
   - Prototype API and data model; seed database.  
2. **Phase 2 – Core Features (6 weeks)**  
   - Public listings, search, filtering.  
   - Auth, user profile, booking flow.  
3. **Phase 3 – Admin + Support (4 weeks)**  
   - Admin CRUD, support tickets dashboard.  
   - Payment integration.  
4. **Phase 4 – Polish & Deploy (2 weeks)**  
   - Performance tuning, accessibility audit, SEO.  
   - End-to-end testing, deploy to production.

## 13. Key Performance Indicators

- Conversion Rate (visit→booking) ≥ 5%  
- Page Load Time (LCP) ≤ 2.5s  
- Bounce Rate on Home Page ≤ 40%  
- Uptime ≥ 99.9%  
- Customer Satisfaction (support CSAT) ≥ 4.5/5
