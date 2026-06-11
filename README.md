# The Sugar Story — Premium Artisan Bakery Storefront

 An international luxury patisserie and artisan bakery storefront styled in the spirit of **Aesop**, **Ladurée**, and **Magnolia Bakery**. 

---

## 🛠️ Technology Stack
* **Backend**: FastAPI (Python) + MongoDB (Motor Async Client)
* **Frontend**: React + Vite + TailwindCSS
* **Payments**: Razorpay

---

## 🚀 Local Setup Instructions

### 1. Prerequisites
* **Python 3.10+**
* **Node.js 20+**
* **MongoDB** (running locally or via docker-compose)

### 2. Database Setup
Start MongoDB database with Docker:
```bash
docker compose up -d
```

### 3. Backend Setup (FastAPI)
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   python3 -m pip install -r requirements.txt --break-system-packages
   ```
3. Set your environment variables in `.env` (copy from `.env.example` at the root):
   ```bash
   # Set at least the following:
   MONGO_URI="mongodb://admin:adminpassword@localhost:27017/sugarstory_db?authSource=admin"
   ADMIN_PASSWORD="YourSecurePasswordHere"
   ```
4. Start the backend on port `8000`:
   ```bash
   uvicorn main:app --port 8000 --reload
   ```
   The backend API will be available at `http://localhost:8000`.

### 4. Frontend Setup (React + Vite)
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Boot the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend UI will be available at `http://localhost:3000`.

---

## 🔒 Security & Administration
To log into Chef Shalini's Admin Portal, set the `ADMIN_PASSWORD` environment variable in your server environment (or local `.env`). There is no hardcoded default fallback.

---

## 🌐 Production Deployment

### 1. Backend Service (e.g. Railway, Render)
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT` (managed via `backend/Procfile`)
- **Required Env Variables**:
  - `MONGO_URI`: Connection string to your MongoDB Atlas cluster.
  - `RAZORPAY_KEY_ID`: Razorpay API Key ID.
  - `RAZORPAY_KEY_SECRET`: Razorpay API Key Secret.
  - `ADMIN_PASSWORD`: Authentication password to secure the Admin dashboard.
  - `ALLOWED_ORIGINS`: Comma-separated origins allowed to request the API (e.g. `https://your-frontend.vercel.app`).

### 2. Frontend Service (e.g. Vercel, Netlify)
- **Build Command**: `npm run build` (produces compile assets inside `dist/` directory)
- **Required Env Variables**:
  - `VITE_API_URL`: Live public endpoint of your backend (e.g. `https://your-backend.railway.app`).
  - `VITE_RAZORPAY_KEY_ID`: Same Razorpay API Key ID used on the backend.
