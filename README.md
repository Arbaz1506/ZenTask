# ZenTask
Got it! Here's a **single, ready-to-copy-paste README.md** for ZenTask **without screenshots**, clean and professional:

````markdown
# ZenTask

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)  
[![Vite](https://img.shields.io/badge/Vite-4.4.9-success)](https://vitejs.dev/)  
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blueviolet)](https://tailwindcss.com/)  

> ZenTask is a modern, sleek, and intuitive task management web application built with React, Vite, and TailwindCSS. Designed to help users organize, track, and accomplish tasks efficiently, with a focus on simplicity and productivity.

---

## ✨ Features

- **User Authentication:** Secure signup/login with JWT token-based authentication.  
- **Dashboard:** Overview of tasks with filtering, searching, and sorting options.  
- **Task CRUD:** Create, read, update, and delete tasks effortlessly.  
- **Task Details:** View complete information about each task.  
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile.  
- **Glasmorphic UI:** Modern and elegant glasmorphic-inspired interface.  
- **Notifications:** Alerts and messages for important task updates.  
- **Backend Ready:** Fully compatible with Node.js + Express API.

---

## 🚀 Tech Stack

| Frontend | Backend | Database | Styling |
|----------|---------|----------|---------|
| React 18 | Node.js + Express | MongoDB / Optional | TailwindCSS + Glasmorphism |
| Vite | JWT Auth | Mongoose | Custom Animations |
| React Router | Axios | | Responsive Layouts |

---

## ⚡ Getting Started

### Prerequisites

- Node.js >= 18.x  
- npm >= 9.x  
- MongoDB (or any database setup you prefer)

---

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Arbaz1506/ZenTask.git
cd ZenTask
````

2. **Backend Setup:**

```bash
cd backend
npm install
```

* Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

* Run backend:

```bash
npm run dev
```

3. **Frontend Setup:**

```bash
cd ../frontend/task-manager
npm install
```

* Run frontend:

```bash
npm run dev
```

4. **Access the app**
   Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
ZenTask/
├─ backend/                # Node.js + Express backend
│  ├─ controllers/         # API logic
│  ├─ middlewares/         # Auth & error handling
│  ├─ models/              # Mongoose models
│  └─ routes/              # API routes
├─ frontend/
│  └─ task-manager/        # React frontend
│     ├─ src/
│     │  ├─ components/    # Reusable components
│     │  ├─ pages/         # Route pages
│     │  ├─ context/       # Context API for global state
│     │  ├─ hooks/         # Custom hooks
│     │  └─ utils/         # Helper functions
│     ├─ public/           # Static files (favicon, images)
│     └─ vite.config.js    # Vite config
└─ README.md
```

---

## 🛠️ Available Scripts

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build production-ready frontend
npm run preview  # Preview production build
```

### Backend

```bash
npm run dev      # Start backend server with nodemon
npm start        # Start backend server
```

---

## 🔐 Authentication Flow

1. User signs up / logs in.
2. Backend generates JWT token.
3. Frontend stores token securely (localStorage/sessionStorage).
4. Token sent with requests to protected routes (tasks, dashboard).
5. User can logout to clear token.

---

## 🌐 Deployment

* **Frontend:** Vercel / Netlify (React SPA)
* **Backend:** Render / Railway / Heroku
* **Database:** MongoDB Atlas or self-hosted

> **Vercel SPA tip:** Add `vercel.json` inside `task-manager/`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📦 Dependencies

**Frontend:**

* `react`, `react-dom`, `react-router-dom`
* `axios`
* `tailwindcss`, `postcss`, `autoprefixer`

**Backend:**

* `express`, `cors`, `dotenv`
* `mongoose`
* `jsonwebtoken`, `bcryptjs`

---

## 💡 Future Enhancements

* Dark mode toggle
* Drag-and-drop task reordering
* Task priority and deadlines
* Real-time updates with WebSocket
* Notifications and reminders

---

## 🤝 Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: my feature"`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

* [React](https://reactjs.org/) – UI library
* [Vite](https://vite.dev/) – Frontend tooling
* [TailwindCSS](https://tailwindcss.com/) – Styling framework
* [MongoDB](https://www.mongodb.com/) – Database
* [Node.js & Express](https://expressjs.com/) – Backend API

```

---

If you want, I can also make a **“GitHub portfolio ready” version** with **badges, colored sections, and live demo links** so it literally looks premium and professional.  

Do you want me to do that?
```
