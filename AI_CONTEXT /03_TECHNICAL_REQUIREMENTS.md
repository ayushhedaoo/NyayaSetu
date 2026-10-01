# Executive Technical Overview

The technical architecture of NyayaSetu Version 2 transitions from a tightly coupled monolithic structure to a highly scalable, decoupled Client-Server model. 

- **Frontend (Client):** Currently implemented as a prototype using static HTML/CSS (Tailwind via Stitch) and Vite. To fulfill the dynamic requirements of Version 2, this layer is required to evolve into a Component-Based SPA (Single Page Application) using React (or similar). The frontend communicates strictly over HTTP/REST to the backend.
- **Backend (Server):** A robust Node.js and Express REST API. It handles business logic, JWT authentication, multipart file uploads, and coordinates text extraction.
- **AI Services:** The backend acts as a secure orchestrator, sending extracted legal text to the Google Gemini API (via @google/generative-ai) utilizing strictly engineered prompts to return JSON-structured insights.
- **Database:** MongoDB Atlas is utilized as the persistent data store for users, document history, and cached AI analysis results, ensuring the system remains stateless and horizontally scalable.
- **Deployment:** The architecture supports edge-caching the frontend via Vercel, while the backend API scales vertically and horizontally on a PaaS like Render.

------------------------------------------------------------

# Technology Stack

- **Frontend:** React (Target State) / HTML5 + Tailwind CSS (Current State), Vite.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas, Mongoose ODM.
- **Authentication:** JWT (JSON Web Tokens), bcryptjs.
- **Hosting:** Vercel (Frontend), Render (Backend).
- **AI Services:** Google Gemini 2.5 Flash API.
- **File Storage:** Local ephemeral storage (/uploads) parsed in-memory, then discarded.
- **Package Manager:** NPM.
- **Version Control:** Git / GitHub.
- **Build Tools:** Vite.

------------------------------------------------------------

# Frontend Architecture

*(Note: The current Version 2 frontend is a static HTML prototype. The following describes the required React architecture to support the App Flow and PRD).*

- **React architecture:** Function-component based React utilizing strict hooks.
- **Folder organization:** /src divided into /components, /pages, /hooks, /context, /services, /assets.
- **Routing:** Client-side routing (e.g., React Router v6) to handle navigation between Dashboard, Upload, and Analysis without page reloads.
- **State management:** React Context API for global state (Auth, Theme). Component-level state via useState/useReducer.
- **API layer:** Axios or native Fetch encapsulated in a /services directory (e.g., pi.js with Axios interceptors for JWT injection).
- **Reusable components:** Bento-grid cards, Primary Buttons, UI Alerts, and Skeleton Loaders extracted into a shared library.
- **Hooks:** Custom hooks like useAuth(), useUpload(), and useDocuments().
- **Layouts:** A persistent <AppLayout> wrapping authenticated routes to maintain the sidebar and top navigation state.
- **Theme management:** Tailwind CSS class strategy (dark:) toggled via Context.
- **Assets:** SVG icons (Material Symbols) and localized static images served via Vite public folder.
- **Forms:** Controlled components with strict onChange handlers.
- **Validation:** Client-side validation before submission to save API calls.
- **Error handling:** Global Error Boundaries to catch UI crashes, and localized toast notifications for API failures.

------------------------------------------------------------

# Backend Architecture

- **Express architecture:** Model-View-Controller (MVC) pattern adapted for REST APIs.
- **Routes:** Modularized in /routes (e.g., uthRoutes.js, documentRoutes.js) and mounted in server.js.
- **Controllers:** Async functions in /controllers utilizing express-async-handler to eliminate try/catch blocks.
- **Middleware:** uthMiddleware.js (JWT verification), errorHandler.js (global error formatting), and uploadMiddleware.js (multer configuration).
- **Services:** External integrations isolated here (e.g., AI prompt logic).
- **Utilities:** Pure functions in /utils (e.g., documentParser.js for Mammoth/PDF-Parse).
- **Authentication:** JWT tokens issued on login, verified on protected routes.
- **Authorization:** Role-based checks (eq.user.role === 'admin').
- **Validation:** Request body validation (via libraries like Joi or manual checks) before hitting controllers.
- **Error handling:** Custom errorHandler middleware catches throws and returns { success: false, message: ... }.
- **Logging:** morgan middleware for HTTP request logging in development.

------------------------------------------------------------

# Database Architecture

- **MongoDB Atlas:** Hosted cloud instance.
- **Collections:** users, documents, summaries, reetriallogs.
- **Relationships:** Document model references User model via ObjectId (user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }).
- **Indexes:** Indexed by user ID for fast history lookups. Email fields indexed for uniqueness.
- **Document structure:** NoSQL documents storing flat metadata, with nested JSON for AI insights (Clauses, Risks).
- **Migration strategy:** Schema changes managed loosely via Mongoose defaults, requiring backward compatibility in frontend UI.
- **Backups:** Automated via MongoDB Atlas snapshot policies.

