# Numerology Expert Puskaar Website

A full-stack web application for professional numerology consultations, featuring a Pythagoras Numerology Calculator (BS/Nepali Date support), Appointment Booking, Blog, and Admin Dashboard.

## 🚀 Features
- **Smart BS Numerology Calculator**: Advanced Pythagoras system supporting Nepali (BS) dates with auto-formatting and visual date picker.
- **Admin Dashboard**: Secure JWT-protected panel for managing appointments, blogs, and videos.
- **Block Letter Formatting Tool**: Instant uppercase conversion for blog titles and content in the Dashboard.
- **YouTube Integration**: Seamless video feed from professional numerology sessions.
- **Responsive Design**: Premium dark-themed UI built with React & Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: Django, Django REST Framework, SQLite (Production-ready with WhiteNoise).
- **Authentication**: JWT (JSON Web Tokens).

## 📥 Installation

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables
Create a `.env` file in the `backend/` directory based on the `.env.example` file provided.

## 📞 Support
For remedies and personal consultation, contact: **9702935911**
