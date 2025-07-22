# 📚 BookStack

A full-stack web application that allows users to browse, read, and manage books by adding them to their personal library. Built with **React**, **Redux**, **Tailwind CSS** on the frontend, and **Node.js**, **Express.js**, and **MongoDB** on the backend. PDF files are stored and served using **Supabase Storage**.

### 🔗 Live Demo
👉 [Visit BookStack](https://book-stack-gamma.vercel.app/)  
📂 [View GitHub Repository](https://github.com/amanhere-01/BookStack)

---

## 🚀 Features

- 🔐 User authentication and role-based authorization (JWT)
- 📖 Add books to personal library and read them online
- 📤 Upload and store book PDFs using Supabase (Only Admin)
- 🌐 RESTful API integration for all backend operations
- 📱 Fully responsive UI with Tailwind CSS
- 🔄 Global state management using Redux Toolkit

---

## 🛠️ Tech Stack

### Frontend:
- React
- Redux Toolkit
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Supabase Storage

---

## 📦 Installation & Setup

### 🔧 Prerequisites
- React.js
- Node.js & npm
- MongoDB Atlas 
- Supabase 

```bash
# Clone the repository
git clone https://github.com/amanhere-01/BookStack.git
cd BookStack

# Frontend Setup
cd client
npm install
npm start

# In new terminal Setup Backend
cd server
npm install
npm run dev

# Create .env file in /server directory with the following:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# SUPABASE_URL=your_supabase_project_url
# SUPABASE_KEY=your_supabase_anon_key