------------------------------------------------------------

# Authentication Architecture

- **JWT:** Used for stateless authentication.
- **Password hashing:** cryptjs used in Mongoose pre('save') hooks.
- **Protected routes:** Express middleware checks Authorization: Bearer <token>.
- **Role-based authorization:** Specific routes check if user role is dmin.
- **Session handling:** Entirely stateless on the server; client manages the token.
- **Token expiration:** Recommended 30-day expiration (30d).
- **Refresh strategy:** Currently relies on forcing re-login upon expiration. *(Recommendation: Implement short-lived access tokens with HTTP-only refresh tokens).*

------------------------------------------------------------

# AI Architecture

- **Gemini integration:** @google/generative-ai SDK.
- **Prompt strategy:** System instructions strictly forbidding legal advice, forcing JSON-only responses, and injecting the raw parsed text.
- **Document processing pipeline:** Upload -> Parse -> Prompt Generation -> API Call -> JSON Parse -> DB Save.
- **Summarization flow:** High-temperature generation for readability.
- **Translation flow:** Separate API call mapping English summary nodes to Hindi.
- **Clause extraction:** Low-temperature structured extraction seeking specific legal keywords.
- **Legal dictionary logic:** Contextual semantic search (future) or hardcoded mapping.
- **Risk analysis:** AI flags one-sided clauses based on standard commercial norms.
- **Future AI improvements:** Streaming responses (Server-Sent Events) to reduce perceived latency.

------------------------------------------------------------

# File Processing Pipeline

- **Supported formats:** .pdf (pdf-parse), .docx (mammoth).
- **Upload flow:** Client sends multipart/form-data.
- **Validation:** multer middleware checks file size (<10MB) and MIME type.
- **Temporary storage:** Saved to /uploads directory temporarily.
- **Parsing:** Synchronous extraction of raw text strings.
- **Processing:** Raw text fed to Gemini.
- **Cleanup:** s.unlinkSync removes the temporary file after text extraction to save disk space.

------------------------------------------------------------

# API Architecture

*(Base URL: /api)*

### Auth
- **Route:** POST /auth/register | **Purpose:** Create user. | **Auth:** None | **Req:** email, password, name | **Res:** token, user object.
- **Route:** POST /auth/login | **Purpose:** Authenticate user. | **Auth:** None | **Req:** email, password | **Res:** token, user object.
- **Route:** GET /auth/me | **Purpose:** Get current user data. | **Auth:** Bearer Token.

### Documents
- **Route:** POST /documents/upload | **Purpose:** Upload and analyze. | **Auth:** Bearer Token | **Req:** multipart/form-data | **Res:** AI Summary, Clauses, Risks.
- **Route:** GET /documents | **Purpose:** Get user history. | **Auth:** Bearer Token | **Res:** Array of documents.
- **Route:** GET /documents/:id | **Purpose:** Get specific analysis. | **Auth:** Bearer Token.

### Admin
- **Route:** GET /admin/users | **Purpose:** List all users. | **Auth:** Admin Token.
- **Route:** GET /admin/stats | **Purpose:** System metrics. | **Auth:** Admin Token.

### Misc
- **Route:** POST /free-trial/upload | **Purpose:** Rate-limited unauthenticated upload.
- **Route:** POST /translate | **Purpose:** Translate text to Hindi.

------------------------------------------------------------

# Environment Variables

- PORT: (Optional) Port for Express. Default 5000.
- MONGO_URI: (Required) MongoDB connection string.
- JWT_SECRET: (Required) Cryptographic secret for signing tokens.
- JWT_EXPIRE: (Optional) Token lifetime. Default 30d.
- GEMINI_API_KEY: (Required) Google AI API Key.
- GEMINI_MODEL: (Optional) e.g., gemini-2.5-flash.
- NODE_ENV: (Required) development or production.

------------------------------------------------------------

# Third Party Services

- **MongoDB Atlas:** Database hosting.
- **Google Gemini:** Core AI engine.
- **Render:** Backend API hosting.
- **Vercel:** Frontend CDN and edge hosting.
- **Future integrations:** Stripe (Billing), SendGrid (Transactional Emails).

------------------------------------------------------------

# Security Architecture

- **Authentication:** JWT stateless verification.
- **Authorization:** Middleware checks eq.user population.
- **Rate Limiting:** express-rate-limit (100 req/15min) prevents brute force.
- **Input Validation:** Prevent NoSQL injection by sanitizing inputs.
- **CORS:** Must be restricted to the Vercel frontend domain in production.
- **Helmet:** Sets secure HTTP headers (XSS protection, no-sniff).
- **Password Security:** Salted and hashed using cryptjs.
- **Secrets Management:** Environment variables strictly kept out of version control.
- **OWASP recommendations:** Implement CSRF tokens if switching to cookie-based sessions.

