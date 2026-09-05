# Aashraya — AI Mental Health Surveillance & Support Platform

> **Repository:** `harsh-pratapsingh24/ai-mental-health-surveillance-web`  
> **Status:** Prototype / pre-production  
> **Purpose of this document:** Architecture review, technical assessment, and professionalization roadmap.

---

## 1. Project Overview

**Aashraya** is intended to be a mental-health support and monitoring platform with two primary experiences:

1. **Survivor/User Experience**
   - Daily emotional check-ins
   - Distress/risk classification
   - Guided breathing
   - Grounding exercises
   - Crisis helplines
   - Emotional trends
   - Profile and privacy controls

2. **Counselor/NGO Experience**
   - Case queue
   - Risk prioritization
   - Individual case details
   - Longitudinal distress charts
   - Counselor notes
   - Case escalation
   - Cohort-level analytics
   - Live alert notifications

The repository currently contains a relatively mature UI prototype, but its frontend, backend, data, authentication, and risk-analysis implementations are not yet unified into one production architecture.

---

# 2. Intended Users

### Primary Users

- Mental-health program participants / survivors
- Counselors
- NGO/community support workers
- Trauma-intervention teams
- Relief and recovery organizations

### Secondary Users

- Program supervisors
- Cohort/program administrators
- Community-support organizations

---

# 3. Technology Stack

The repository currently contains two major application implementations.

## Modern Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- React Context API
- Browser `localStorage`

## Backend / Legacy Application

- Python
- Flask
- HTML templates
- Vanilla JavaScript
- CSS
- In-memory Python state

## Current Architectural Situation

The repository effectively contains three competing sources of application behavior:

```text
                    AASHRAYA
                       |
          +------------+------------+
          |            |            |
       React        Vanilla JS    Flask
     TypeScript       app.js      app.py
          |            |            |
     AppContext       STATE        STATE
          |            |            |
    localStorage    Browser UI   Memory
```

This is the most important architectural issue to resolve before production deployment.

---

# 4. Repository Structure

```text
/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── RiskBadge.tsx
│   │   │   └── TopNavigation.tsx
│   │   ├── dashboard/
│   │   │   ├── CaseDetail.tsx
│   │   │   ├── CaseList.tsx
│   │   │   ├── CohortView.tsx
│   │   │   ├── CounselorDashboard.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── EscalateModal.tsx
│   │   │   ├── LiveAlertToast.tsx
│   │   │   └── SettingsView.tsx
│   │   ├── demo/
│   │   │   └── SplitDemoView.tsx
│   │   └── mobile/
│   │       ├── AuthScreen.tsx
│   │       ├── BreathingExercise.tsx
│   │       ├── ChatCheckin.tsx
│   │       ├── EmergencyHelpModal.tsx
│   │       ├── HomeScreen.tsx
│   │       ├── LanguageConsent.tsx
│   │       ├── MobileShell.tsx
│   │       ├── ProfileScreen.tsx
│   │       ├── ResourcesScreen.tsx
│   │       ├── SplashScreen.tsx
│   │       └── TrendsScreen.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── data/
│   │   ├── chatbotBank.ts
│   │   └── mockData.ts
│   ├── services/
│   │   └── eventBus.ts
│   ├── theme/
│   │   └── colors.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── templates/
├── static/
├── app.py
├── app.js
├── index.html
├── style.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

# 5. High-Level Architecture Review

## Current Frontend Flow

The modern React application follows approximately:

```text
main.tsx
   ↓
AppProvider
   ↓
App.tsx
   ↓
TopNavigation
   ↓
+-------------------------------+
| Counselor | Mobile | Split    |
+-------------------------------+
       ↓
Feature-specific components
```

The application uses a centralized `AppContext` to maintain UI state, user state, counselor state, cases, check-ins, notifications, consent, and other application-level information.

This is acceptable for a prototype but should eventually be separated into domain-specific state and server-state management.

---

# 6. Current Data Flow

The React implementation currently uses:

```text
React UI
   ↓
AppContext
   ↓
mockData / local state
   ↓
