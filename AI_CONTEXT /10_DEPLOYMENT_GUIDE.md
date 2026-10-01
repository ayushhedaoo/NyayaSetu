# Deployment Guide: NyayaSetu V2

This document provides a comprehensive handbook for deploying the NyayaSetu application from development to production.

---

## 1. Development Environment
- **Requirements:** Node.js (v18+), npm/yarn, Git.
- **Frontend:** Run 
pm run dev in Code/FrontEnd/frontend. Served via Vite on http://localhost:5173.
- **Backend:** Run 
pm run dev in Code/BackEnd/backend. Served via Nodemon on http://localhost:5000.
- **Database:** Uses a standard MongoDB Atlas connection string.

## 2. Production Environment Overview
NyayaSetu V2 utilizes a decoupled deployment strategy:
- **Frontend:** Vercel (Edge CDN, static hosting).
- **Backend:** Render (Web Service, Node.js environment).
- **Database:** MongoDB Atlas (Managed Cloud Database).

---

## 3. MongoDB Atlas Setup
1. Create an M0/M10 Cluster.
2. Create a Database User with read/write privileges.
3. **Network Access:** Under Network Access, whitelist the static IP addresses of the Render deployment, or temporarily allow .0.0.0/0 if Render IP isn't static.
4. Retrieve the standard connection string (mongodb://...). Do not use +srv if DNS issues persist.

## 4. Render Backend Deployment
1. Connect Render to the GitHub repository.
2. Create a new "Web Service".
3. **Root Directory:** Code/BackEnd/backend
4. **Build Command:** 
pm install
5. **Start Command:** 
pm start (which runs 
ode server.js)
6. **Environment Variables:** Map all required variables (see Section 6).

## 5. Vercel Frontend Deployment
1. Connect Vercel to the GitHub repository.
2. Create a new Project.
3. **Root Directory:** Code/FrontEnd/frontend
4. **Framework Preset:** Vite
5. **Build Command:** 
pm run build
6. **Output Directory:** dist

---

## 6. Environment Variables
### Backend (Render)
- NODE_ENV: production (Required)
- PORT: 5000 (Optional, Render overrides this)
- MONGO_URI: mongodb://... (Required)
- JWT_SECRET: [Complex cryptographic string] (Required)
- JWT_EXPIRE: 30d (Optional)
- GEMINI_API_KEY: AIzaSy... (Required)
- GEMINI_MODEL: gemini-2.5-flash (Optional)

### Frontend (Vercel)
- VITE_API_URL: https://nyayasetu-api.onrender.com/api (Required)

---

## 7. Security & Configuration
- **Secrets Management:** Never commit .env files. Use Render and Vercel dashboards to manage secrets.
- **CORS Configuration:** The backend server.js MUST restrict CORS to the Vercel production URL before going live.
  `javascript
  app.use(cors({ origin: 'https://nyayasetu.vercel.app', credentials: true }));
  `
- **Custom Domains & SSL:** Handled automatically by Vercel (Frontend) and Render (Backend). SSL certificates are auto-renewed via Let's Encrypt.

---

## 8. Monitoring & Maintenance
- **Health Checks:** Implement GET /api/health on the backend. Render automatically pings this to ensure the instance is alive.
- **Logging:** Monitor backend logs directly in the Render dashboard.
- **Rollback Strategy:** Both Render and Vercel support instant 1-click rollbacks to previous successful deployments.
- **CI/CD:** Pushes to the main branch automatically trigger Vercel and Render deployments. Ensure tests pass in GitHub Actions before merging to main.

---

## 9. Deployment Verification Checklist
- [ ] Frontend successfully resolves on Vercel domain.
- [ ] Backend health endpoint returns 200 OK.
- [ ] CORS allows frontend to communicate with backend.
- [ ] Document upload succeeds (Testing local /uploads permissions on Render).
- [ ] Gemini API successfully returns an analysis.

---

## 10. Common Deployment Issues & Troubleshooting
- **Error:** ECONNREFUSED or Mongoose Timeout on Backend.
  - *Fix:* Ensure MongoDB Network Access whitelists Render's IPs. Check standard vs +srv URI format.
- **Error:** 413 Payload Too Large on Upload.
  - *Fix:* Ensure Express ody-parser and multer limits are configured correctly.
- **Error:** CORS Blocked on Frontend.
  - *Fix:* Verify VITE_API_URL exactly matches the backend URL (no trailing slash).
