# Engineering Principles: NyayaSetu

This document defines the core philosophy and guiding principles of engineering at NyayaSetu. It serves as the ideological foundation for every technical decision, architecture design, and line of code written by human engineers or AI assistants.

---

## 1. Engineering Vision
NyayaSetu’s engineering vision is to build a robust, scalable, and highly available platform that seamlessly connects complex legal intelligence with everyday usability. We aim to construct systems that are as transparent and dependable as the laws they seek to clarify.

## 2. Product Philosophy
Technology exists to serve the user, not the engineer. Every technical choice must directly improve the citizen's ability to understand their legal documents or the lawyer's ability to process cases faster. If a complex technical solution does not translate into user value, it is discarded.

## 3. Software Architecture Philosophy
We favor decoupled, modular, and stateless architectures. Monoliths are avoided in favor of separation of concerns (e.g., static UI vs. REST API vs. Background Workers). Architecture should be predictable, boring, and highly scalable.

## 4. Frontend Philosophy
The frontend is a dumb, fast presentation layer. It must be strictly component-based (React), utilizing utility-first CSS (Tailwind) for consistent styling. It should never contain heavy business logic; it exists to consume APIs and render states (Loading, Error, Success) flawlessly.

## 5. Backend Philosophy
The backend is the authoritative source of truth. It must be thin at the controller level, pushing logic to isolated services. It must be entirely stateless, relying on JWTs, allowing it to scale horizontally without sticky sessions. 

## 6. Database Philosophy
Data is our most valuable asset. Schemas must be flexible enough to handle unstructured AI output but strict enough to maintain data integrity. We rely on MongoDB for its document model, heavily indexing query paths, and never hard-deleting records (soft deletes only).

## 7. API Philosophy
APIs must be strictly RESTful, versioned (e.g., /api/v1/), and aggressively documented. They must fail gracefully, returning standardized JSON error payloads rather than HTML stack traces.

## 8. Security Philosophy
Security is implemented in depth. We operate on a zero-trust model: the frontend cannot be trusted. All inputs are sanitized, JWTs must be secure (moving toward HTTP-only cookies), rate limits are globally enforced, and secrets are strictly managed outside of version control.

## 9. Accessibility Philosophy
Accessibility is a right, not a feature. We build to WCAG 2.1 AA standards from day one. High contrast ratios, ARIA labels, and keyboard navigability are non-negotiable requirements for merging PRs.

## 10. Performance Philosophy
We optimize for perceived performance. Synchronous blocking operations (like heavy PDF parsing) must be offloaded to background queues (BullMQ). The UI must implement Skeleton loaders and optimistic updates to feel instantaneous, even when AI generation takes seconds.

## 11. Maintainability Philosophy
Code is read far more often than it is written. We optimize for readability over cleverness. Consistent naming conventions, strict folder structures, and comprehensive inline documentation are required.

## 12. Scalability Philosophy
We scale horizontally. By keeping the API stateless and moving file storage to the cloud (AWS S3) rather than the local filesystem, we ensure we can spin up infinite Node.js instances to handle spikes in traffic without architectural bottlenecks.

## 13. Testing Philosophy
Untested code is broken code. We rely on automated end-to-end tests for critical user journeys and unit tests for core utilities (like the AI prompt generators). Manual QA acts as a final sanity check, not the primary defense.

## 14. Documentation Philosophy
Documentation is treated as a first-class citizen alongside code. The AI_CONTEXT folder is the source of truth. Any architectural change requires updating the Master Prompt and Technical Requirements.

## 15. Deployment Philosophy
Deployments should be boring, automated, and reversible. We rely on CI/CD pipelines (Vercel, Render) that build from main. We must always have a 1-click rollback strategy if a critical bug hits production.

## 16. AI Integration Philosophy
AI is a tool, not a human. We assume AI (Gemini) will occasionally hallucinate or fail. Therefore, prompts must force structured JSON outputs, and the UI must heavily disclaim that the insights do not constitute legal advice.

