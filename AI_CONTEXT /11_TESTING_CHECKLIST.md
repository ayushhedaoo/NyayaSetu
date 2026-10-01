# QA & Testing Checklist: NyayaSetu V2

This handbook defines the Quality Assurance standards for the NyayaSetu platform.

---

## 0. Milestone 1 - Functional Integration
- [x] Verify frontend builds and runs.
- [x] Verify backend builds and runs.
- [x] Verify database connection string valid.
- [x] Verify frontend routes and auth wiring.
- [x] Verify drag-and-drop upload API wiring.
- [x] Verify AI analysis DOM injection.

## 1. Frontend Testing
- [x] Verify all routes load without 404s.
- [x] Verify Skeleton loaders appear during API fetch states.
- [x] Verify Empty States render correctly when data is missing.
- [x] Verify Toast Notifications appear for success/error actions.

## 2. Backend & API Testing
- [x] Verify GET /api/auth/me rejects invalid JWTs with 401.
- [x] Verify POST /api/documents/upload rejects non-PDF/DOCX files.
- [x] Verify POST /api/documents/upload rejects files >10MB.
- [x] Verify rate limiting blocks users after 100 requests.

## 3. AI & Processing Testing
- [x] **Gemini Testing:** Upload a known legal document and verify the JSON structure returned matches schema.
- [x] **Translation Testing:** Verify Hindi translation maps correctly to UI containers without breaking layouts.
- [x] **Summarization Testing:** Ensure summaries do not exceed 500 words.
- [x] **Dictionary Testing:** Verify exact keyword matches trigger the dictionary tooltip.

## 4. UI/UX & Accessibility Testing
- [x] **Responsive Testing:** Verify Bento-grid collapses to a single column on mobile (<768px).
- [x] **Accessibility:** Verify all buttons are reachable via Tab key.
- [x] **Contrast:** Verify primary text (#1b1c19) on background (#fbf9f4) meets WCAG AA.

## 5. End-to-End (E2E) User Journeys
- [x] **Journey 1:** Register -> Login -> Dashboard -> Upload 2MB PDF -> View Analysis -> Logout.
- [x] **Journey 2:** Admin Login -> View Stats -> View Users -> Logout.

---

## 6. Bug Reporting Format
When filing a bug, engineers must use this template:
`markdown
**Title:** [Module] Brief description
**Steps to Reproduce:**
1. Navigate to...
2. Click on...
**Expected Behavior:** What should happen.
**Actual Behavior:** What actually happened.
**Environment:** Production/Dev, Browser, Device.
**Screenshots/Network Logs:** Attached.
`

## 7. Production Verification Checklist (Pre-Release)
- [x] All environment variables set in Vercel/Render.
- [x] Database indexes applied.
- [x] E2E Journey 1 successfully completed on production URL.
