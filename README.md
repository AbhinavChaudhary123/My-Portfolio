# Abhinav Chaudhary — MERN Portfolio

A dark, modern, responsive personal portfolio built with React + Vite + Tailwind CSS on the frontend and Express + MongoDB + Nodemailer on the backend.

## Features

- Responsive one-page portfolio with smooth scrolling
- Hero, About, Skills, Projects, Experience and Contact sections
- Profile photo and resume included
- Resume review modal + download/open actions
- Contact form with validation
- Contact submissions stored in MongoDB
- Contact messages delivered to `gamingdickens@gmail.com` through Gmail/Nodemailer
- Helmet security headers and contact rate limiting
- Vite proxy for local `/api` development
- Mobile navigation
- Scroll reveal animations

## 1. Install

From the project root:

```bash
npm install
npm run install-all
```

Or install separately:

```bash
cd client
npm install
cd ../server
npm install
```

## 2. Configure backend

Create `server/.env` by copying `server/.env.example`.

```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
CLIENT_URL=http://localhost:5173
MAIL_USER=your-gmail@gmail.com
MAIL_PASS=your-gmail-app-password
CONTACT_TO=gamingdickens@gmail.com
```

### Gmail setup

Use a Gmail **App Password**, not your normal Gmail password. Google requires 2-Step Verification before an App Password can be created.

`MAIL_USER` is the Gmail account used to send the email. `CONTACT_TO` is the inbox where recruiter messages arrive.

## 3. Run

From the root:

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

API health: `http://localhost:5000/api/health`

## 4. Production

Build the React client:

```bash
npm run build
```


## Project structure

```text
abhinav-portfolio/
├── client/
│   ├── public/assets/
│   │   ├── profile.png
│   │   └── Abhinav-Chaudhary-Resume.pdf
│   └── src/
│       ├── App.jsx
│       ├── data.js
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── config/db.js
│   ├── models/Contact.js
│   ├── routes/contact.js
│   ├── .env.example
│   └── index.js
├── package.json
└── README.md
```
