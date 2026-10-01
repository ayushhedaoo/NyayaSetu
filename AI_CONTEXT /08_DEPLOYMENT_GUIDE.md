# Deployment Guide
## Environment Configuration
The backend requires a .env file at Code/BackEnd/backend/.env with the following variables:
`env
PORT=5000
MONGO_URI=mongodb://... (Standard MongoDB connection string)
JWT_SECRET=...
JWT_EXPIRE=30d
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
NODE_ENV=development
`

## Running the Application Locally
1. **Start the Backend:**
   - Navigate to Code/BackEnd/backend
   - Run 
pm run dev
   - Needs active network access to MongoDB Atlas (whitelist IP if ECONNREFUSED error occurs).

2. **Start the Frontend:**
   - Navigate to Code/FrontEnd/frontend
   - Run 
pm run dev
   - Opens the static HTML UI at http://localhost:5173/

In a production environment (NODE_ENV=production), the backend is configured to serve static assets from ../frontend/dist on port 5000.
