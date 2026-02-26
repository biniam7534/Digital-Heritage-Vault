# 🚀 Deployment Guide

This project is split into a **Frontend (React)** and a **Backend (Node.js/Express)**.

## 1. Backend Deployment (e.g., [Render.com](https://render.com))

1.  **Create a New Web Service**: Connect your GitHub repository.
2.  **Root Directory**: Set this to `Backend`.
3.  **Build Command**: `npm install`
4.  **Start Command**: `node server.js`
5.  **Environment Variables**:
    *   `MONGO_URI`: Your MongoDB Atlas connection string.
    *   `PORT`: `5000` (Render will handle this automatically, but good to have a default).
    *   `NODE_ENV`: `production`

---

## 2. Frontend Deployment (e.g., [Vercel](https://vercel.com) or [Netlify](https://netlify.com))

1.  **Create a New Project**: Connect your GitHub repository.
2.  **Root Directory**: Set this to `Frontend`.
3.  **Framework Preset**: Select **Vite**.
4.  **Environment Variables**:
    *   `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://your-backend.onrender.com/api/v1`). **Crucial for data to load.**
5.  **Build & Deploy**: Vercel will automatically run `npm run build`.

---

## 3. Post-Deployment Check

1.  **CORS**: The Backend is configured to allow all origins (`cors()`), so it will work with any frontend domain.
2.  **Images**: Since images are in `Frontend/public/images`, they will be served directly by your frontend host at `https://your-frontend.vercel.app/images/...`.

---

## 🗺️ Local Production Test

To test the production build locally:
1.  `cd Frontend`
2.  `npm run build`
3.  `npm run preview`
This will serve the optimized bundle. Ensure your Backend is running!