## 17. Developer Experience Philosophy
Developers should focus on solving legal tech problems, not fighting the environment. Local setup must be possible with 
pm run dev, and CI pipelines must run fast.

## 18. Code Quality Philosophy
We adhere strictly to DRY (Don't Repeat Yourself) and SOLID principles. We use linters and formatters (ESLint/Prettier) to automate style debates so engineers can focus on logic.

## 19. Open Source Philosophy
Where possible, we rely on battle-tested open-source libraries rather than reinventing the wheel. We give back by contributing bug fixes to the tools we rely on.

## 20. Long-Term Maintenance Philosophy
We build systems intended to last a decade. This requires regular dependency audits, aggressively retiring deprecated code, and avoiding obscure framework specific lock-ins.

---

## Decision-Making Framework
When faced with a technical dilemma, we evaluate choices based on:
1. Does it solve the user's problem?
2. Is it secure?
3. Is it maintainable by a junior engineer?
4. Is it scalable?

## Technical Debt Strategy
Technical debt is acceptable only when explicitly documented and attached to a Jira/GitHub ticket with a planned refactor date. Undocumented debt is a critical failure.

## Refactoring Strategy
Refactoring is continuous. The Boy Scout Rule applies: always leave the codebase cleaner than you found it. Major refactors must be proposed via an Implementation Plan in AI_CONTEXT.

## Release Strategy
We release early and often. Semantic versioning dictates our releases. Features are merged to main continuously, leveraging feature flags if a feature is incomplete.

## Risk Management
We identify Single Points of Failure (SPOFs). By decoupling the frontend, backend, and background workers, we isolate faults.

## Disaster Recovery Philosophy
We assume servers will burn down. The database is backed up daily, and infrastructure is defined as code (or easily replicable via PaaS configurations) so the entire platform can be rebuilt from scratch in under 4 hours.

## Future Evolution
NyayaSetu will evolve from a simple summarization tool into a multi-lingual, voice-enabled enterprise intelligence platform. Our architecture must remain flexible enough to incorporate new AI models (e.g., swapping Gemini for a specialized Legal LLM) without rewriting the core application.

---

# The Twenty Engineering Commandments

These rules are absolute. Any engineer or AI coding assistant working on NyayaSetu MUST adhere to them.

1. **Thou shalt not break the decoupled architecture; keep the frontend and backend physically separate.**
2. **Thou shalt not write heavy business logic in the React frontend.**
3. **Thou shalt not block the Node.js event loop with heavy file parsing.**
4. **Thou shalt force AI models to return structured JSON, never raw Markdown, to the UI.**
5. **Thou shalt never trust user input; validate everything on the backend.**
6. **Thou shalt never store secrets or API keys in the codebase.**
7. **Thou shalt ensure every UI state (Loading, Empty, Error, Success) is explicitly handled.**
8. **Thou shalt design mobile-first; complex legal UI must gracefully collapse on small screens.**
9. **Thou shalt use the established Design System (colors, fonts, spacing) and never invent new tokens.**
10. **Thou shalt strictly adhere to RESTful naming conventions for APIs.**
11. **Thou shalt use express-async-handler instead of raw try/catch blocks in Express routes.**
12. **Thou shalt not mutate state directly in React.**
13. **Thou shalt not use console.log in production code.**
14. **Thou shalt make all interactive UI elements keyboard accessible (WCAG AA).**
15. **Thou shalt return standardized JSON error codes from the backend, not HTML.**
16. **Thou shalt rely on stateless JWTs, not server-side sessions.**
17. **Thou shalt soft-delete data rather than hard-deleting it from MongoDB.**
18. **Thou shalt write small, atomic git commits.**
19. **Thou shalt update the AI_CONTEXT documentation whenever architecture changes.**
20. **Thou shalt always include a clear disclaimer that NyayaSetu does not provide legal advice.**
