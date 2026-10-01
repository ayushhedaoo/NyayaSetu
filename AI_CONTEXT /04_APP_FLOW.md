# Product Navigation Architecture

## Desktop Navigation
NyayaSetu Version 2 uses a dual-navigation structure: a public-facing top navigation bar for visitors and an authenticated sidebar/top-bar combo for active users.

## Mobile Navigation
Mobile users experience a responsive hamburger menu for both public and authenticated states. The authenticated sidebar transforms into a bottom-sheet or hidden drawer accessible via a menu icon in the top app bar.

## Sidebar Structure
Visible only to authenticated users (and conditionally to admins).
- **New Analysis** (Primary Call-to-Action button)
- **Overview** (Dashboard)
- **My Documents** (Document History)
- **Upload** (Upload Document)
- **Dictionary** (Legal Dictionary)
- **Settings** (Profile & App Settings)
- **Help Center** (Support)
- **Logout** (Session Termination)

## Top Navigation
- **Public View:** Logo (Home), Features, How it works, For Professionals, Sign In (Link), Try Free (CTA).
- **Authenticated View:** Global Search Bar, Notifications Icon, User Profile Avatar (Dropdown).

## Footer Navigation
- Visible primarily on public pages (index.html).
- **Links:** Privacy Policy, Terms of Service, Disclaimer, Contact.

## Quick Actions
- Drag & Drop Upload Zone (Dashboard)
- Review Findings (Dashboard / Recent Analysis)
- Translate to Hindi (Analysis Screen)

## Search
- **Global Search:** Located in the authenticated top navigation. Allows searching across document history, file names, and the Legal Dictionary simultaneously.

## Profile Menu
- Dropdown from the avatar in the top right.
- Links: My Profile, Billing/Subscription, Settings, Logout.

## Notifications
- A dropdown accessed via the bell icon in the top navigation. Displays processing completion alerts and system warnings.

## Settings
- User preferences, notification toggles, language preferences, and password management.

------------------------------------------------------------

# Screen Inventory

## Landing Page
- **Purpose:** Introduce the product, value proposition, and drive conversions.
- **URL Route:** / (index.html)
- **Who can access it:** Public / Unauthenticated users.
- **Entry points:** Direct traffic, search engines.
- **Exit points:** Sign In, Try Free, Features, Footer Links.
- **Expected data:** Static marketing copy.

## Features / About / Research & Methodology / Pricing
- **Purpose:** Detailed marketing pages explaining the platform's capabilities and thesis origins.
- **URL Route:** /#features, /#how-it-works, /#pricing
- **Who can access it:** Public.
- **Entry points:** Landing Page.
- **Exit points:** Sign In, Try Free.

## Login / Register / Forgot Password
- **Purpose:** User authentication and account recovery.
- **URL Route:** /login (sign-in.html), /register, /forgot-password
- **Who can access it:** Unauthenticated users.
- **Entry points:** Landing Page, forced redirect from protected routes.
- **Exit points:** Dashboard (on success), Landing Page.
- **Related API endpoints:** POST /api/auth/login, POST /api/auth/register
- **Error state:** Invalid credentials, account locked.

## Dashboard
- **Purpose:** Central hub for authenticated users to view recent activity and initiate uploads.
- **URL Route:** /dashboard (dashboard.html)
- **Who can access it:** Authenticated users.
- **Entry points:** Login, Sidebar.
- **Exit points:** Upload Document, Document Analysis, Dictionary, Settings.
- **Expected data:** Recent documents list, usage statistics.
- **Empty state:** "No documents analyzed yet. Upload your first document."
- **Error state:** Failed to fetch history.

## Upload Document
- **Purpose:** Interface for uploading legal documents for AI analysis.
- **URL Route:** /upload (upload-document.html)
- **Who can access it:** Authenticated users (or Free Trial users via a specific flow).
- **Entry points:** Dashboard.
- **Exit points:** Document Analysis, Dashboard (Cancel).
- **Related API endpoints:** POST /api/documents/upload
- **Possible loading state:** Upload progress bar, "Extracting Text..." spinner.

