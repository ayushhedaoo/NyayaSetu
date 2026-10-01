# Changelog: NyayaSetu

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Complete AI_CONTEXT documentation suite generated.
- Decoupled Frontend (Vite/Tailwind) and Backend (Express/MongoDB) architecture established.
- Milestone 1 Verification Report created, validating environments.
- Created `frontend/api.js` to manage centralized API communication and JWT token handling.
- Wired drag-and-drop file upload to POST `/api/documents/upload` in `upload-document.html`.
- Dynamic rendering of AI JSON summaries, clauses, and risks in `analysis-commercial-lease.html`.
- Fully functional Admin Portal (`AdminDashboard.jsx`, `UsersTable`, `DocumentsTable`, `SystemHealthChart`).
- Legal Dictionary (`LegalDictionary.jsx`, `TermDetail.jsx`) with categories, search, and popular terms.
- Static Pages (`About.jsx`, `Research.jsx`, `PrivacyPolicy.jsx`, `TermsAndConditions.jsx`, `FAQ.jsx`, `Contact.jsx`).
- Document Management sorting, filtering, pagination, and dropdown actions (`DocumentActions.jsx`).
- `ServerError.jsx` Error Boundary and Offline detection logic in `App.jsx`.
- Robust interactive state-driven `Settings.jsx` with `Toast.jsx` notifications.
- API retry logic and exponential backoff in `apiClient.js`.
- ARIA accessibility attributes and form validation in `LoginPage.jsx` and `Input.jsx`.
- **Milestone 8 Release Audit**: Performed comprehensive code, security, and performance audits.
### Fixed
- Fixed critical brute-force vulnerability by properly applying `authLimiter` to `/api/auth` routes.
- Fixed a legacy routing bug in `Dashboard.jsx` causing `window.location.href` to route to a dead HTML page.
- Fixed scoping issue and added `useCallback` to `handleExportJSON` in `DocumentAnalysis.jsx`.
- Hardened `deleteDocument` controller with defensive `fs.existsSync` checks.
- Memoized `DocumentCard` using `React.memo` for performance optimization.
### Changed
- Shifted from legacy MERN monolith to isolated REST API and static UI.
- Wired static HTML dashboard to dynamically fetch and display uploaded documents.
- Updated `sign-in.html` and `dashboard.html` to communicate directly with backend `/api/auth` routes using Vanilla JS fetch.
### Removed
- Legacy React components from NyayaSetu_Code deprecated.

---

## Change Log Format (For Future AI Assistants)

When logging changes, use the following template:

```markdown
## [Version X.Y.Z] - YYYY-MM-DD
### Added
- [Feature] Describe new feature.
### Changed
- [Update] Describe modification to existing feature.
### Fixed
- [Bug] Describe bug fix.
### Removed
- [Deprecation] Describe removed code.
### Security
- [Security] Describe vulnerability patch.
```