localStorage
```

The Flask implementation uses:

```text
HTTP Request
   ↓
Flask route
   ↓
Python logic
   ↓
global in-memory STATE
```

There is currently no authoritative database layer connecting the two.

---

# 7. Current Authentication Flow

The application contains authentication UI, but authentication is currently simulated.

The mobile authentication screen can effectively transition the application into a logged-in state without authenticating against a production identity provider.

Current conceptual flow:

```text
Login Form
    ↓
Client-side action
    ↓
isLoggedIn = true
```

## Status

❌ Not production authentication.

## Required Production Architecture

```text
User
 ↓
Identity Provider
 ↓
Session / JWT
 ↓
Backend Authentication Middleware
 ↓
RBAC Authorization
 ↓
Protected API
```

Potential identity providers include:

- Organization-managed authentication
- OAuth / OpenID Connect
- Auth0
- Supabase Auth
- Firebase Authentication
- Microsoft Entra ID
- Google Identity

The final choice should be made according to the deployment/client requirements.

---

# 8. Authorization Review

The UI provides counselor and survivor experiences.

However, changing the frontend view is not equivalent to secure authorization.

Production authorization must be enforced server-side.

Recommended roles:

```text
survivor
counselor
supervisor
administrator
```

Example:

```text
Authenticated User
       ↓
Role
       ↓
Permission
       ↓
Resource-level access
```

Counselor notes, risk information, case data, and personal information must never be protected only by frontend logic.

---

# 9. Database Review

## Current State

No production database layer was identified.

The React application stores application state in browser `localStorage`.

The Flask application stores state in Python process memory.

This means data can be lost when:

- Browser storage is cleared
- Server restarts
- Multiple backend instances are deployed
- Different users access the application
- Multiple servers need to share state

## Recommended Database

**PostgreSQL** is recommended for the production version.

Suggested high-level schema:

```text
users
  ├── roles
  ├── profiles
  └── consent

check_ins
  ├── user_id
  ├── responses
  ├── distress_score
  ├── risk_level
  └── created_at

cases
  ├── survivor_id
  ├── assigned_counselor_id
  ├── risk_level
  ├── status
  └── created_at

case_notes
  ├── case_id
  ├── counselor_id
  ├── content
  └── created_at

alerts
  ├── case_id
  ├── severity
  ├── status
  └── created_at

audit_logs
  ├── user_id
  ├── action
  ├── resource
  └── timestamp
```

---

# 10. Risk / Distress Analysis

The repository currently contains multiple distress-classification implementations.

### React

The React chatbot uses deterministic indicators including:

- High-distress keywords
- Medium-distress keywords
- Positive keywords
- User-selected quick chips
- Weighted scoring

### Flask

The Python backend additionally uses concepts such as:

- First-person pronoun density
- Absolutist language
- Crisis patterns
- Valence
- Arousal
- Voice cadence
- DPI
- Risk tiers

### Legacy JavaScript

A separate classification implementation also exists in `app.js`.

## Critical Architectural Problem

There is no single authoritative risk engine.

The same user input could theoretically produce different risk classifications depending on which implementation processes it.

### Severity

🔴 **Critical**

### Recommendation

Create one authoritative risk-analysis service:

```text
Check-in
   ↓
Risk Analysis Service
   ↓
Normalized Risk Result
   ├── score
   ├── tier
   ├── indicators
   ├── confidence
   └── recommended action
