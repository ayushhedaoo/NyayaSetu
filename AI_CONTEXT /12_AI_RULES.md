# AI Coding Rules: NyayaSetu

This document defines **50 permanent rules** for all AI coding assistants, agents, and LLMs working on the NyayaSetu codebase.

## Architectural Integrity
1. **Never rewrite the project.** Always work within the established V2 architecture.
2. **Never rename core folders.** (Code/FrontEnd, Code/BackEnd) without explicit user approval.
3. **Always preserve API compatibility.** Do not change JSON response schemas that the frontend relies on.
4. **Never break existing endpoints.** Add /v2/ routes if breaking changes are required.
5. **Follow the Decoupled Architecture.** Do not attempt to merge the React frontend and Express backend into a monolith.
6. **Stateless Backend.** Never introduce server-side sessions; always use JWT.
7. **No UI in Backend.** The backend must only return JSON, never HTML.
8. **No Business Logic in UI.** The frontend must only handle presentation and API calling.
9. **Respect the TRD.** Always refer to 3_TECHNICAL_REQUIREMENTS.md before making architectural decisions.
10. **Maintain Deployment Compatibility.** Ensure code works on Vercel (Edge) and Render (Node container).

## Code Quality & Standards
11. **Always test before completing tasks.** (If automated testing is available in context).
12. **Preserve coding standards.** Use camelCase for variables and PascalCase for React components.
13. **Keep commits small.** (When summarizing work, group by feature).
14. **Never introduce unnecessary dependencies.** Do not add NPM packages if native JS/React can solve it easily.
15. **Explain architectural changes.** Always document *why* a change was made in the PR/Artifact.
16. **Use ES6+ Syntax.** Prefer const/let, arrow functions, and destructuring.
17. **Async/Await over Promises.** Use sync/await exclusively in controllers.
18. **Use express-async-handler.** Never write raw 	ry/catch blocks in Express controllers unless specifically catching a localized error.
19. **Single Responsibility Principle.** Keep React components under 300 lines.
20. **Avoid Magic Strings/Numbers.** Extract them to constants.

## UI/UX & Frontend Rules
21. **Respect the Design Bible.** Always refer to 5_UI_UX_DESIGN.md.
22. **Do not invent new colors.** Only use the HEX codes defined in the Design System.
23. **Prefer reusable components.** Do not hardcode a button; use <Button />.
24. **Maintain accessibility.** Always add ria-labels to icon-only buttons.
25. **Responsive First.** Ensure Tailwind classes account for md: and lg: breakpoints.
26. **Avoid inline styles.** Use Tailwind classes exclusively.
27. **Consistent Spacing.** Rely on the 8px grid (e.g., gap-4, p-8).
28. **Handle Loading States.** Always implement Skeleton loaders when fetching data.
29. **Handle Empty States.** Never show a blank screen if an array is empty.
30. **Handle Error States.** Always catch API errors and display a toast notification.

## Backend & Database Rules
31. **Thin Controllers.** Controllers handle HTTP; Services handle logic.
32. **Use Mongoose strictly.** Define explicit schemas; do not use Strict: false unless absolutely necessary.
33. **Index queries.** Ensure fields used in .find() or .findOne() are indexed.
34. **Never log secrets.** Do not console.log passwords, API keys, or JWTs.
35. **Sanitize Inputs.** Prevent NoSQL injection.
36. **Paginate large queries.** Never return all documents at once (limit and skip).
37. **Graceful Shutdown.** Ensure Node process cleans up DB connections on exit.
38. **Use multer securely.** Strictly enforce file size limits and MIME types.
39. **Delete Temporary Files.** Always s.unlinkSync files in /uploads after parsing.
40. **Offload Heavy Processing.** Be aware that pdf-parse blocks the event loop.

## AI & Gemini Integration
41. **Strict Prompts.** Always force Gemini to return structured JSON.
42. **No Legal Advice.** Always append disclaimers to AI outputs.
43. **Handle Timeouts.** AI APIs fail; implement retry logic or graceful degradation.
44. **Cache Responses.** Save Gemini outputs to MongoDB to prevent redundant billing.
45. **Do not invent AI capabilities.** Only implement features explicitly requested.

## General Collaboration
46. **Always update documentation.** If you change an API, update the README or AI_CONTEXT.
47. **Do not hallucinate files.** Only read and edit files that actually exist in the workspace.
48. **Ask for Clarification.** If a requirement contradicts the PRD, ask the user before writing code.
49. **Clean up after yourself.** Remove console.log and temporary debug code before finalizing.
50. **Respect Product Requirements.** Ensure all features align with 2_PRODUCT_REQUIREMENTS.md.
