# 📧 BulkMail – Bulk Email Campaign Manager

BulkMail is a simple and user-friendly **MERN Stack bulk email application** that allows users to compose an email, send it to multiple recipients, and maintain a history of previously sent emails.

The project was built as a full-stack web development project using **React, Node.js, Express, MongoDB, and Nodemailer**.

---

## 🚀 Features

* 📧 Send emails to multiple recipients
* 👥 Enter multiple email addresses separated by commas
* 🔢 Real-time recipient counter
* ✉️ Email subject and message composer
* ✅ Form validation
* 🔄 Loading state while sending emails
* 🟢 Success and error notifications
* 📋 Email sending history
* 📊 Campaign and recipient summary
* 🔄 Refresh email history
* 📱 Responsive design for desktop and mobile
* 💾 Store email history in MongoDB
* 📤 Send emails using Nodemailer

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* Nodemailer
* Mongoose
* CORS
* dotenv

### Database

* MongoDB

---

## 📁 Project Structure

```text
bulk-mail-app/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Mail.js
│   ├── .env
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd bulk-mail-app
```

---

## 🔧 Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

> **Important:** Never upload your `.env` file or email credentials to GitHub.

Start the backend:

```bash
npm run dev
```

The server should run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

---

## 📧 How to Use

### Step 1 – Enter Subject

Enter the subject of your email.

Example:

```text
Welcome to our newsletter
```

### Step 2 – Add Recipients

Enter multiple email addresses separated by commas.

Example:

```text
user1@gmail.com, user2@gmail.com, user3@gmail.com
```

BulkMail automatically displays the number of recipients selected.

### Step 3 – Write Your Message

Enter your email content in the message box.

### Step 4 – Send Email

Click:

```text
Send Email →
```

The backend processes the request and sends the email using Nodemailer.

### Step 5 – View History

After sending, the email is stored in MongoDB and displayed in the **Email History** section.

The dashboard also displays:

```text
Campaigns sent • Recipients
```

---

## 🗄️ MongoDB

MongoDB is used to store email history.

Each email record contains information such as:

```text
Subject
Recipients
Email Body
Status
Created Date
```

This allows previously sent campaigns to be displayed in the application.

---

## 🔐 Environment Variables

The project uses environment variables for sensitive configuration.

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

### Security

Do not commit these files to GitHub:

```text
.env
```

Add them to `.gitignore`:

```text
node_modules/
.env
```

---

## 🔌 API Endpoints

### Send Email

```http
POST /api/mail/send
```

Used to send an email to multiple recipients.

Example request:

```json
{
  "subject": "Test Email",
  "body": "Hello from BulkMail!",
  "recipients": [
    "user1@gmail.com",
    "user2@gmail.com"
  ]
}
```

---

### Get Email History

```http
GET /api/mail/history
```

Returns the latest email records stored in MongoDB.

---

## 📱 Responsive Design

BulkMail is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The interface automatically adjusts to smaller screen sizes using CSS media queries.

---

## 🎯 Project Objective

The main objective of this project is to understand and implement a complete **full-stack email application** using the MERN ecosystem.

The project demonstrates:

* React component development
* State management using React Hooks
* API communication using Axios
* REST API development with Express
* MongoDB database integration
* Email automation using Nodemailer
* Environment variable configuration
* Responsive frontend design

---

## 🔮 Future Improvements

Possible future improvements include:

* User authentication
* Email templates
* Scheduled email campaigns
* CSV recipient upload
* Email search and filtering
* Pagination for email history
* Email delivery analytics
* Open and click tracking
* Rich text email editor
* Contact management
* Admin dashboard

---

## 👨‍💻 Author

**Kaviarasu**

Full Stack Web Development Student

---

## ⭐ Project Status

**Completed – Working Full-Stack Project**

Built with:

```text
React + Node.js + Express + MongoDB + Nodemailer

## 📄 License

This project is created for educational and portfolio purposes.