------------------------------------------------------------

# Performance Strategy

- **Lazy loading:** React lazy() for code-splitting routes.
- **Caching:** Cache Gemini responses in MongoDB to prevent redundant API calls for the same document.
- **Compression:** Enable compression middleware in Express.
- **Image optimization:** Use SVGs instead of PNGs for UI elements.
- **API optimization:** Ensure Mongoose queries use .lean() for read-only operations.
- **Database optimization:** Index the user field in the Documents collection.
- **Bundle optimization:** Vite automatically rolls up and minifies the frontend.

------------------------------------------------------------

# Scalability Strategy

- **Horizontal scaling:** The backend is stateless, allowing multiple Node.js instances behind a load balancer.
- **Future microservices:** Extracting the AI Prompting logic into an independent Python/FastAPI microservice.
- **Caching layer:** Redis for frequent token validation and rate-limiting.
- **Queue system:** Implementing BullMQ for async document parsing to prevent event-loop blocking on 10MB PDFs.
- **Background workers:** Dedicated worker dynos to process queues.
- **CDN:** Vercel automatically distributes static assets globally.

------------------------------------------------------------

# Error Handling Strategy

- **Frontend:** Axios interceptors catch 401s (trigger logout) and 500s (trigger generic toast).
- **Backend:** express-async-handler funnels rejected promises to a centralized error middleware.
- **Database:** Mongoose validation errors caught and translated to 400 Bad Request.
- **AI:** Graceful fallback if Gemini API times out (save document status as "Failed").
- **Uploads:** Catch Multer file size limit errors and return explicit messages.
- **Authentication:** Standardized 401 Unauthorized responses.
- **Global error handling:** process.on('unhandledRejection') logs and safely shuts down the server.

------------------------------------------------------------

# Monitoring

- **Logging:** morgan in dev. (Future: Winston + Datadog/LogDNA).
- **Health checks:** Implement a GET /health endpoint for Render load balancers.
- **Performance monitoring:** (Future: New Relic or Sentry).
- **Crash reporting:** (Future: Sentry integration in both React and Express).
- **Analytics:** (Future: Mixpanel or Google Analytics).

------------------------------------------------------------

# Code Standards

- **Naming conventions:** camelCase for variables/functions, PascalCase for React components/Classes, UPPER_SNAKE_CASE for constants.
- **Folder conventions:** Feature-based grouping in backend (Controllers/Models/Routes).
- **Import conventions:** Third-party first, internal second, styles last.
- **Component conventions:** One React component per file.
- **API conventions:** RESTful nouns (e.g., /documents, not /getDocuments).
- **Git conventions:** Feature branching (eature/upload-ui), conventional commits (eat: add login).

------------------------------------------------------------

# Technical Constraints

- **Synchronous Parsing:** The current pdf-parse implementation blocks the event loop. Concurrent large uploads will freeze the Node.js server.
- **Stateless UI:** The current Stitch-generated UI requires total conversion to React to function as designed in the PRD.
- **MongoDB Free Tier:** Atlas M0 cluster has strict connection limits and network constraints (DNS SRV issues).

------------------------------------------------------------

# Recommended Improvements

### Critical
- **Background Queue (BullMQ):** Move file parsing and Gemini calls to a queue to prevent server crashing.
- **Frontend Refactor:** Convert the static HTML Stitch prototype into a functional React application with routing and state management.

### High
- **CORS Configuration:** Lock down the Express CORS settings before production deployment.
- **Streaming AI Responses:** Implement Server-Sent Events (SSE) to stream the AI summary to the UI, improving perceived performance.

### Medium
- **HTTP-Only Cookies:** Shift from storing JWTs in localStorage to secure, HTTP-only cookies to prevent XSS attacks.
- **Redis Caching:** Cache the Legal Dictionary and frequent static queries.

### Low
- **Winston Logging:** Replace basic console.log with structured JSON logging for better production observability.

------------------------------------------------------------

# Production Readiness Checklist

- [ ] **Infrastructure:** CORS restricted, NODE_ENV=production set.
- [ ] **Security:** API Keys rotated, JWT secret complex, Rate limiting enabled.
- [ ] **Performance:** Heavy parsing moved off the main thread.
- [ ] **Testing:** Unit tests for AI prompt generation and text extraction.
- [ ] **Deployment:** Frontend CI/CD via Vercel active, Backend CI/CD via Render active.
- [ ] **Documentation:** API documentation (Swagger/Postman) available for frontend engineers.
