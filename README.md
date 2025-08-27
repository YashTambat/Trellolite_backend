
---

## 📌 For **Backend Repo** (`Trellolite_backend`)

Create a `README.md` in your **backend repo** with this content:

```markdown
# Trellolite Backend

This is the **backend** of the Trellolite project – a lightweight Trello-style task and project management application.  
It is built with **Node.js, Express, and MongoDB**, and deployed on **Render**.

## 🌐 API Base URL
👉 [Trellolite Backend (Render)](https://trellolite-backend.onrender.com/api)

## 🔑 Features
- User Authentication (JWT-based login/signup)
- Admin APIs for project and team management
- Task CRUD operations
- Role-based access (Admin, Team Member)
- Secure password hashing with bcrypt
- Cron jobs for scheduled tasks

## 🛠️ Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password security
- Render for deployment

## 📦 Installation (Local Setup)
```bash
# Clone the repo
git clone https://github.com/YashTambat/Trellolite_backend.git

# Navigate into folder
cd Trellolite_backend

# Install dependencies
npm install

# Setup environment variables (.env)
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
PORT=5000

# Start the server
npm run dev