```

The frontend should display the result rather than independently implementing the clinical/risk logic.

---

# 11. AI / ML Assessment

Despite the project positioning as an AI mental-health surveillance system, the current reviewed implementation primarily uses deterministic heuristics, keyword matching, regular expressions, and manually defined scoring.

This is appropriate for a prototype, but should not be described as:

> Automated psychiatric diagnosis

or:

> Clinically validated AI diagnosis

unless appropriate validation and clinical governance have actually been implemented.

## Recommended Product Positioning

A safer and more technically accurate description is:

> **A digital mental-wellbeing monitoring and counselor-triage platform that uses structured distress indicators to identify potentially concerning patterns and route users toward appropriate support.**

---

# 12. Counselor Dashboard

The counselor experience is one of the strongest parts of the prototype.

Current functionality includes:

- Case queue
- Search
- Risk filtering
- Sorting
- Risk summaries
- Individual case details
- Longitudinal charts
- Check-in history
- Counselor notes
- Escalation workflow
- Cohort analytics
- Alerts

## Status

✅ Strong prototype implementation

⚠️ Requires real backend persistence and authorization for production.

---

# 13. Cohort Analytics

The dashboard includes:

- Population averages
- High-risk proportions
- Moderate-risk proportions
- Low-risk proportions
- 7-day trends
- 30-day trends
- Severity distribution
- Regional vulnerability information

However, much of the displayed analytics is based on predefined demo data rather than live database queries.

## Status

✅ Good demonstration capability

❌ Not currently production analytics.

---

# 14. Real-Time Notifications

The React application contains an event-bus abstraction for flagged cases.

Conceptually:

```text
Case Flagged
    ↓
Event Bus
    ↓
Subscribed UI
    ↓
Alert Toast
```

However, this is an in-process event mechanism rather than a true distributed WebSocket infrastructure.

There is no identified production WebSocket server, Redis pub/sub layer, or message broker supporting this flow.

## Recommendation

For production:

```text
Backend Event
    ↓
Message/Event Layer
    ↓
WebSocket / SSE
    ↓
Counselor Dashboard
```

Possible infrastructure:

- WebSocket
- Socket.IO
- Server-Sent Events
- Redis Pub/Sub
- Managed realtime service

---

# 15. Voice Check-In

The UI contains microphone/voice interaction.

The current implementation is simulated rather than a complete speech-recognition pipeline.

The prototype inserts predefined sample speech instead of processing actual user audio.

## Status

⚠️ UI complete

❌ Actual speech recognition incomplete

If retained, this should be explicitly identified as a prototype/demo feature until implemented and tested.

---

# 16. Emergency / Crisis Support

The application includes:

- Emergency help UI
- Crisis support actions
- Helpline resources
- "I Need Help Now" access

This is an important product feature.

However, crisis information should be:

1. Verified
2. Centrally configurable
3. Versioned
4. Region-aware
5. Tested
6. Available even when non-essential backend services fail

Because the application is safety-sensitive, emergency flows should be treated as high-priority functionality.

---

# 17. Privacy & Security Review

The current UI contains privacy-oriented messaging, including confidentiality-related language.

However, the implementation does not yet provide the corresponding production security architecture.

Current limitations include:

- Browser `localStorage` for case data
- Simulated authentication
- Client-side role switching
- In-memory backend data
- No identified audit trail
- No identified database-level access controls
- No demonstrated encryption architecture
- No production secrets/configuration system

## Severity

🔴 **Critical for production**

Privacy statements must accurately reflect the actual security controls implemented.

For example, claims such as encrypted counselor notes should not be presented as production guarantees until encryption and access controls have actually been implemented.

---

# 18. Validation

Some backend validation exists, but a comprehensive request-validation layer is missing.

Recommended validation areas:

```text
User identifiers
Case identifiers
Check-in values
Risk scores
Valence
Arousal
Voice metrics
Text length
Counselor notes
Language
Pagination
Filtering
```

A schema-validation library such as Pydantic or an equivalent Flask validation solution should be considered.

---

# 19. Error Handling

Basic HTTP error handling exists in the Flask application.

However, a mature application-wide error architecture should be added.

Recommended flow:

```text
Request
  ↓
Validation
  ↓
Service
  ↓
Domain Error
  ↓
Central Exception Handler
  ↓
Structured API Response
  ↓
