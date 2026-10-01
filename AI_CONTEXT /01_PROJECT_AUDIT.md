# Engineering Audit Report: NyayaSetu Project

## Current Architecture
The project currently employs a decoupled Client-Server architecture, replacing a legacy monolithic/MERN structure (previously stored in "NyayaSetu_Code"). 
- **Frontend:** A static HTML/CSS web application served via Vite on port 5173. It acts as a lightweight presentation layer with hardcoded UI screens exported from Stitch.
- **Backend:** A Node.js and Express REST API running on port 5000. It manages API endpoints for authentication, file uploads, and acts as a proxy/orchestrator to the Google Gemini AI for document analysis.
- **Database:** MongoDB Atlas (Mongoose ODM).

## Current Features
- Static landing page, user dashboard, admin portal, legal dictionary, and analysis result screens.
- Basic routing between HTML pages.
- Express-based REST API for Auth, Documents, Admin, Translation, and Free Trials.
- MongoDB integration for User, Document, Summary, and FreeTrialLog collections.
- Text extraction utilizing "mammoth" and "pdf-parse".

## Working Features
- Backend initialization and MongoDB Atlas connection (via standard connection string).
- API routes are defined and structurally sound.
- Frontend static UI rendering and basic anchor tag navigation between screens.
- File upload processing logic in the backend.

## Broken Features
- The static frontend lacks dynamic state management (e.g., login state, dynamic document fetching, session tokens are not being passed from the frontend UI to the backend API).
- File uploads from the frontend UI do not actually hit the backend "/api/documents/upload" endpoint; they just simulate navigation.
- The previous React application architecture is completely disconnected and archived in "NyayaSetu_Code".

## Technical Debt
- **Disconnected Client-Server:** The new HTML UI is entirely disconnected from the backend APIs. It is a visual prototype, meaning significant JavaScript (vanilla or framework) will need to be written to wire the frontend to the backend endpoints.
- **Legacy Code:** The "NyayaSetu_Code" folder contains the old MERN stack implementation which bloats the repository.
- **Hardcoded Secrets:** Some secrets and API keys might have been pushed to ".env" historically.

## Duplicate Code
- The backend "documentController.js" and "freeTrialController.js" share similar logic for file parsing and Gemini AI invocation.
- The static HTML frontend duplicates the sidebar navigation and header elements across 6 different ".html" files instead of using a templating engine or component-based framework.

## Security Concerns
- **CORS Configuration:** Needs to be strictly defined for production rather than allowing defaults.
- **Static API Keys:** Ensure Gemini API keys and JWT Secrets are rotated and not hardcoded in source control.
- **File Upload Vulnerabilities:** "multer" must strictly limit file types and sizes to prevent malicious uploads or denial of service attacks.
- Missing CSRF protection for API calls if session cookies were to be used (currently uses JWT).

## Performance Issues
- PDF parsing using "pdf-parse" is CPU intensive and blocking. Under heavy load, it could block the Node.js event loop.
- The static HTML frontend is highly performant (no framework overhead), but will become harder to maintain as logic is added.

## Deployment Issues
- DNS SRV errors ("ECONNREFUSED") observed during MongoDB connection attempts, requiring fallback to standard connection strings or strict IP whitelisting.
- The production setup ("NODE_ENV=production") expects the frontend to be built in "../frontend/dist", but Vite builds static HTML directly. A proper build pipeline is needed.

## Code Quality
- **Backend:** Well-structured with clear separation of concerns (Controllers, Models, Routes, Utilities, Middleware). Error handling with "express-async-handler" is a good practice.
- **Frontend:** HTML is clean and utilizes modern Tailwind utility classes, but violates the DRY (Don't Repeat Yourself) principle due to lack of components.

## Folder Structure Analysis
- AI_CONTEXT/: Detailed architecture and requirements.
- Code/BackEnd/: Robust Express application with organized MVC-like structure.
- Code/FrontEnd/: Contains raw static HTML views.
- Code/NyayaSetu_Code/: Legacy monolithic React/Node application.
- Dummy_Documents/: Test assets.
- Thesis/: Documentation and theoretical foundation.

## API Analysis
- **Auth:** Standard JWT-based registration and login.
- **Documents:** Handles multipart/form-data uploads, parses text, requests Gemini summaries, and saves to MongoDB.
- **Free Trial:** Rate-limited specialized route for unauthenticated users.
- **Architecture:** Restful principles are applied, with global error handling and rate-limiting middleware (100 req / 15 min).

## Database Analysis
- **Schemas:** User, Document, Summary, FreeTrialLog. 
- **Relationships:** Documents are tied to Users via ObjectId references. 
- **Indexes:** Standard Mongoose indexes. 

## Frontend Analysis
- Built with Stitch/Tailwind.
- Strengths: Fast load times, visually modern, responsive design.
- Weaknesses: No JavaScript logic for API integration, repetitive HTML structures, no dynamic state.

## Backend Analysis
- Strengths: Solid Express structure, good security headers (helmet), decent error handling.
- Weaknesses: Synchronous document parsing could bottleneck performance.

## Third Party Services
- **Google Generative AI (Gemini):** Used for legal text summarization.
- **MongoDB Atlas:** Hosted database.

## Current Limitations
- The application is currently split into a fully functional API backend and a purely static UI frontend. They do not communicate with each other.

## Recommended Improvements
1. **Frontend Interactivity:** Write vanilla JavaScript ("fetch" calls) to connect the static HTML UI to the backend REST APIs, handling JWT storage in "localStorage".
2. **Componentization:** Migrate the static HTML into a lightweight framework (like React or Vue, or even a static templating engine like EJS/Pug) to eliminate duplicated sidebar/header code.
3. **Async Processing:** Offload document parsing and AI summarization to a background worker queue (e.g., BullMQ) so the main API thread isn't blocked on large PDFs.
4. **Cleanup:** Archive or remove the "NyayaSetu_Code" folder to reduce confusion.

## Production Readiness Score
**4 / 10**
- *Reasoning:* While the backend is well-architected and functioning, the frontend is currently just a mock UI with no real API integration. Significant JavaScript wiring is required before it can be deployed for real users.
