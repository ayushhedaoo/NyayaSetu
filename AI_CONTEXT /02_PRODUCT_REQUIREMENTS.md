# Product Overview
- **Product Name:** NyayaSetu Version 2
- **Tagline:** Bridging the Gap Between Complex Legal Jargon and Everyday Understanding.
- **Elevator Pitch:** NyayaSetu is a modern LegalTech platform designed for the Indian context that leverages generative AI to translate, summarize, and demystify complex legal documents. By extracting key clauses, highlighting critical obligations, and providing plain-language explanations, NyayaSetu empowers citizens, legal professionals, and NGOs to navigate the legal landscape with confidence and efficiency.

# Vision
To democratize legal literacy in India by making legal documents universally accessible, comprehensible, and transparent for everyone, regardless of their legal background or primary language.

# Mission
To provide a secure, fast, and highly accurate AI-driven platform that reduces the time and cost associated with legal document review, while ensuring users are aware of critical risks and obligations.

# Problem Statement
Legal documents are inherently complex, dense, and written in archaic terminology that is inaccessible to the average citizen. This complexity creates an asymmetry of information where individuals are often forced to sign contracts, leases, and agreements without fully understanding their rights or the liabilities they are assuming. For legal professionals, manually reviewing lengthy documents for standard clauses is time-consuming and inefficient.

# Value Proposition
NyayaSetu eliminates the friction of legal document review. For citizens, it acts as an accessible digital paralegal that breaks down contracts into plain English (or Hindi). For professionals, it serves as an efficiency multiplier that instantly extracts key clauses, dates, and potential risks, allowing them to focus on high-value legal strategy rather than manual reading.

# Target Users

## Citizens
- **Goals:** Understand what they are signing (e.g., rental agreements, employment contracts) without paying expensive consultation fees.
- **Pain Points:** Intimidating legal jargon, fear of hidden clauses, language barriers (English-only documents).
- **Expected Benefits:** Plain-language summaries, highlighted risks, and translation to Hindi for better comprehension.

## Lawyers
- **Goals:** Quickly review bulk documents, extract standard clauses, and identify anomalies or missing protections.
- **Pain Points:** Time spent on repetitive reading, missing minor but critical details in hundreds of pages.
- **Expected Benefits:** Rapid extraction of dates, obligations, and liabilities, allowing them to handle more cases efficiently.

## Law Students
- **Goals:** Learn practical contract structure, analyze real-world agreements, and understand complex legal phrasings.
- **Pain Points:** Gap between academic theory and practical, dense commercial contracts.
- **Expected Benefits:** The Legal Dictionary and clause detection act as study aids to connect terminology with actual usage.

## NGOs
- **Goals:** Assist vulnerable populations with legal disputes, land rights, or labor contracts.
- **Pain Points:** Limited resources and high caseloads; clients often bring documents in languages they don't understand.
- **Expected Benefits:** Bulk processing capabilities, rapid translation, and clear risk highlighting to quickly assess a client's situation.

## Government & Legal Aid Organizations
- **Goals:** Improve access to justice and speed up the processing of citizen grievances.
- **Pain Points:** Backlog of documents, lack of standardized summarization.
- **Expected Benefits:** Standardized, objective summaries of incoming petitions or agreements to triage cases effectively.

# Core Features

- **Secure Authentication:** JWT-based login and registration system protecting user data and document history.
- **Dashboard:** A central hub where users can view recent analyses, track their usage, and access quick actions like uploading a new document.
- **Document Upload:** A drag-and-drop interface supporting PDF and DOCX formats (up to 10MB), with immediate feedback on processing status.
- **AI Document Analysis:** Integration with Google Gemini AI to read the extracted text and process it against legal-specific prompts.
- **AI Summarization:** Generation of a concise, plain-language executive summary of the entire document.
- **Clause Extraction:** Automatic identification and categorization of standard legal clauses (e.g., Force Majeure, Termination, Indemnity).
- **Key Insights:** Extraction of critical metadata such as effective dates, parties involved, and financial obligations.
- **Hindi ↔ English Translation:** The ability to translate the document summary and key clauses into Hindi to bridge the language barrier.
- **Legal Dictionary:** A searchable glossary of complex legal terms linked directly to the context in which they appear in the user's document.
- **Document History:** A secure archive of previously uploaded documents and their analyses, allowing users to revisit past results.
- **Admin Dashboard:** A separate portal for platform administrators to monitor overall usage, manage users, and view system health.
- **Usage Tracking:** Monitoring API calls and document uploads to enforce rate limits and potential premium subscription tiers.

# AI Capabilities
*Note: NyayaSetu assists in understanding legal documents and does not replace qualified legal advice.*

- **Summarization:** The AI distills multi-page documents into a 1-2 page plain-language overview, highlighting the core purpose of the agreement.
- **Translation:** Utilizing AI to accurately translate legal concepts (not just literal translations) between English and Hindi.
- **Legal terminology explanation:** The AI acts as a contextual dictionary, explaining archaic terms (e.g., "mutatis mutandis", "in perpetuity") in simple language based on how they are used in the specific document.
- **Document intelligence:** The AI structures unstructured text, separating preamble, covenants, representations, and signatures.
- **Clause detection:** The AI flags standard clauses and compares them against typical legal standards to ensure they are present and normally structured.
- **Important dates and obligations:** The AI parses out strict timelines, renewal dates, and payment milestones, presenting them in a structured list.
- **Risk highlighting:** The AI detects unusually broad indemnities, one-sided termination rights, or abnormal liabilities and flags them for the user's attention.

