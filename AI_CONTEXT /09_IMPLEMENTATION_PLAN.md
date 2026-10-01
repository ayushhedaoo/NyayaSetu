# Implementation Plan: NyayaSetu V2

This roadmap details the phase-by-phase execution to transition NyayaSetu from its current prototype state to a production-ready application.

## Milestone 1 - Infrastructure Stabilization & Functional Integration [COMPLETE]
**Goal:** Make the existing project fully runnable and wire the static HTML UI to the backend APIs.
**Status:** Completed. Auth, upload, dashboard, and analysis wired via Vanilla JS.

---

## Phase 1 - Codebase Cleanup
**Goal:** Remove legacy code and structure the repo.
**Tasks:**
- Archive or delete the NyayaSetu_Code monolithic folder.
- Initialize rontend as a React Vite project.
- Move existing Stitch HTML/CSS into React components.
**Dependencies:** None.
**Completion Criteria:** The app runs on Vite as a React project looking visually identical to the HTML prototype.
**Complexity:** Medium | **Duration:** 3 Days
**Git Strategy:** Branch: eature/react-migration

---

## Phase 2 - MongoDB Integration
**Goal:** Stabilize database connection.
**Tasks:**
- Resolve DNS SRV errors by switching to standard connection strings.
- Verify Mongoose schemas map to current business requirements.
**Completion Criteria:** Backend connects to Atlas consistently without ECONNREFUSED.

---

## Phase 3 - Authentication
**Goal:** End-to-end user login.
**Tasks:**
- Wire frontend Login/Register forms to backend /api/auth routes.
- Implement Axios interceptors and AuthContext.
**Completion Criteria:** User can register, log in, and view their name on the Dashboard.
**Complexity:** Medium | **Duration:** 3 Days

---

## Phase 4 - Backend Fixes
**Goal:** Prepare API for file handling.
**Tasks:**
- Fix multer storage paths.
- Ensure pdf-parse correctly resolves text blocks.

---

## Phase 5 - Frontend Integration
**Goal:** Connect Dashboard and Upload UI.
**Tasks:**
- Wire the drag-and-drop zone to the POST /api/documents/upload route.
- Render actual history in the Dashboard via GET /api/documents.

---

## Phase 6 - AI Pipeline
**Goal:** End-to-end document analysis.
**Tasks:**
- Ensure the backend passes extracted text to Gemini.
- Wire the frontend Analysis screen to dynamically render the JSON summary, clauses, and risks.
**Testing:** Upload a 10-page lease and verify extraction accuracy.
**Complexity:** High | **Duration:** 5 Days

---

## Phase 7 - Admin System
**Goal:** Platform management.
**Tasks:**
- Build Admin Dashboard pulling from /api/admin/stats.

---

## Phase 8 - Responsive Polish
**Goal:** Mobile usability.
**Tasks:**
- Fix any broken mobile layouts in the React conversion. Implement the mobile hamburger menu.

---

## Phase 9 - Security
**Goal:** Lock down the app.
**Tasks:**
- Implement CORS whitelist.
- Move API keys to secure vault / strict .env management.
- Implement helmet headers.

---

## Phase 10 - Performance
**Goal:** Address the PDF blocking issue.
**Tasks:**
- Implement BullMQ for background parsing if possible, or heavily optimize the synchronous route.

---

## Phase 11 - Testing
**Goal:** Ensure stability.
**Tasks:**
- Write Postman/Jest integration tests for the 5 core API routes.

---

## Phase 12 - Deployment
**Goal:** Go live.
**Tasks:**
- Deploy Frontend to Vercel.
- Deploy Backend to Render.
- Verify environment variables.
**Completion Criteria:** App is accessible publicly and functional.
