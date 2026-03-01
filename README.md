# 🚀 Personal Portfolio — React + Vite + Node.js

A sleek, dark-themed personal portfolio with a full-stack setup.

## 📁 Structure

```
portfolio/
├── frontend/          ← React + Vite
│   ├── src/
│   │   ├── components/   (Navbar, Hero, About, Skills, Projects, Experience, CV, Contact, Footer)
│   │   ├── pages/        (Home, Admin)
│   │   ├── context/      (AuthContext)
│   │   ├── hooks/        (useInView)
│   │   ├── api/          (client.js)
│   │   └── assets/       (profile.jpg)
│   └── package.json
└── backend/           ← Express API
    ├── server.js
    ├── data/          (auto-created: projects.json, skills.json, cv/)
    └── package.json
```

## ⚡ Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # edit your credentials
npm run dev               # http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

## 🔐 Admin Panel

Navigate to **http://localhost:5173/admin**
— or —  click the **SE. logo 5 times** on the homepage.

| Field    | Default              |
|----------|----------------------|
| Email    | admin@portfolio.com  |
| Password | Admin@123!           |

**⚠️ Change these before going live!**

### Generate a new password hash:
```bash
node -e "require('bcryptjs').hash('YourNewPassword',10).then(console.log)"
```
Set `ADMIN_PASSWORD_HASH=<hash>` in `backend/.env`

## 📡 API Endpoints

| Method | Path                   | Auth | Description         |
|--------|------------------------|------|---------------------|
| POST   | /api/auth/login        | ❌   | Admin login         |
| GET    | /api/auth/me           | ✅   | Verify token        |
| GET    | /api/projects          | ❌   | List projects       |
| POST   | /api/projects          | ✅   | Add project         |
| PUT    | /api/projects/:id      | ✅   | Update project      |
| DELETE | /api/projects/:id      | ✅   | Delete project      |
| GET    | /api/skills            | ❌   | Get all skills      |
| POST   | /api/skills/add        | ✅   | Add a skill         |
| DELETE | /api/skills/remove     | ✅   | Remove a skill      |
| POST   | /api/cv/upload         | ✅   | Upload PDF CV       |
| GET    | /api/cv/download       | ❌   | Download CV         |

## ✏️ Customize

Edit `frontend/src/components/Hero.jsx`:
- Change **"Your Name"** to your real name
- Update **social links** (GitHub, LinkedIn, Email)

Edit `frontend/src/components/Contact.jsx`:
- Update contact details

Edit `frontend/src/components/Experience.jsx`:
- Update work history

## 🌐 Production Build

```bash
# Build frontend
cd frontend && npm run build

# Serve static files from backend
# Copy dist/ to backend/public/
cp -r dist/ ../backend/public/
```

Add to `backend/server.js`:
```js
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
```

## Deploy

- **Railway**: Push both folders, set env vars
- **Render**: Create 2 services (web + static site)
- **VPS**: `pm2 start backend/server.js`