Logging / Monitoring
```

The frontend should also provide consistent:

- Loading states
- Error states
- Empty states
- Retry behavior
- Offline behavior where appropriate

---

# 20. Logging & Observability

A mature production observability system was not identified.

Recommended additions:

### Logging

- Structured JSON logs
- Request IDs
- Error IDs
- Authentication events
- Security events
- Critical risk events

### Monitoring

- Error tracking
- API latency
- Request volume
- Failed authentication attempts
- Database health
- Background job failures
- Alert delivery failures

### Audit Logging

Especially important for:

- Viewing cases
- Editing notes
- Escalations
- Role changes
- Data deletion
- Consent changes

---

# 21. Testing

No mature automated test suite was identified.

This is a significant professionalization gap.

## Recommended Tests

### Unit Tests

- Risk classification
- Crisis detection
- Score normalization
- Case state transitions
- Validation

### API Tests

- Authentication
- Authorization
- Check-in creation
- Case retrieval
- Escalation
- Notes
- Consent

### Frontend Tests

- Login flow
- Check-in flow
- Counselor case workflow
- Emergency flow
- Modal behavior
- Error states

### E2E Tests

Recommended critical path:

```text
Login
 ↓
Check-in
 ↓
Risk assessment
 ↓
Case creation
 ↓
Counselor alert
 ↓
Case review
 ↓
Escalation
```

---

# 22. CI/CD

A mature CI/CD workflow was not identified.

Recommended GitHub Actions pipeline:

```text
Pull Request
     ↓
Install dependencies
     ↓
Type checking
     ↓
Linting
     ↓
Unit tests
     ↓
Backend tests
     ↓
Build
     ↓
Security/dependency scan
     ↓
E2E smoke tests
     ↓
Deploy
```

---

# 23. Dependency Management

`package.json` exists, but a reproducible dependency lockfile should be maintained.

Recommended:

```text
package.json
package-lock.json
```

or the equivalent lockfile for the chosen package manager.

Dependencies should also be periodically reviewed for:

- Security vulnerabilities
- Unsupported versions
- Duplicate dependencies
- Unused packages
- Major-version upgrade opportunities

---

# 24. Configuration & Environment Variables

The current configuration is not yet suitable for production deployment.

The Flask application currently uses development-style configuration including debug mode.

Production configuration should use environment variables for:

```text
DATABASE_URL
SECRET_KEY
AUTH_PROVIDER
JWT_SECRET / SESSION_SECRET
REDIS_URL
CORS_ORIGINS
API_URL
ENVIRONMENT
LOG_LEVEL
CRISIS_RESOURCE_CONFIG
```

### Important

Development/debug mode must never be enabled in production.

---

# 25. Hard-Coded Demo Data

The repository contains substantial demo data such as:

- Survivor profiles
- Counselor profiles
- Case IDs
- Risk scores
- Counselor notes
- Regions
- Trend values
- Cohort analytics

This is useful for demonstrations.

However, production and demo environments should be explicitly separated:

```text
DEMO
 ├── Seed data
 └── Demo accounts

PRODUCTION
 ├── Real users
 ├── Real cases
 └── Production database
```

---

# 26. Settings

The counselor settings UI includes configurable values such as:

- Helpline information
- Language
- Sound alerts

However, the current implementation does not establish persistent backend configuration.

The save operation should eventually persist through an authenticated API.

---

# 27. Mobile Experience

The mobile prototype is relatively comprehensive.

Current flow:

```text
Splash
  ↓
Consent
  ↓
Authentication
  ↓
Home
  ├── Check-in
  ├── Trends
  ├── Resources
  └── Profile
