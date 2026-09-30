# Render Deployment Guide

This document outlines the exact steps required to deploy the NyayaSetu V2 backend to Render using the GitHub repository.

## 1. Repository Configuration
- **Source**: Connect your GitHub repository `thereyatharva99/NyayaSetu`
- **Branch**: `main`

## 2. Web Service Setup
When creating a new Web Service in Render, configure the following settings:

- **Name**: `nyayasetu-backend` (or your preferred name)
- **Environment**: `Node`
- **Root Directory**: `Code/BackEnd/backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

> [!WARNING]
> The `render.yaml` file in the repository is missing the `rootDir` specification. If you deploy using the `render.yaml` Blueprint, it might execute commands in the repository root (where there is no package.json). It is highly recommended to deploy via the **Render Web Dashboard (New Web Service)** manually and explicitly set the **Root Directory** to `Code/BackEnd/backend`.

## 3. Environment Variables
You must add the following environment variables in the Render dashboard:

| Key | Description | Example / Note |
| --- | --- | --- |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | The port for the server | `5000` (Render will automatically bind to this) |
| `MONGO_URI` | MongoDB Atlas Connection String | Must include credentials (`mongodb+srv://...`) |
| `JWT_SECRET` | Secret key for JWT | A strong random string |
| `JWT_EXPIRE` | Expiry time for tokens | `30d` |
| `GEMINI_API_KEY` | Google Gemini API Key | The newly generated active key |
| `GEMINI_MODEL` | The specific model to use | `gemini-flash-latest` (Optional, defaults to this) |
| `ALLOWED_ORIGINS` | CORS allowed frontend URLs | `https://your-future-vercel-app.vercel.app` (Add Vercel URL later) |

> [!IMPORTANT]
> Do **NOT** commit your actual `.env` file to GitHub. Add these variables securely through the Render dashboard only.

## 4. CORS Considerations
Currently, `ALLOWED_ORIGINS` defaults to local Vercel/Vite ports (`localhost:5173`). Once you deploy the frontend to Vercel, you **must** update the `ALLOWED_ORIGINS` environment variable in Render to include your Vercel production URL.

## 5. Post-Deployment Verification
Once Render marks the deployment as "Live", verify it by visiting the health endpoint in your browser:
`https://<your-render-app-url>/api/health`

**Expected Output:**
```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 12.34,
  "memory": { ... }
}
```

If `db: "disconnected"` appears, check your MongoDB Network Access IP allowlist (allow `0.0.0.0/0` for Render) and the `MONGO_URI` variable.
