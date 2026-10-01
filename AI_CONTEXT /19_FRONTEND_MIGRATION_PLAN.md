# Frontend Migration Plan: NyayaSetu V2

This document provides an architectural assessment of the current NyayaSetu frontend and outlines the recommended path forward for Milestone 2.

## 1. Architectural Assessment of Current Frontend
The current frontend is built with static HTML, CSS (Tailwind), and Vanilla JavaScript, wired to the backend API via the `api.js` script.

* **Maintainability & Component Duplication:** Low. Critical UI elements like the Side Navigation, Header, and Layout structures are duplicated across every HTML file (`dashboard.html`, `upload-document.html`, `analysis-commercial-lease.html`). Any change to the sidebar requires modifying every file.
* **Scalability & Reusability:** Poor. Without a component-based architecture, reusing UI patterns (like buttons, modals, and cards) requires copy-pasting HTML/CSS, leading to divergence and inconsistencies over time.
* **State Management:** Basic. State is currently managed ad-hoc using DOM manipulation and `localStorage` (for JWTs). Complex state, like document processing progress and multi-step UI flows, will become difficult to manage robustly.
* **Authentication Handling:** Functional but fragmented. While `api.js` centralizes the fetch logic, protecting routes requires manual `<script>` checks on every page, which is prone to security oversights.
* **Routing:** Page-based (multi-page application). Navigating between screens requires a full page reload, breaking the fluid user experience expected of modern web applications.
* **Future Feature Expansion:** Difficult. Features like real-time updates (WebSockets), complex form handling, and rich AI interactions are severely hampered by the lack of a reactive UI framework.

## 2. Comparison of Approaches

### Option A: Continue with Static HTML + Vanilla JavaScript
* **Engineering Effort:** Low initially, but grows exponentially as complexity increases.
* **Risk:** Low technical risk in the short term, high architectural risk in the long term (spaghetti code).
* **Performance:** Fast initial load, but slower page transitions due to full reloads.
* **Maintainability / Scalability:** Extremely poor due to code duplication.
* **Developer Experience:** Poor. Lacks modern tooling like Hot Module Replacement (HMR) for components, linting, and type checking.
* **Future Roadmap Compatibility:** Incompatible with complex planned features (real-time collaboration, complex document viewers).

### Option B: Convert to React + Vite
* **Engineering Effort:** Medium upfront effort to refactor HTML into JSX and split into reusable components.
* **Risk:** Moderate. Requires careful extraction to ensure styles and API integrations don't break.
* **Performance:** Excellent. Single Page Application (SPA) architecture enables instant page transitions.
* **Maintainability / Scalability:** High. Component-based architecture allows for a single source of truth for UI elements.
* **Developer Experience:** Excellent. Fast HMR, rich ecosystem, and structured state management.
* **Future Roadmap Compatibility:** Perfect fit for the long-term strategic roadmap (Analytics, Desktop apps via Electron/Tauri, advanced AI features).

## 3. Recommendation
**Recommendation: Migrate to React + Vite.**

The static HTML approach has served its purpose as a rapid prototype and initial functional integration test. However, to support the ambitious Version 2+ roadmap, a component-based reactive framework is mandatory. The migration will be strictly structural: we will preserve every visual element, the exact current UI, API compatibility, styling (Tailwind classes), and routing logic.

## 4. Migration Plan

### Benefits
- Elimination of duplicated code (e.g., `<Sidebar />`, `<Header />`).
- Fluid, SPA page transitions without full reloads.
- Robust state management (React Context / Hooks) for auth and data fetching.
- Significantly faster development velocity for future milestones.

### Risks
- **Styling Breakages:** Converting HTML to JSX requires careful handling of `class` to `className` and self-closing tags.
- **API Breakages:** Moving from Vanilla JS `apiFetch` to React `useEffect` hooks could introduce race conditions if not handled properly.

### Estimated Effort
3-5 Days for complete migration and testing.

### Migration Phases

#### Phase 1: Initialization
- Generate a new Vite + React + JavaScript project in the `frontend` directory (alongside the existing static files).
- Install required dependencies (`react-router-dom`, `axios` or native fetch wrappers, TailwindCSS setup).

#### Phase 2: Component Extraction (Dumb Components)
- Extract the global UI shell: Sidebar, Header, Layout containers.
- Extract atomic elements: Buttons, Inputs, Cards.
- Ensure all Tailwind classes are copied exactly as they are.

#### Phase 3: Page Migration (Smart Components)
- Recreate `login.jsx`, `dashboard.jsx`, `upload.jsx`, and `analysis.jsx`.
- Implement `react-router-dom` to match existing HTML file paths conceptually.

#### Phase 4: State & API Integration
- Port the `api.js` logic into a React Context or custom Hook (e.g., `useAuth`).
- Wire the pages to the backend, verifying that the payloads match what was established in Milestone 1.

#### Phase 5: Verification & Cleanup
- Conduct visual regression testing to guarantee the UI is pixel-perfect to the Stitch original.
- Delete the legacy static HTML files.

### Breaking Changes
- The frontend will no longer be served via a simple static file server; it requires the Vite build step (`npm run build`) for production. 
- Links using `<a href="page.html">` will be replaced with `<Link to="/page">`.

### Rollback Strategy
The existing static HTML files and `api.js` will remain untouched in a `legacy/` folder or on a separate Git branch until the React migration is 100% verified. If the migration fails or takes too long, we can instantly revert to the static files.
