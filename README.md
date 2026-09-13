# Bulk Mail App

A beginner-friendly MERN stack bulk email application.

## Technologies
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- Nodemailer
- Axios
- CSS

## Setup

### 1. Backend
```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set:
```env
MONGO_URI=mongodb://127.0.0.1:27017/bulkMailDB
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_google_app_password
PORT=5000
```

Run:
```bash
npm run dev
```

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
```

Copy `.env.example` to `.env`.

Run:
```bash
npm run dev
```

Open the Vite URL shown in the terminal.

## API
- `GET /` - server test
- `POST /api/mail/send` - send email and save record
- `GET /api/mail/history` - fetch latest 50 records

## Notes
Use a Google App Password for Gmail SMTP. Never commit `.env` files to GitHub.
