# Master Prompt: NyayaSetu V2 AI Assistant Guide

This document is the permanent instruction manual for any AI coding assistant, LLM, or agent working on the NyayaSetu project. **You must read and strictly adhere to these instructions before executing any task.**

---

## Project Identity
**NyayaSetu Version 2** is a decoupled, modern LegalTech platform designed to democratize legal literacy in India. It utilizes a React-based frontend (hosted on Vercel), a Node/Express REST API (hosted on Render), and a MongoDB Atlas database to securely upload, parse, and analyze dense legal documents. By integrating with Google Gemini AI, NyayaSetu extracts key clauses, highlights critical risks, and translates complex legalese into accessible plain English and Hindi, acting as a digital paralegal for citizens, lawyers, and NGOs.

---

## Required Reading Order
Before undertaking any major feature development or refactoring, you MUST review the context of the project by reading the following documentation files in this exact order:

1. 1_PROJECT_AUDIT.md
2. 2_PRODUCT_REQUIREMENTS.md
3. 3_TECHNICAL_REQUIREMENTS.md
4. 4_APP_FLOW.md
5. 5_UI_UX_DESIGN.md
6. 6_BACKEND_ARCHITECTURE.md
7. 7_DATABASE_ARCHITECTURE.md
8. 8_FRONTEND_ARCHITECTURE.md
9. 9_IMPLEMENTATION_PLAN.md
10. 10_DEPLOYMENT_GUIDE.md
11. 11_TESTING_CHECKLIST.md
12. 12_AI_RULES.md
13. 13_CHANGELOG.md
14. 14_PROJECT_ROADMAP.md

---

## Before Writing Code
- **Always analyze existing code.** Do not start writing or editing until you fully grasp how the module currently functions.
- **Never assume functionality.** Verify how the API actually responds, not how you think it should respond.
- **Never rewrite without reason.** Only refactor if it explicitly solves a bug or fulfills a requirement from the TRD.
- **Always preserve compatibility.** Ensure that any changes to the backend do not break existing frontend data expectations.
- **Understand dependencies.** Check package.json before introducing new libraries. Rely on existing tools first.
- **Review APIs before changing them.** Understand the expected request body, response JSON structure, and authentication requirements.
- **Review database models before editing.** Ensure any changes to Mongoose schemas account for existing documents in production.

---

## Development Workflow
When given a task, follow this exact sequence:
1. **Think:** Understand the user's intent.
2. **Analyze:** Read the relevant codebase files and contextual documents.
3. **Plan:** Formulate a step-by-step approach.
4. **Explain:** Communicate your plan clearly before modifying code.
5. **Implement:** Write clean, modular, and adhering code.
6. **Test:** Verify the changes do not break existing logic.
7. **Document:** Update any affected READMEs or AI_CONTEXT files.
8. **Commit:** (If applicable) Keep changes atomic and well-summarized.

---

## Code Modification Rules
- **Never modify unrelated files.** Stick strictly to the scope of the assigned task.
- **Never delete features without approval.** Deprecation requires explicit user consent.
- **Never change APIs without documenting.** Any change to route paths or JSON signatures must be reflected in 3_TECHNICAL_REQUIREMENTS.md.
- **Never break authentication.** JWT flows and protected route middleware are critical.
- **Never break deployment.** Ensure changes are compatible with Vercel edge networks and Render environments.
- **Never remove accessibility.** Preserve ria-labels, focus states, and semantic HTML.

---

## Documentation Rules
Every completed feature or significant bug fix must result in updates to:
- 9_IMPLEMENTATION_PLAN.md (Mark tasks as complete).
- 11_TESTING_CHECKLIST.md (Add new QA steps if applicable).
- 13_CHANGELOG.md (Log the addition, modification, or fix).

---

## Testing Rules
Every feature must pass testing before being considered complete.
- Verify UI states (Loading, Empty, Error, Success).
- Ensure error boundaries catch failures gracefully.
- Validate API endpoints reject malformed data securely.

---

## Deployment Rules
Maintain absolute compatibility with the production infrastructure:
- **MongoDB Atlas:** Do not introduce queries that exhaust memory or bypass indexing.
- **Render:** Ensure the backend remains stateless. Do not rely on local disk storage beyond ephemeral parsing (use cloud storage or clean up immediately).
- **Vercel:** Ensure the frontend builds successfully without Rollup/Vite errors. Do not leak environment variables to the client payload.

---

## Definition of Done
A task is only considered **Finished** when:
1. The code implements the requested feature fully.
2. The UI matches the specifications in the 5_UI_UX_DESIGN.md.
3. The API adheres to 3_TECHNICAL_REQUIREMENTS.md.
4. Error states, Loading states, and Edge cases are handled gracefully.
5. The AI_CONTEXT documentation is updated.
6. The codebase builds successfully for production deployment without errors.