```

This is one of the strongest product-demo aspects of the repository.

---

# 28. Accessibility

Some accessibility-friendly implementation patterns are present, including semantic controls and labels.

However, a systematic accessibility review is still recommended.

Test for:

- Keyboard navigation
- Focus management
- Screen-reader compatibility
- Color contrast
- Reduced motion
- Modal focus trapping
- ARIA semantics
- Touch target sizes
- Error announcements

Target should ideally be aligned with **WCAG 2.2 AA** where practical.

---

# 29. Overall Project Status

| Area | Status | Assessment |
|---|---|---|
| Product concept | ✅ Complete prototype | Strong |
| UI/UX prototype | ✅ Complete prototype | Strong |
| Mobile experience | ✅ Complete prototype | Strong |
| Counselor dashboard | ✅ Complete prototype | Strong |
| Charts | ✅ Complete prototype | Good |
| Check-in workflow | ✅ Prototype | Functional |
| Crisis UX | ⚠️ Needs improvement | Must be verified |
| React architecture | ⚠️ Needs improvement | Good prototype foundation |
| Backend | ⚠️ Needs improvement | Prototype |
| Database | ❌ Incomplete | No production database |
| Authentication | ❌ Incomplete | Simulated |
| Authorization | ❌ Incomplete | Client-side |
| Real-time infrastructure | ❌ Incomplete | Event-bus simulation |
| Voice recognition | ❌ Incomplete | Simulated |
| Production AI/ML | ❌ Incomplete | Deterministic heuristics |
| Tests | ❌ Incomplete | No mature suite |
| CI/CD | ❌ Incomplete | Not identified |
| Observability | ❌ Incomplete | Not identified |
| Security | 🔴 Critical | Not production-ready |
| Privacy implementation | 🔴 Critical | Claims must match controls |
| Application entry points | 🔴 Critical | React/legacy paths conflict |
| Architecture consistency | 🔴 Critical | Multiple competing implementations |

---

# 30. Priority Technical Issues

## P0 — Critical

### 1. Resolve application architecture

Choose one canonical architecture.

**Recommended:**

```text
React + TypeScript
        ↓
REST API
        ↓
Python/Flask Backend
        ↓
PostgreSQL
        ↓
Redis / Realtime Layer
```

The legacy vanilla JavaScript implementation should eventually be retired once its required functionality is migrated.

---

### 2. Fix React/Vite entry point

The current React entry point expects a `#root` element while the HTML entry point uses `#app` and loads the legacy JavaScript application.

These must be consolidated.

---

### 3. Implement real authentication

Replace simulated login with a production identity system.

---

### 4. Implement server-side authorization

Never rely on frontend role switching to protect counselor resources.

---

### 5. Introduce a real database

Replace:

```text
localStorage
```

and:

```text
Python in-memory STATE
```

with persistent server-side storage.

---

### 6. Establish one authoritative risk engine

Remove duplicated classification logic.

---

### 7. Align privacy/security claims with implementation

Do not claim encryption, confidentiality, or restricted access unless those controls actually exist.

---

### 8. Disable production debug mode

Flask must not run with debug mode enabled in production.

---

# 31. Recommended Target Architecture

```text
                         AASHRAYA
                            |
             +--------------+--------------+
             |                             |
       Survivor Web                  Counselor Web
             |                             |
             +--------------+--------------+
                            |
                  React + TypeScript
                            |
                      API Client
                            |
             +--------------+--------------+
             |                             |
          REST API                   WebSocket/SSE
             |                             |
       Python Backend              Realtime Service
             |
    +--------+--------+----------------+
    |        |        |                |
   Auth   Cases    Risk Engine     Notifications
    |        |        |                |
    +--------+--------+----------------+
                            |
                       PostgreSQL
                            |
                          Redis
                            |
                    Audit / Events
```

Supporting infrastructure:

```text
Authentication
RBAC
Input Validation
Encryption
Audit Logs
Rate Limiting
Structured Logging
Monitoring
Automated Tests
CI/CD
Environment Configuration
```

---

# 32. Recommended Implementation Roadmap

## Phase 1 — Architecture Cleanup

- Choose React as the canonical frontend
- Define Flask as the backend API
- Remove conflicting legacy entry points
- Establish clear project boundaries
- Remove duplicated business logic

## Phase 2 — Backend & Database

- Introduce PostgreSQL
- Define database schema
- Create service/repository layers
- Implement migrations
- Add persistent case/check-in data

## Phase 3 — Authentication & Authorization

- Implement real authentication
- Implement RBAC
- Add protected API routes
- Add resource-level authorization

## Phase 4 — Risk Engine

- Consolidate risk classification
- Define explicit scoring rules
- Add crisis detection
- Add versioning
- Add tests
- Clearly separate decision support from diagnosis

## Phase 5 — Security & Privacy

- Secure secrets
- Encrypt sensitive data where appropriate
- Implement audit logs
- Add rate limiting
- Secure cookies/tokens
- Add CORS/CSRF protections where applicable
- Review data retention/deletion requirements

