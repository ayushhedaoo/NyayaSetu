# Backend Architecture: NyayaSetu

This document serves as the definitive engineering guide to the NyayaSetu Version 2 backend API. It strictly separates the **Current Implementation** from the **Future Production Architecture**.

---

## Backend Overview
**Current Implementation:** A monolithic Node.js REST API built with Express.js (running on port 5000). It connects to MongoDB Atlas for persistence and Google Gemini for AI operations. It synchronously handles multipart file uploads and document parsing.
**Future Production Architecture:** A horizontally scalable API layer that offloads heavy parsing and AI processing to background worker queues, communicating with a decoupled microservice or worker pool.

## Express Architecture
**Current Implementation:** Traditional MVC (Model-View-Controller) structure adapted for a REST API. server.js serves as the entry point, mounting global middleware and routing requests to specific domain handlers.
**Future Production Architecture:** Migration towards Domain-Driven Design (DDD), where features (e.g., Documents, Translation, Auth) encapsulate their own routes, controllers, and services in isolated modules.

## Folder Structure
`	ext
Code/BackEnd/backend/
├── config/      # Environment & DB connection setup
├── controllers/ # HTTP request handlers (e.g., documentController.js)
├── middleware/  # Express middleware (Auth, Error Handler, Upload)
├── models/      # Mongoose Schemas (User, Document, Summary)
├── routes/      # Express Routers defining API endpoints
├── services/    # External service logic (Reserved for future)
├── utils/       # Shared helpers (Gemini AI, Document Parsing)
├── uploads/     # Ephemeral local storage for incoming files
└── server.js    # Express application bootstrap
`

## Controllers
**Current Implementation:** Controllers contain the bulk of the business logic. They directly extract request data, call utility functions (extractText), invoke AI utilities, and save to MongoDB. Wrapped in express-async-handler to avoid explicit 	ry/catch blocks.
**Future Production Architecture:** Controllers must be thin. They should only handle HTTP validation and response formatting. Core logic must be moved to the /services layer.

## Routes
**Current Implementation:** Express Routers mounted in server.js (/api/auth, /api/documents, /api/admin, /api/free-trial, /api/translate).
**Future Production Architecture:** Introduce strict API versioning at the router level (e.g., /api/v1/documents).

## Middleware
**Current Implementation:** 
- uthMiddleware.js: Verifies JWT from the Authorization header and populates eq.user.
- errorHandler.js: Global error trap returning standardized JSON responses.
- ateLimit: Global API rate limiting.
- multer: Handles multipart/form-data.

## Services
**Current Implementation:** Underutilized. Business logic is currently intertwined with Controllers.
**Future Production Architecture:** Create DocumentService, TranslationService, and AIService. Controllers will inject these services, allowing for easier unit testing without mocking the entire HTTP request lifecycle.

## Utilities
**Current Implementation:** 
- gemini.js: Wraps the @google/generative-ai SDK with hardcoded prompts.
- documentParser.js: Utilizes mammoth and pdf-parse to convert files to raw strings.

---

## Authentication & Authorization

### Authentication
**Current Implementation:** Standard email/password registration. 
**Future Production Architecture:** Introduce OAuth2 (Google/LinkedIn) for frictionless lawyer/citizen onboarding.

### Authorization
**Current Implementation:** Role-based checks relying on eq.user.role (e.g., Admin vs User).
**Future Production Architecture:** Implement granular permission scopes (e.g., document:read, document:write) for enterprise team sharing.

### JWT Flow
**Current Implementation:** Server signs a stateless JWT upon login with a 30-day expiration. The frontend must store this in localStorage and pass it in the Authorization: Bearer <token> header.
**Future Production Architecture:** Switch to secure, HTTP-only cookies to prevent XSS attacks. Implement short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d).

### Password Hashing
**Current Implementation:** cryptjs hooks into the Mongoose User schema (pre('save')) to salt and hash passwords before persistence.

---

## Data Handling & Logging

### Validation
**Current Implementation:** Basic manual checks in controllers (e.g., if (!email) res.status(400)).
**Future Production Architecture:** Enforce strict request schema validation using Joi or Zod via middleware before the controller is ever invoked.

