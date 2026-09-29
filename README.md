# NyayaSetu Version 2 - Automated Legal Document Analyzer

NyayaSetu is an advanced, AI-powered platform designed to simplify complex legal documents. Built for users who need quick, actionable insights from legal contracts, it leverages state-of-the-art Generative AI (Google Gemini) to instantly extract clauses, identify liabilities, and provide plain-language summaries of complex legal jargon.

---

## 🌟 Features

- **AI-Powered Summarization:** Upload a legal document and receive a concise, plain-language summary of the entire contract.
- **Risk Identification:** Automatically identifies potential liabilities, obligations, and critical dates hidden in the document.
- **Bilingual Support (Hindi & English):** Seamlessly translate complex English legal clauses into understandable Hindi.
- **Legal Dictionary integration:** Instantly look up complex legal terminology directly within the UI.
- **Document History & Analytics:** A robust dashboard to manage your past uploads, track analysis status, and monitor your usage.
- **Admin Portal:** Secure administration interface to monitor system health, user activity, and document processing queues.

---

## 🏗 Architecture & Tech Stack

The application has been engineered using a decoupled, API-first architecture designed for massive scalability:

### Frontend (Client-Side)
- **Framework:** React 19 (via Vite)
- **Styling:** TailwindCSS with a bespoke, accessible design system ("Stitch" visual language)
- **Routing:** React Router v7
- **Deployment:** Vercel (Static Site Generation / SPA)

### Backend (Server-Side)
- **Runtime:** Node.js / Express
- **Database:** MongoDB Atlas (Mongoose ODM)
- **AI Integration:** `@google/generative-ai` (Gemini Pro)
- **File Parsing:** `pdf-parse`, `mammoth` (for DOCX)
- **Deployment:** Render (Web Service)

---

## 📂 Folder Structure

```
├── AI_CONTEXT/                  # Engineering context, specifications, and architecture documents
├── Code/
│   ├── BackEnd/
│   │   └── backend/             # Express.js REST API
│   │       ├── controllers/     # Business logic
│   │       ├── models/          # MongoDB Schemas
│   │       ├── routes/          # API endpoints
│   │       └── middleware/      # JWT Auth & Error handling
│   └── FrontEnd/
│       └── react-frontend/      # Vite + React Application
│           ├── src/
│           │   ├── components/  # Reusable UI components
│           │   ├── pages/       # React Router page views
│           │   └── context/     # Global state management
│           └── public/          # Static assets
└── Dummy_Documents/             # Test documents for local validation
```

---

## 🚀 Installation & Local Development

### 1. Clone the repository
```bash
git clone <repository-url>
cd NyayaSetu-Automated_Legal_Document_Analyzer
```

### 2. Backend Setup
```bash
cd Code/BackEnd/backend
npm install
```
Create a `.env` file in the `backend` directory (refer to `.env.example`) and start the dev server:
```bash
npm run dev
```
*The API will be available at `http://localhost:5000`*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Code/FrontEnd/react-frontend
npm install
```
Create a `.env` file in the `react-frontend` directory (refer to `.env.example`) and start the Vite server:
```bash
npm run dev
```
*The Application will be available at `http://localhost:5173`*

---

## ☁️ Production Deployment

NyayaSetu is pre-configured for modern PaaS deployment.

- **Frontend (Vercel):** The repository includes a `vercel.json` file designed to build `Code/FrontEnd/react-frontend` and serve the `dist` directory with correct SPA routing fallbacks.
- **Backend (Render):** The repository includes a `render.yaml` blueprint to automatically provision the Node.js backend environment.
- **Database (MongoDB Atlas):** Ensure your Atlas cluster IP Access List allows connections from your Render deployment IP.

*For a detailed production release guide, refer to `DEPLOYMENT_CHECKLIST.md`.*

---

## 🔐 Security & Authentication
- **JWT Based Auth:** Secure HTTP-only compatible token architecture.
- **Rate Limiting:** Global rate limiters applied, with strict brute-force protection applied to `/api/auth`.
- **Sanitization:** Helmet, MongoSanitize, and XSS-Clean active on all backend ingress points.

---

## 📄 License
This project is proprietary. All rights reserved.