## Phase 6 — Testing

- Unit tests
- API tests
- Component tests
- Integration tests
- E2E tests
- Security testing

## Phase 7 — UI/UX Polish

- Accessibility
- Responsive behavior
- Loading states
- Error states
- Empty states
- Consistent typography
- Consistent spacing
- Production branding

## Phase 8 — CI/CD

- GitHub Actions
- Automated quality checks
- Dependency scanning
- Build verification
- Deployment automation

## Phase 9 — Documentation

- Architecture documentation
- API documentation
- Environment setup
- Deployment guide
- Database documentation
- Security documentation
- Risk-engine documentation
- Contribution guide

---

# 33. Product Positioning Recommendation

For professional client presentations, avoid positioning the system as an automated diagnostic tool unless the necessary clinical validation, governance, and regulatory requirements are actually satisfied.

Recommended positioning:

> **Aashraya is a digital mental-wellbeing monitoring and counselor-triage platform designed to help organizations identify potentially concerning distress patterns, prioritize support cases, and connect people with appropriate human assistance.**

The system should be presented as **decision support and early intervention**, not as a replacement for qualified mental-health professionals.

---

# 34. Key Strengths

The existing project has several strong foundations:

- Clear product concept
- Strong visual prototype
- Two distinct user experiences
- Good counselor workflow
- Longitudinal case visualization
- Risk prioritization concept
- Crisis-support workflow
- Mobile-first interaction
- Cohort analytics concept
- Reusable React components
- Centralized prototype state management

The primary challenge is not the product idea or UI.

The main challenge is converting the current prototype into **one coherent, secure, persistent, testable production system**.

---

# 35. Decisions Required Before Implementation

The following product/business decisions should be confirmed before major code changes.

### 1. Canonical architecture

Recommended:

**React frontend + Flask backend + PostgreSQL**

### 2. Product purpose

Is the system:

- A client/demo prototype?
- A production platform?
- A research project?
- An NGO deployment?

### 3. Target client

Examples:

- NGO
- Hospital
- University
- Government organization
- Corporate wellness program
- Disaster-relief organization

### 4. Authentication

Choose:

- Email/password
- Google/Microsoft SSO
- Organization-managed accounts
- Auth0
- Supabase
- Firebase
- Other

### 5. Database

Recommended:

**PostgreSQL**

### 6. Deployment

Potential options:

- Vercel
- Render
- Railway
- AWS
- Azure
- Google Cloud
- DigitalOcean
- On-premise

### 7. AI strategy

Choose:

- Keep deterministic risk engine
- Introduce ML model
- Introduce LLM
- Hybrid deterministic + AI/ML approach

A hybrid approach should be investigated carefully for a safety-sensitive application.

### 8. Product terminology

Confirm whether "mental health surveillance" is intentionally the public-facing terminology or whether a term such as:

**mental-wellbeing monitoring / early-support / counselor triage**

is preferred.

### 9. Demo data

Confirm whether current fictional users/cases should remain as demo seed data.

### 10. Visual design

Recommended:

**Preserve the existing visual direction initially and perform UI polish after architecture stabilization.**

### 11. Crisis resources

Confirm whether current crisis/helpline resources are intended for production or are placeholders.

---

# 36. Final Assessment

## Current State

**A strong product prototype with a promising UX, but not yet a production-ready application.**

The project has a solid foundation for a professional demonstration, especially on the UI/UX side. However, the underlying architecture currently contains multiple competing implementations and lacks the persistence, authentication, authorization, security, testing, observability, and deployment infrastructure expected from a production platform handling sensitive mental-health information.

## Overall Recommendation

Do **not** rewrite the project from scratch.

Instead:

```text
Preserve the UX
      ↓
Choose canonical architecture
      ↓
Unify business logic
      ↓
Build real backend
      ↓
Add database
      ↓
Implement authentication/RBAC
      ↓
Secure sensitive data
      ↓
Add tests
      ↓
Add CI/CD
      ↓
Polish UI
      ↓
Deploy
```

The project can then evolve from a convincing prototype into a maintainable, professional product.