### Error Handling
**Current Implementation:** Centralized errorHandler middleware. Synchronous throws and rejected promises return { success: false, message: ... }.
**Future Production Architecture:** Standardize error codes (e.g., ERR_DOC_PARSE_FAILED) alongside human-readable messages for better frontend localization.

### Logging Strategy
**Current Implementation:** morgan('dev') logs basic HTTP requests to the console.
**Future Production Architecture:** Integrate Winston or Pino to stream structured JSON logs to Datadog, AWS CloudWatch, or LogDNA.

---

## File & AI Pipelines

### File Upload Architecture
**Current Implementation:** multer saves files directly to the local disk (/uploads). 
**Future Production Architecture:** Stream uploads directly to cloud storage (AWS S3) using multer-s3 to avoid exhausting ephemeral disk space on PaaS providers like Render.

### PDF Parsing Pipeline
**Current Implementation:** pdf-parse reads the local file synchronously and extracts text into memory. The file is then deleted (s.unlinkSync).
**Future Production Architecture:** Download the file stream from S3 directly into a worker node for parsing to prevent blocking the API gateway.

### AI Processing Pipeline
**Current Implementation:** The raw text is concatenated with a prompt and sent synchronously to Gemini 2.5 Flash. The API waits for the full generation to complete, parses the JSON, and saves it to MongoDB.
**Future Production Architecture:** Asynchronous orchestration. The API responds immediately with 202 Accepted and a jobId. The frontend polls or listens via WebSockets for the completed AI summary.

### Translation Pipeline
**Current Implementation:** Synchronous API route (POST /api/translate) that sends specific text blocks back to Gemini for Hindi translation.

### Legal Dictionary Pipeline
**Current Implementation:** Static or basic keyword-matching logic.
**Future Production Architecture:** Vector embeddings (RAG) to find contextually relevant definitions based on the surrounding sentence, not just exact keyword matches.

---

## API Groups

### Admin APIs
**Current Implementation:** Protected by eq.user.role === 'admin'. Exposes aggregated system statistics (Total users, Total documents).

### User APIs
**Current Implementation:** /api/documents manages CRUD operations for the user's specific analysis history. Documents are isolated by eq.user._id.

### Free Trial Architecture
**Current Implementation:** Rate-limited IP-based tracking (FreeTrialLog) allowing unauthenticated users to upload a single document.
**Future Production Architecture:** Utilize robust device fingerprinting and require SMS OTP to prevent free-tier abuse.

---

## Security Architecture

- **Rate Limiting:** express-rate-limit enforces 100 requests per 15 minutes globally.
- **CORS:** cors() middleware is currently too permissive. Must explicitly whitelist the frontend domain (e.g., https://nyayasetu.vercel.app).
- **Helmet:** Used to inject secure HTTP headers (HSTS, No-Sniff, XSS protection).
- **API Versioning:** Not currently implemented. *Recommendation: Migrate to /api/v1 immediately.*

---

## Scalability & Performance

### Future Background Workers & Queue Architecture
**Current Implementation:** None.
**Future Production Architecture:** **CRITICAL REQUIREMENT.** Implement BullMQ (backed by Redis). 
1. Controller accepts upload and adds it to the queue.
2. A separate Node.js Worker process picks up the job.
3. Worker runs pdf-parse and Gemini API requests.
4. Worker saves to MongoDB and triggers a WebSocket event to the frontend.

### Scalability Recommendations
- The backend is stateless (JWT + MongoDB), allowing horizontal scaling (adding more Node.js instances).
- Implementing Redis is required to scale rate-limiting and session management across multiple instances.

### Performance Bottlenecks
- **Event Loop Blocking:** pdf-parse is CPU-bound. If 10 users upload large PDFs simultaneously, the Node.js event loop will freeze, causing all other API requests (even simple auth checks) to time out.
- **Gemini Latency:** AI generation takes 5-15 seconds. Keeping an HTTP connection open that long is risky and prone to proxy timeouts.

### Current Limitations
- Reliance on ephemeral local disk space (/uploads) means the application will fail if deployed across multiple load-balanced servers without sticky sessions.

### Refactoring Recommendations
1. **Critical:** Implement BullMQ and move extractText() off the main Express thread.
2. **High:** Move to AWS S3 for file storage instead of the local filesystem.
3. **High:** Refactor controllers to extract business logic into /services.
4. **Medium:** Transition JWTs to HTTP-only cookies.
