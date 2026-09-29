# NyayaSetu V2 Deployment Checklist

This document outlines the standard operating procedure (SOP) for deploying NyayaSetu Version 2 to production environments.

## 1. Database Provisioning (MongoDB Atlas)
- [ ] Create a new production cluster in MongoDB Atlas.
- [ ] Whitelist the Render application IP addresses in the Network Access tab (or allow `0.0.0.0/0` temporarily during initial setup).
- [ ] Create a dedicated database user with read/write access.
- [ ] Copy the connection string (URI) and replace `<username>` and `<password>`.

## 2. Backend Deployment (Render)
- [ ] Connect your GitHub repository to Render and create a new **Web Service**.
- [ ] Set the Root Directory to `Code/BackEnd/backend`.
- [ ] Confirm Build Command: `npm install`.
- [ ] Confirm Start Command: `npm start`.
- [ ] Navigate to the **Environment** tab and inject the following secrets:
  - `NODE_ENV` = `production`
  - `PORT` = `5000`
  - `MONGO_URI` = *(From Step 1)*
  - `JWT_SECRET` = *(Generate a secure 64-character random string)*
  - `JWT_EXPIRE` = `30d`
  - `GEMINI_API_KEY` = *(Your Google AI Studio API Key)*
  - `ALLOWED_ORIGINS` = *(Your Vercel URL, e.g., https://nyayasetu.vercel.app)*
- [ ] Deploy the service and monitor the build logs.
- [ ] **Health Check:** Once deployed, navigate to `https://<render-url>/api/health` to verify JSON uptime status.

## 3. Frontend Deployment (Vercel)
- [ ] Connect your GitHub repository to Vercel and import a new project.
- [ ] Set the Root Directory to `Code/FrontEnd/react-frontend`.
- [ ] Confirm Framework Preset is automatically detected as `Vite`.
- [ ] Navigate to the **Environment Variables** tab and inject:
  - `VITE_ENVIRONMENT` = `production`
  - `VITE_API_URL` = *(Your Render URL, e.g., https://nyayasetu-api.onrender.com/api)*
- [ ] Deploy the service.
- [ ] **Smoke Test:** Navigate to the generated Vercel URL. Attempt to register a test user, log in, and upload a small document.

## 4. Post-Deployment (DNS & HTTPS)
- [ ] (Future) Configure custom domains in Vercel and Render.
- [ ] Verify that SSL/TLS certificates are automatically provisioned and strictly enforced.
- [ ] Update `ALLOWED_ORIGINS` in Render if a custom domain is mapped to the Vercel frontend.

## 5. Rollback Plan
- [ ] In the event of a catastrophic build failure on Render, navigate to the **Deploys** tab and click **Rollback to this deploy** on the previous stable build.
- [ ] In Vercel, navigate to the **Deployments** tab, select the previous stable build, and click **Promote to Production**.
- [ ] If database corruption occurs, utilize MongoDB Atlas **Cloud Backups** to restore the cluster to a point-in-time snapshot.
