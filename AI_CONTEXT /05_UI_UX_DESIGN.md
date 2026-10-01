# Design Philosophy

The visual direction of NyayaSetu Version 2 is designed to evoke **Trust, Clarity, Professionalism**, and **Modern Legal Technology**. By abandoning the dense, overwhelming interfaces typical of legacy legal software, NyayaSetu adopts a clean, spacious, and highly legible design.

- **Trust:** Established through a conservative, authoritative color palette (deep ink blues and muted emeralds) and high-quality serif typography for headings.
- **Clarity:** Achieved via ample whitespace, distinct visual hierarchy, and the ento-grid layout for complex analysis.
- **Accessibility:** High contrast ratios, large tap targets, and legible sans-serif body fonts ensure the platform is usable by all citizens.

------------------------------------------------------------

# Brand Identity

- **Product Personality:** Authoritative yet approachable; like a highly competent, patient legal advisor.
- **Brand Voice:** Objective, precise, reassuring.
- **Writing Tone:** Professional but avoiding unnecessary jargon. Translating legalese into plain English/Hindi.
- **Microcopy Style:** Direct and action-oriented (e.g., "Upload Document" instead of "Click here to submit your file").
- **Legal Disclaimer Style:** Prominent, objective, and distinct from analysis (usually placed in muted text or specific warning blocks).
- **Error Messaging Style:** Empathetic and instructional (e.g., "File too large. Please upload a document smaller than 10MB.").
- **Success Messaging Style:** Brief and reassuring (e.g., "Analysis Complete.").

------------------------------------------------------------

# Color System

Extracted directly from the Stitch configuration:

- **Primary Colors:**
  - primary: #00152a (Deep Ink Blue)
  - on-primary: #ffffff
  - primary-container: #102a43
- **Secondary Colors:**
  - secondary: #006a66 (Muted Emerald / Legal Green)
  - on-secondary: #ffffff
  - secondary-container: #96efe9
- **Accent/Tertiary Colors:**
  - 	ertiary: #1f1200
  - 	ertiary-container: #392500
