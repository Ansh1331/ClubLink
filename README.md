# 🏫 Club Link – College Club Recruitment Platform

**Club Link** is a MERN stack-based platform designed to simplify the recruitment and application process for college clubs. It provides an end-to-end solution for students to apply to clubs and for recruiters to manage applicants efficiently — all in a sleek, responsive interface.

---

## 📸 Project Preview

<!-- Replace the link below with your actual image/GIF link -->
<p align="center">
  <img src="https://i.ibb.co/xtMQG80C/Screenshot-2025-06-26-161512.png" alt="Club Link Preview" width="100%" />
</p>

---

## ✨ Features

### 🎯 Student Functionality
- Browse available club roles across categories
- Apply to positions with tailored portfolio/resume
- Manage and update user profile
- Track application statuses

### 🧑‍💼 Club Recruiter Dashboard
- Post new club roles with deadlines and descriptions
- View and manage received applications
- Preview student portfolios and resumes
- Mark applicants as shortlisted/rejected

### 🖥️ UI & UX
- Fully responsive interface for mobile and desktop
- Clean design powered by Tailwind CSS
- Seamless user navigation between sections

---

## 🧑‍💻 Tech Stack

| Category       | Technology                  |
|----------------|------------------------------|
| Frontend       | React, Tailwind CSS          |
| Backend        | Node.js, Express.js          |
| Database       | MongoDB                      |
| Authentication | Clerk                        |
| Full Stack     | MERN (MongoDB, Express, React, Node) |

---

## 📂 Folder Structure (Simplified)

```
/client             → React frontend (student & recruiter views)
/server             → Express backend API
/models             → Mongoose schemas (User, Application, Role)
/routes             → Backend route controllers
/middleware         → Clerk auth & request handlers
```

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/club-link.git
cd club-link
```

### 2. Install Dependencies

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd ../server
npm install
```

---

### 3. Environment Setup

Create a `.env` file in `/server` and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-db-uri>
CLERK_SECRET_KEY=your-clerk-secret-key
```

Create a `.env` in `/client`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_API_URL=http://localhost:5000
```

---

### 4. Run the App Locally

**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) for the client  
and [http://localhost:5000](http://localhost:5000) for the API

---

## 🚀 Deployment

You can deploy the client on **Vercel** and the server on **Render** / **Railway**.  
Ensure to set environment variables on both platforms for production.

---

## 🧠 Future Enhancements

- Notification system for application updates
- Club-specific branding and themes
- Resume auto-scoring and filters
- Admin dashboard to onboard new clubs

---

## 🧑‍💼 Author

Made with 💙 by **Ansh Singhal**