## Document Analysis
- **Purpose:** Displays the AI-generated summary, extracted clauses, and risk insights.
- **URL Route:** /analysis/:id (nalysis-commercial-lease.html)
- **Who can access it:** Authenticated user who owns the document.
- **Entry points:** Upload Success, Dashboard (Recent Documents).
- **Exit points:** Dashboard, Dictionary (via term click).
- **Related API endpoints:** GET /api/documents/:id, POST /api/translate
- **Possible loading state:** Skeleton UI while Gemini API processes the document.

## Document History
- **Purpose:** A paginated list of all previously uploaded documents.
- **URL Route:** /documents
- **Who can access it:** Authenticated users.
- **Entry points:** Sidebar.
- **Exit points:** Document Analysis.
- **Related API endpoints:** GET /api/documents

## Legal Dictionary
- **Purpose:** Searchable glossary of legal terminology.
- **URL Route:** /dictionary (legal-dictionary.html)
- **Who can access it:** Authenticated users.
- **Entry points:** Sidebar, Inline links from Document Analysis.
- **Expected data:** List of terms and definitions.
- **Empty state:** "No results found for '[Search Term]'."

## Profile / Settings
- **Purpose:** User account management.
- **URL Route:** /settings
- **Who can access it:** Authenticated users.

## Admin Dashboard / Admin Users / Admin Documents / Admin Analytics
- **Purpose:** Platform management, monitoring user activity, and system health.
- **URL Route:** /admin/* (dmin-portal.html)
- **Who can access it:** Authenticated Admins (ole === 'admin').
- **Related API endpoints:** GET /api/admin/users, GET /api/admin/stats

## 404 / 500 Error / Maintenance Mode
- **Purpose:** Graceful error handling for missing pages, server crashes, or planned downtime.
- **URL Route:** Wildcard / System Intercept.
- **Who can access it:** Anyone.
- **Exit points:** Back to Home / Dashboard.

------------------------------------------------------------

# Authentication Flow

Visitor
↓
Landing Page
↓
Clicks "Sign In"
↓
Login Screen (sign-in.html)
↓
Submits valid credentials (POST /api/auth/login)
↓
JWT Token received and stored (localStorage/HTTP-only cookie)
↓
Redirected to Dashboard (dashboard.html)
↓
Clicks "Logout" in Sidebar
↓
Token cleared locally & session invalidated
↓
Redirected to Landing Page

*Redirects:* 
- Unauthenticated user attempting to access /dashboard is redirected to /login.
- Authenticated user attempting to access /login is redirected to /dashboard.

------------------------------------------------------------

# Core User Journey 1: Citizen Uploads a Legal Document

1. **User Action:** Clicks "Upload" in the Sidebar or "Browse Files" on the Dashboard.
2. **Screen Visited:** Upload Document (upload-document.html).
3. **User Action:** Drags and drops a 2MB PDF rental agreement.
4. **Expected Response:** File validation passes (size/type). UI shows the file queued.
5. **User Action:** Clicks "Start Analysis".
6. **Expected Response:** UI changes to a loading state (Spinner + "Extracting text..."). API call (POST /api/documents/upload) is made.
7. **Screen Visited:** Document Analysis (nalysis-commercial-lease.html).
8. **Expected Response:** Skeleton loaders display while Gemini AI processes the text. Once complete, the Summary, Clauses, and Risks are populated.
9. **User Action:** Reviews the highlighted "Termination Clause" risk.

------------------------------------------------------------

# Core User Journey 2: Lawyer Reviews Previous Documents

1. **User Action:** Logs into the platform.
2. **Screen Visited:** Dashboard (dashboard.html).
3. **User Action:** Scrolls to "Recent Documents" or clicks "My Documents" in the sidebar.
4. **Expected Response:** API (GET /api/documents) returns a list of past documents. UI renders a list/grid.
5. **User Action:** Clicks "Review Findings" on a specific document from last week.
6. **Screen Visited:** Document Analysis (nalysis-commercial-lease.html).
7. **Expected Response:** UI immediately renders the cached AI analysis from the database without re-triggering the Gemini API.

------------------------------------------------------------

# Core User Journey 3: User Translates a Legal Document

1. **User Action:** Viewing a completed Document Analysis screen.
2. **User Action:** Clicks the "Translate to Hindi" toggle/button in the top right of the analysis card.
3. **Expected Response:** UI displays a localized loading spinner over the text.
4. **User Action:** (System calls POST /api/translate).
5. **Expected Response:** The text smoothly transitions from English to Hindi. The user can toggle back to English instantly (cached locally).

------------------------------------------------------------

# Core User Journey 4: User Searches Legal Terminology

1. **User Action:** Reads the phrase "Force Majeure" in their document analysis and does not understand it.
2. **User Action:** Clicks on the highlighted term, OR clicks "Dictionary" in the sidebar and types "Force Majeure".
3. **Screen Visited:** Legal Dictionary (legal-dictionary.html) or an inline modal overlay.
4. **Expected Response:** UI displays a plain-English definition, an example of how it's used in Indian law, and a Hindi translation of the concept.

------------------------------------------------------------

# Core User Journey 5: Administrator Manages Platform Users

1. **User Action:** Logs in with Admin credentials.
2. **Screen Visited:** Admin Dashboard (dmin-portal.html).
3. **Expected Response:** API (GET /api/admin/stats) fetches aggregate data. UI shows total users, total documents processed, and API health.
4. **User Action:** Navigates to the "Users" tab.
5. **Expected Response:** Views a list of registered users. Can click "Disable Account" for suspicious activity.

------------------------------------------------------------

# Document Upload Flow

- **Drag & Drop:** Visual cue (border highlight) when a file hovers over the drop zone.
- **Validation:** Frontend instantly rejects non-PDF/DOCX files or files >10MB with a red warning toast.
- **Upload Progress:** A progress bar fills from 0-100% as the multipart form data uploads to the server.
- **Success:** Green checkmark, followed by automatic redirect to the Analysis screen.
- **Failure:** Red error toast detailing the issue (e.g., "Network error", "File corrupted").
- **Retry:** A "Try Again" button appears replacing the progress bar.
- **Unsupported File:** Rejected instantly on the frontend.
- **Large File:** Rejected instantly on the frontend with "Maximum file size is 10MB".
- **Expired Session:** API returns 401 Unauthorized during upload. User is shown a "Session Expired" modal and redirected to Login.

------------------------------------------------------------

# AI Processing Flow

1. **Uploading:** File is moving from client to server. UI: Progress bar.
2. **Queued:** Server acknowledges receipt and queues parsing. UI: "Preparing document..."
3. **Processing:** Node.js extracts text via pdf-parse. UI: "Extracting text..."
4. **Summary Generated:** Gemini API returns the executive summary. UI: Skeleton for summary is replaced with actual text.
5. **Translation Generated:** (If requested) Translation API processes the summary. UI: Skeleton loader in the translation tab.
6. **Insights Generated:** Clauses and risks are extracted. UI: Risk cards populate one by one.
7. **User Reviews Results:** Processing complete. UI: "Export as PDF" button becomes active.

------------------------------------------------------------

# Dashboard Behavior

- **First-time user:** Sees an empty state for Recent Documents with a prominent "Upload your first document" call-to-action. Guided tour tooltips may appear.
- **Returning user:** Sees a populated list of Recent Documents, a usage progress bar (e.g., "3 of 10 free documents used"), and legal tips of the day.
- **Free Trial user:** Similar to returning user, but with a banner urging them to "Upgrade to Premium" once they hit their limit.
- **Authenticated user:** Standard experience.
- **Admin:** Sees a different sidebar containing "Admin Portal" links.

------------------------------------------------------------

# Notifications

- **Success:** Green toast (e.g., "Document uploaded successfully", "Settings saved"). Auto-dismisses in 3 seconds.
- **Warning:** Yellow toast (e.g., "You have 1 free analysis remaining").
- **Error:** Red toast (e.g., "Failed to connect to the server"). Requires manual dismissal.
- **AI Processing Complete:** A push notification or badge on the bell icon if the user navigated away from the analysis screen during processing.
- **Upload Failed:** Red toast explicitly stating why (e.g., "File too large").
- **Session Expired:** A persistent modal interrupting the UI, forcing a redirect to the login page.

------------------------------------------------------------

# Loading States

- **Skeletons:** Used primarily on the Dashboard (for document history) and the Analysis Screen (while waiting for Gemini API responses) to prevent layout shift.
- **Progress Bars:** Used exclusively during file uploads to represent binary data transfer.
- **Spinners:** Used inside buttons (e.g., replacing the "Sign In" text with a spinner while authenticating).
- **Lazy Loading:** Document history lists lazy-load images/icons and implement infinite scrolling or pagination for performance.

------------------------------------------------------------

# Empty States

- **No Documents:** "You haven't analyzed any documents yet. Drag and drop a file to get started." (Accompanied by an illustration).
- **No Search Results:** "We couldn't find any documents matching '[Query]'. Try adjusting your filters."
- **No Notifications:** "You're all caught up!"
- **No History:** "Your activity history is empty."

------------------------------------------------------------

# Error States

- **Network Failure:** "You appear to be offline. Please check your connection."
- **Backend Offline:** "Our servers are currently unreachable. We are working on it."
- **MongoDB Failure:** Handled gracefully on the backend, surfaces as a 500 Error to the user.
- **Gemini Failure:** "AI processing is currently delayed. Your document is safe and will be analyzed shortly."
- **Unauthorized:** "You do not have permission to view this document."
- **404:** "Page Not Found. The legal document or page you are looking for doesn't exist." (With a button back to Dashboard).
- **500:** "Internal Server Error. Something went wrong on our end."
- **Timeout:** "The request took too long. Please try again."
- **Rate Limit:** "You've made too many requests. Please try again in 15 minutes." (429 Too Many Requests).

------------------------------------------------------------

# Responsive Behaviour

- **Desktop:** Full sidebar always visible. Complex data (like clause extraction) shown side-by-side with the document text.
- **Tablet:** Sidebar collapses into a minimized icon-only state. Modals take up 80% of the screen.
- **Mobile:** Sidebar disappears entirely, replaced by a hamburger menu. Complex split-screen views collapse into a single stacked column (document text on top, AI analysis below). Buttons expand to 100% width for touch targets.

------------------------------------------------------------

# Accessibility Requirements

- **Keyboard Navigation:** All interactive elements (<a>, <button>, inputs) must be focusable via the Tab key in a logical DOM order.
- **Screen Readers:** Uses semantic HTML (<nav>, <main>, <aside>). Images have lt tags.
- **Focus States:** Clearly visible focus rings (e.g., Tailwind ocus:ring-2 focus:ring-primary) on all inputs and buttons.
- **ARIA Guidelines:** Use ria-expanded for dropdowns, ria-live="polite" for AI processing status updates.
- **Color Contrast:** All text must maintain a minimum 4.5:1 contrast ratio against its background (WCAG AA).

------------------------------------------------------------

# Future Navigation Expansion

The sidebar architecture is designed for vertical scalability. New modules (e.g., "Compare Documents", "Team Collaboration") can be added as new list items in the sidebar without breaking the layout. The top navigation is reserved for global actions (Search, Profile) to ensure it does not become cluttered as features are added.