- **Feedback Colors:**
  - error: #ba1a1a
  - on-error: #ffffff
  - error-container: #ffdad6
  - *(Recommendation: Define explicit Success (#147D78) and Warning (#E8A317) tokens for future use).*
- **Background/Surface Colors:**
  - ackground: #fbf9f4 (Warm Ivory)
  - surface: #fbf9f4
  - surface-container: #f0eee9
  - surface-container-low: #f5f3ee
  - surface-container-high: #eae8e3
- **Text/Content Colors:**
  - on-surface: #1b1c19 (Near Black)
  - on-surface-variant: #43474d (Dark Gray)
  - outline: #74777e

*Note: The current Stitch implementation focuses heavily on Light Mode. A dark mode palette is partially defined but requires further engineering before production release.*

------------------------------------------------------------

# Typography

- **Primary Font (Body/Labels):** Plus Jakarta Sans (Clean, modern sans-serif for high legibility).
- **Secondary Font (Headings):** Source Serif 4 (Authoritative serif for legal context).
- **Fallback Fonts:** sans-serif, serif.

## Typographic Scale:
- **Display Large:** 48px / 56px line-height (Weight: 700) - Source Serif 4
- **Display Medium:** 36px / 44px line-height (Weight: 700) - Source Serif 4
- **Headline Large:** 28px / 36px line-height (Weight: 600) - Source Serif 4
  - *(Mobile: 24px / 32px line-height)*
- **Body Large:** 18px / 28px line-height (Weight: 400) - Plus Jakarta Sans
- **Body Medium (Default):** 16px / 24px line-height (Weight: 400) - Plus Jakarta Sans
- **Label Medium:** 14px / 20px line-height (Weight: 600, Tracking: 0.05em) - Plus Jakarta Sans
- **Caption:** 12px / 16px line-height (Weight: 400) - Plus Jakarta Sans

------------------------------------------------------------

# Spacing System

The layout utilizes a strict spatial rhythm defined in the configuration:

- **unit:** 8px (Base grid)
- **stack-sm:** 8px
- **stack-md:** 16px
- **gutter:** 24px
- **stack-lg:** 32px
- **margin-mobile:** 16px
- **margin-desktop:** 40px
- **container-max:** 1280px

------------------------------------------------------------

# Border Radius System

NyayaSetu favors slightly rounded, friendly corners to offset the harshness of legal documents.

- **DEFAULT:** 0.25rem (4px) - Used for inputs and checkboxes.
- **lg:** 0.5rem (8px) - Used for buttons, small cards, and dialogs.
- **xl:** 0.75rem (12px) - Used for primary dashboard cards and bento-grid modules.
- **full:** 9999px - Used for avatars, badges, and pill-shaped tags.

------------------------------------------------------------

# Shadows

- **Hover Effects:** Utilizes the custom .hover-lift class:
  - 	ransform: translateY(-2px)
  - ox-shadow: 0 4px 12px rgba(16, 42, 67, 0.05)
- **Elevation:** Minimal static shadows. Depth is primarily communicated through background color contrasts (e.g., #fbf9f4 vs #ffffff).

------------------------------------------------------------

# Iconography

- **Icon Library:** Google Material Symbols Outlined.
- **Sizes:** Standard 24px (	ext-2xl), large 36px (	ext-3xl), small 16px inside buttons.
- **Usage Rules:** Icons are used to support text, never as the sole descriptor of a complex legal action (except standard UI patterns like close, back, or user profile).

------------------------------------------------------------

# Button System

- **Primary:** g-[#00152a] text-white rounded-lg px-6 py-2.5 font-label-md
- **Secondary (Action):** g-[#E8A317] text-[#102A43] (Often used for "New Analysis").
- **Ghost/Outline:** order border-primary text-primary hover:bg-surface-container-low (Used for "Cancel" or secondary actions).
- **Focus State:** Custom .focus-ring class (ing-2 ring-[#147D78] ring-offset-2).

------------------------------------------------------------

# Form Components

- **Inputs/Textareas:** 1px solid border (order-outline-variant), rounded (lg), with g-surface-container-lowest (white).
- **Upload Areas:** Dashed border (order-2 border-dashed border-outline-variant), centered text and icon, changing background on hover.

------------------------------------------------------------

# Navigation Components

- **Sidebar:** Fixed width (64 units/256px), g-surface-container. Houses primary navigation links using a flex column layout. Links feature an active state (bold, highlighted icon).
- **Top Navbar:** Reserved for Global Search and Profile dropdown.
- **Tabs:** Used on the Analysis screen (e.g., "English | Hindi" toggle). Implemented with a bottom border highlight for the active state (order-b-2 border-[#147D78]).

------------------------------------------------------------

# Dashboard Components

- **Cards:** Bento-grid style layout. White background (surface-container-lowest), rounded xl, separated by gutter spacing (24px).
- **Recent Documents:** Rendered as a list inside a card, utilizing a flex layout for document name, date, and "Review" action button.
- **Statistics:** Highlighted numerals using display-md or headline-lg.

------------------------------------------------------------

# AI Components

- **Risk Indicator:** Standardized alert block inside the analysis view. Red/Yellow accents with a warning icon to draw immediate attention to liabilities.
- **Key Clause Card:** Discrete blocks of text separated from the main document flow, identifying standard contract elements (e.g., "Termination").
- **Translation Toggle:** A highly visible tab or toggle switch that triggers the Hindi translation state.

------------------------------------------------------------

# Upload Experience

- **Drag & Drop Zone:** Visually distinct large dashed area.
- **Action Buttons:** "Cancel" (Ghost) and "Start Analysis" (Primary).
- *(Recommendation: Implement a dedicated linear progress bar component that appears immediately upon clicking "Start Analysis").*

------------------------------------------------------------

# Feedback Components

- *(Recommendation: The static UI currently lacks standardized Toast Notifications. Future engineering should implement a fixed bottom-right container for success/error snackbars).*
- **Skeleton Loaders:** To be implemented during API fetches, utilizing a pulsating animation on background colors (g-surface-variant animate-pulse).

------------------------------------------------------------

# Motion Design

- **Hover Animations:** 	ransition-colors, 	ransition-transform duration-200 (.hover-lift).
- **Sidebar:** Fixed, no animation currently implemented for mobile toggling.
- *(Recommendation: Keep all animations under 300ms. Legal software should feel snappy, not floaty).*

------------------------------------------------------------

# Responsive Design Rules

- **Desktop (>1024px):** Fixed sidebar on the left, main content constrained to max-w-7xl or fluid within the remaining viewport.
- **Tablet (768px - 1024px):** Main content fluid. Sidebar may collapse to icons only.
- **Mobile (<768px):** Sidebar hidden (accessible via hamburger menu). Multi-column bento grids collapse to a single column stack (lex-col).

------------------------------------------------------------

# Accessibility

- **Contrast Ratios:** The primary color (#00152a) against the surface (#fbf9f4) far exceeds WCAG AA standards.
- **Focus Rings:** Explicitly defined custom class .focus-ring.
- *(Recommendation: Engineers must ensure ria-labels are added to all icon-only buttons before production release).*

------------------------------------------------------------

# Content Guidelines

- **Legal Language:** Avoid utilizing purely legal terms without a plain-English tooltip or dictionary link.
- **Empty State Copy:** Always guide the user to the next action (e.g., "Upload a document to see insights").
- **Headings:** Use Sentence case for readability.

------------------------------------------------------------

# Future Design Expansion

When adding new modules (e.g., Document Comparison), designers must utilize the existing Bento-grid card structure (white cards on warm ivory background) and rely on the established spatial rhythm (gutter, stack-md). Do not introduce new font families.

------------------------------------------------------------

# Design Principles

1. **Accessibility First:** Contrast, focus states, and readability trump aesthetic flourishes.
2. **Plain Language:** The design must support the translation of complex ideas into simple concepts.
3. **Respect the Spatial Rhythm:** Always use the defined 8px grid tokens (stack-sm, stack-md, gutter).
4. **Use Color with Purpose:** Reserve Primary Blue for core branding, Emerald Green for primary actions/success, and Red explicitly for severe risk/errors.
5. **Embrace the Bento Grid:** Group related information into distinct, rounded cards to prevent cognitive overload.
6. **Limit Font Weights:** Stick to Regular (400) for body and Semi-bold/Bold (600/700) for headings.
7. **No Floating Modals for Complex Tasks:** Multi-step workflows (like uploading) should be dedicated pages, not modals.
8. **Consistent Button Hierarchy:** A page should have only one Primary button.
9. **Indicate Status Clearly:** AI processing must always show a clear visual indicator that the system is working.
10. **Design for Mobile First:** Ensure complex document split-views collapse gracefully on small screens.