# Functional Requirements

- **Auth Module:** Users must be able to register, log in, and securely maintain a session via HTTP-only JWT or local storage tokens.
- **Upload Module:** The system must accept multipart/form-data, validate file types (PDF/DOCX), and reject files over 10MB. It must extract text synchronously or asynchronously and store the raw text securely.
- **Analysis Module:** The system must send the extracted text to the Gemini API using heavily engineered prompts. It must handle API timeouts, rate limits, and partial failures gracefully, returning structured JSON to the frontend.
- **Dashboard Module:** Must fetch a paginated list of the user's past documents and render them. Clicking a document must load the nalysis-commercial-lease.html (or equivalent dynamic view) populated with that document's data.
- **Admin Module:** Must require an isAdmin flag in the JWT. It should aggregate MongoDB counts for users and documents.

# Non Functional Requirements

- **Performance:** Text extraction and initial AI processing should return a result within 15 seconds. If longer, a web-socket or polling mechanism should be implemented.
- **Security:** Documents must be stored securely in MongoDB. Passwords must be hashed using bcrypt. CORS must be strictly locked down to the frontend domain.
- **Scalability:** The architecture must allow the Node.js backend to scale horizontally. Document parsing (mammoth/pdf-parse) should not block the main event loop under heavy load.
- **Accessibility:** The UI must meet WCAG 2.1 AA standards, ensuring high contrast, screen reader compatibility, and keyboard navigation.
- **Reliability:** The system must handle Google Gemini API outages gracefully, allowing users to queue documents for later processing.
- **Maintainability:** The codebase must follow a strict MVC pattern on the backend and a component-based architecture on the frontend.

# Competitive Advantages
- **Localized for India:** Specific focus on translating complex English legal concepts into accessible Hindi.
- **Modern UX:** A beautiful, responsive, and intuitive interface (Stitch/Tailwind) that abstracts away the complexity of traditional LegalTech tools.
- **Speed:** Direct integration with Gemini 2.5 Flash for near-instantaneous document comprehension.

# Version 2 Improvements

- **UI improvements:** Moving from the legacy, clunky React application to a sleek, modern, Tailwind-powered design system with a professional color palette.
- **Backend improvements:** Decoupled architecture allowing the API to scale independently. Better error handling (express-async-handler) and rate limiting implementation.
- **Deployment improvements:** Moving away from a monolithic deployment to hosting the static frontend on edge networks (Vercel) and the API on a scalable PaaS (Render).
- **Security improvements:** Implementation of Helmet.js, strict rate limiting, and robust JWT expiration policies.
- **User experience improvements:** Clearer visual hierarchy for "Risk Highlighting" and "Clause Detection" using the new bento-grid UI design.

# Features Removed From Version 1
- **Monolithic Architecture:** The old MERN structure where React and Express were tightly coupled in a single deployable unit is removed to allow independent scaling and distinct deployment pipelines.
- **Legacy UI Components:** The old React component library is entirely scrapped in favor of the new Stitch-generated HTML/Tailwind design to ensure a premium, modern look and feel.
- **Synchronous Heavy Parsing (Planned Removal):** Moving away from parsing massive PDFs on the main Express thread to prevent server crashing during high traffic.

# Future Roadmap
- **Q1:** Implement asynchronous background queues (BullMQ) for document parsing.
- **Q2:** Introduce multi-document comparison (e.g., comparing an old lease to a new lease).
- **Q3:** Add regional languages beyond Hindi (Marathi, Tamil, Bengali).
- **Q4:** Develop a Chrome Extension for analyzing legal terms directly on web pages (e.g., Terms of Service agreements).

# Success Metrics

- **Technical metrics:**
  - 99.9% API Uptime.
  - Average document processing time < 10 seconds.
  - Zero unhandled promise rejections or out-of-memory crashes during parsing.
- **User metrics:**
  - 30% month-over-month growth in active users.
  - Average of 3 documents analyzed per active user per week.
  - > 80% completion rate from document upload to viewing the final analysis.
- **Business metrics:**
  - Conversion of 5% of free-trial users to a premium subscription (once implemented).
  - High Net Promoter Score (NPS) among legal professionals.

# Legal Disclaimer
NyayaSetu is a technology platform designed to assist users in understanding the structure and general meaning of legal documents. **NyayaSetu does not provide legal advice.** The AI-generated summaries, translations, and risk highlights are for informational purposes only and should not be relied upon as a substitute for professional legal counsel. Always consult a qualified attorney before signing any legal binding agreement.

# Deployment Vision
- **Frontend:** Vercel (for global edge caching, fast static delivery, and seamless CI/CD).
- **Backend:** Render (for scalable Node.js hosting, easy environment variable management, and automated deployments).
- **Database:** MongoDB Atlas (for managed, scalable, and secure NoSQL cloud storage).

# Business Vision
NyayaSetu aims to become the definitive LegalTech SaaS platform in India. By bridging the gap between archaic legal structures and the modern citizen, NyayaSetu will evolve from a simple summarization tool into an indispensable legal companion. Ultimately, the platform envisions partnering with law firms, real estate agencies, and government bodies to standardize and streamline contract review across the subcontinent, making legal transparency the default standard, not a luxury.
