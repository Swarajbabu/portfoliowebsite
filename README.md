# 🚀 Swaraj's MERN + Convex Portfolio

<div align="center">

![Portfolio](https://img.shields.io/badge/Portfolio-MERN%20%2B%20Convex-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express)
![Convex](https://img.shields.io/badge/Convex-1.33-FF6B35?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-16%2B-339933?style=for-the-badge&logo=nodedotjs)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)

**A fully dynamic, admin-managed personal portfolio built with a modern full-stack.**

[Live Site](https://swarajvecha.in) · [Backend API](https://portfolio-backend.onrender.com/api/health) · [Admin Panel](#-admin-panel)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started Locally](#-getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Routes](#-api-routes)
- [Convex Database Schema](#-convex-database-schema)
- [Admin Panel](#-admin-panel)
- [Deployment](#-deployment)
  - [Frontend — Vercel](#frontend--vercel)
  - [Backend — Render](#backend--render)
  - [Database — Convex Cloud](#database--convex-cloud)
- [Scripts Reference](#-scripts-reference)
- [Folder Structure Deep Dive](#-folder-structure-deep-dive)

---

## 🌟 Overview

This is a **full-stack personal portfolio website** for Swaraj Babu Vecha. It is fully dynamic — all content (hero text, skills, projects, education, training, certificates, contact info, resume, and footer) is managed through a private **Admin Panel** and stored in **Convex** (a real-time cloud database). The site reflects changes instantly without requiring a redeploy.

The backend is a lightweight **Node.js + Express** server that handles admin authentication (JWT), contact form emails (Nodemailer), and bridges some data to Convex. The frontend is a **React + Vite** single-page application styled with **Tailwind CSS** and animated with **Framer Motion**.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS 3, Framer Motion |
| **Backend** | Node.js, Express 4, JWT, Nodemailer, Multer |
| **Database** | Convex (real-time cloud DB + file storage) |
| **Auth** | JWT (JSON Web Tokens) via Express backend |
| **Email** | Nodemailer with Gmail SMTP + App Passwords |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **Deployment** | Frontend → Vercel · Backend → Render |
| **Domain** | swarajvecha.in (GoDaddy → Vercel DNS) |

---

## ✨ Features

### 🌐 Public Portfolio
- **Hero Section** — Animated typing effect with name, tagline, and social links
- **About Section** — Profile photo (uploaded via admin), bio, degree, focus, and passion
- **Skills Section** — Categorized skill cards with levels
- **Projects Section** — Project cards with images, tech tags, GitHub & live links
- **Training & Experience** — Timeline of training and work experience
- **Certificates Section** — Certificate cards with issuer and credential links
- **Education Section** — Academic background with grades and descriptions
- **Contact Section** — Contact form that sends real emails + contact info display
- **Resume** — Downloadable resume uploaded by admin
- **Footer** — Branded with social links

### 🔐 Admin Panel (Protected)
- Secure login with JWT
- Full CRUD (Create, Read, Update, Delete) for all portfolio sections
- Image & file upload using **Convex File Storage**
- Real-time content updates without redeploy

### 📧 Contact Form
- Sends real emails to the portfolio owner via Gmail (Nodemailer)
- Stores messages in Convex database

---

## 📁 Project Structure

```
mern-portfolio/
├── backend/                    # Express API server
│   ├── routes/                 # API route handlers
│   │   ├── auth.js             # Admin authentication (login/verify JWT)
│   │   ├── hero.js             # Hero section routes
│   │   ├── about.js            # About section routes
│   │   ├── skills.js           # Skills routes
│   │   ├── projects.js         # Projects routes
│   │   ├── training.js         # Training & Experience routes
│   │   ├── certificates.js     # Certificates routes
│   │   ├── education.js        # Education routes
│   │   ├── contact.js          # Contact form (email + Convex)
│   │   └── resume.js           # Resume upload/download routes
│   ├── middleware/             # Express middleware
│   ├── server.js               # Main Express app entry point
│   ├── db.js                   # Convex client connection
│   ├── .env                    # Local env vars (not committed)
│   ├── .env.example            # Env var template
│   ├── render.yaml             # Render deployment config
│   └── package.json
│
└── frontend/                   # React + Vite app
    ├── convex/                 # Convex backend functions & schema
    │   ├── schema.js           # Full Convex DB schema
    │   ├── about.js            # Convex queries/mutations for About
    │   ├── hero.js             # Convex queries/mutations for Hero
    │   ├── skills.js           # Convex queries/mutations for Skills
    │   ├── projects.js         # Convex queries/mutations for Projects
    │   ├── training.js         # Convex queries/mutations for Training
    │   ├── certificates.js     # Convex queries/mutations for Certificates
    │   ├── education.js        # Convex queries/mutations for Education
    │   ├── contact.js          # Convex queries/mutations for Contact
    │   ├── resume.js           # Convex queries/mutations for Resume
    │   ├── footer.js           # Convex queries/mutations for Footer
    │   ├── files.js            # Convex file storage helpers
    │   └── users.js            # Convex user queries/mutations
    ├── src/
    │   ├── components/         # Public-facing UI components
    │   │   ├── Hero.jsx
    │   │   ├── About.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Projects.jsx
    │   │   ├── TrainingExperience.jsx
    │   │   ├── Certificates.jsx
    │   │   ├── Education.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   └── SectionState.jsx
    │   ├── pages/
    │   │   ├── Portfolio.jsx       # Main public portfolio page
    │   │   └── admin/              # Admin panel pages
    │   │       ├── AdminLogin.jsx
    │   │       ├── AdminLayout.jsx
    │   │       ├── AdminDashboard.jsx
    │   │       ├── ManageHero.jsx
    │   │       ├── ManageAbout.jsx
    │   │       ├── ManageSkills.jsx
    │   │       ├── ManageProjects.jsx
    │   │       ├── ManageTraining.jsx
    │   │       ├── ManageCertificates.jsx
    │   │       ├── ManageEducation.jsx
    │   │       ├── ManageContact.jsx
    │   │       ├── ManageResume.jsx
    │   │       ├── ManageFooter.jsx
    │   │       └── Settings.jsx
    │   ├── context/            # React context providers
    │   ├── services/           # Axios API service calls
    │   ├── App.jsx             # Root app with routing
    │   └── main.jsx            # Entry point
    ├── .env.local              # Local Convex env vars (not committed)
    ├── vercel.json             # Vercel deployment config (SPA rewrites)
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v16.x or higher** (v18+ recommended)
- [Git](https://git-scm.com/)
- A **Convex account** at [convex.dev](https://convex.dev) (free tier works)
- A **Gmail account** with an [App Password](https://support.google.com/accounts/answer/185833) (for contact form emails)

---

### Environment Variables

#### Backend — `backend/.env`

Copy `backend/.env.example` to `backend/.env` and fill in your values:

```env
# Server
PORT=5000

# Auth — use a long, random string in production
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Convex — get this from your Convex dashboard
CONVEX_URL=https://your-deployment.convex.cloud

# CORS — your deployed frontend URL, comma-separate multiple
FRONTEND_URL=https://your-app.vercel.app

# Email — Gmail + App Password for contact form
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_RECIPIENT_EMAIL=your-inbox@gmail.com
```

> **How to get a Gmail App Password:**
> 1. Enable 2-Step Verification on your Google account.
> 2. Go to: Google Account → Security → App Passwords
> 3. Create a new app password and paste it above.

#### Frontend — `frontend/.env.local`

```env
VITE_CONVEX_URL=https://your-deployment-hash.convex.cloud
VITE_CONVEX_SITE_URL=https://your-deployment-hash.convex.site
```

> The `VITE_CONVEX_URL` is found in your **Convex Dashboard** under the deployment settings.

---

### Running the Application

You need **3 terminal windows** running simultaneously:

#### Terminal 1 — Express Backend

```bash
cd backend
npm install
npm run dev
```
✅ API server runs at `http://localhost:5000`

#### Terminal 2 — Convex Dev Server

```bash
cd frontend
npm install
npx convex dev
```
✅ Syncs your `convex/` functions to the cloud and watches for changes.
> On first run, you'll be prompted to log into Convex and link/create a project.

#### Terminal 3 — React Vite Frontend

```bash
cd frontend
npm run dev
```
✅ The app is available at `http://localhost:5173`

---

## 📡 API Routes

All backend routes are prefixed with `/api`.

| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| `GET` | `/api/health` | Health check | ❌ |
| `POST` | `/api/auth/login` | Admin login, returns JWT | ❌ |
| `GET` | `/api/auth/verify` | Verify JWT token | ✅ |
| `GET/POST/PUT` | `/api/hero` | Get/Update hero section | Mixed |
| `GET/POST/PUT` | `/api/about` | Get/Update about section | Mixed |
| `GET/POST/PUT/DELETE` | `/api/skills` | Manage skills | Mixed |
| `GET/POST/PUT/DELETE` | `/api/projects` | Manage projects | Mixed |
| `GET/POST/PUT/DELETE` | `/api/training` | Manage training & experience | Mixed |
| `GET/POST/PUT/DELETE` | `/api/certificates` | Manage certificates | Mixed |
| `GET/POST/PUT/DELETE` | `/api/education` | Manage education entries | Mixed |
| `GET/POST` | `/api/contact` | Get contact info / send email | Mixed |
| `GET/POST` | `/api/resume` | Get/Upload resume | Mixed |

> ✅ Protected routes require a valid JWT in the `Authorization: Bearer <token>` header.

---

## 🗄 Convex Database Schema

All portfolio data is stored in Convex tables. Here's the full schema overview:

| Table | Key Fields | Notes |
|---|---|---|
| `hero` | `firstName`, `lastName`, `typingStrings`, `linkedin`, `github`, `email` | Single record |
| `about` | `heading`, `bio1`, `bio2`, `photoStorageId`, `location`, `degree`, `focus`, `passion` | Single record, photo in Convex storage |
| `skills` | `name`, `category`, `level`, `icon`, `order` | Multiple records |
| `projects` | `title`, `description`, `technologies`, `githubUrl`, `liveUrl`, `imageUrl`, `featured`, `order` | Multiple records |
| `training_experience` | `title`, `organization`, `description`, `startDate`, `endDate`, `type` | `type` = "Training" or "Experience" |
| `certificates` | `title`, `issuer`, `issuedDate`, `credentialUrl`, `imageUrl` | Multiple records |
| `education` | `degree`, `institution`, `location`, `startYear`, `endYear`, `grade`, `description` | Multiple records |
| `contact` | `email`, `phone`, `location`, `linkedin`, `github`, `twitter`, `website` | Single record |
| `resume` | `url`, `fileName`, `updatedAt` | Single record (Convex file storage) |
| `footer` | `brandName`, `subtitle`, `linkedin`, `github`, `email`, `location` | Single record |
| `messages` | `name`, `email`, `message`, `createdAt` | Stores contact form submissions |
| `users` | `username`, `passwordHash`, `role`, `createdAt` | Admin user accounts |

---

## 🔐 Admin Panel

Access the Admin Panel at `/admin` (e.g., `http://localhost:5173/admin`).

### Default Admin Login

```
Username: admin
Password: admin123
```
> ⚠️ **Change these credentials before deploying to production!**
> Update `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `backend/.env` (or via the Settings page in the Admin Panel).

### Admin Sections

| Route | Page | What You Can Manage |
|---|---|---|
| `/admin` | Dashboard | Overview & quick links |
| `/admin/hero` | Manage Hero | Name, tagline, typing strings, social links |
| `/admin/about` | Manage About | Profile photo, bio, location, degree, focus |
| `/admin/skills` | Manage Skills | Add/edit/delete skills with categories & levels |
| `/admin/projects` | Manage Projects | Add/edit/delete projects with images & links |
| `/admin/training` | Manage Training | Add/edit/delete training & experience items |
| `/admin/certificates` | Manage Certificates | Add/edit/delete certificates with images |
| `/admin/education` | Manage Education | Add/edit/delete education records |
| `/admin/contact` | Manage Contact | Update public contact info |
| `/admin/resume` | Manage Resume | Upload/replace downloadable resume PDF |
| `/admin/footer` | Manage Footer | Update brand name, subtitle, social links |
| `/admin/settings` | Settings | Change admin username & password |

---

## ☁️ Deployment

### Frontend — Vercel

1. Push your code to GitHub.
2. Connect the repo to [Vercel](https://vercel.com).
3. Set the **Root Directory** to `frontend`.
4. Add the following **Environment Variables** in the Vercel dashboard:
   ```
   VITE_CONVEX_URL=https://your-deployment.convex.cloud
   VITE_CONVEX_SITE_URL=https://your-deployment.convex.site
   ```
5. Deploy. The `vercel.json` in `frontend/` handles SPA routing rewrites automatically.

**Custom Domain (e.g. swarajvecha.in):**
- In Vercel → Project Settings → Domains → Add `swarajvecha.in`
- In GoDaddy DNS, point your domain to Vercel's nameservers or add the A/CNAME records Vercel provides.

---

### Backend — Render

1. Connect your GitHub repo to [Render](https://render.com).
2. Create a **New Web Service**, set the root directory to `backend`.
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
4. Add these **Environment Variables** in the Render dashboard:

| Variable | Value |
|---|---|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | *(your secret key)* |
| `CONVEX_URL` | *(your Convex deployment URL)* |
| `FRONTEND_URL` | `https://swarajvecha.in,https://your-app.vercel.app` |
| `GMAIL_USER` | *(your Gmail address)* |
| `GMAIL_APP_PASSWORD` | *(your Gmail app password)* |
| `CONTACT_RECIPIENT_EMAIL` | *(email to receive contact messages)* |

---

### Database — Convex Cloud

1. Run `npx convex deploy` from the `frontend/` directory to push your schema and functions to production.
2. Your Convex deployment URL is available in the [Convex Dashboard](https://dashboard.convex.dev).
3. Add the URL to both your Vercel env vars and your Render env vars.

---

## 📜 Scripts Reference

### Backend (`backend/`)

| Script | Command | Description |
|---|---|---|
| `dev` | `nodemon server.js` | Start with hot-reload (development) |
| `start` | `node server.js` | Start for production |

### Frontend (`frontend/`)

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start Vite dev server (HMR) |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Run ESLint |
| `convex dev` | `npx convex dev` | Start Convex dev server |
| `convex deploy` | `npx convex deploy` | Deploy Convex functions to production |

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Clone the repository
git clone https://github.com/Swarajbabu/portfoliowebsite.git
cd mern-portfolio

# 2. Setup backend
cd backend
cp .env.example .env        # Fill in your values
npm install
npm run dev                  # Terminal 1

# 3. Setup frontend & Convex
cd ../frontend
npm install
npx convex dev               # Terminal 2 (login & link Convex project on first run)
npm run dev                  # Terminal 3

# 4. Open your browser at http://localhost:5173
# 5. Admin panel: http://localhost:5173/admin  (admin / admin123)
```

---

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork it and adapt it for your own use!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ by <strong>Swaraj Babu Vecha</strong>

[swarajvecha.in](https://swarajvecha.in) · [LinkedIn](https://linkedin.com/in/swarajvecha) · [GitHub](https://github.com/Swarajbabu)
</div>
