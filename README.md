# 🎟️ Event Management System

A complete full-stack Event Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

This platform allows users to:
- Browse events
- Book event tickets
- Manage bookings
- Create and manage events
- Admin monitoring and management

The application supports:
- Authentication & Authorization
- Role-based Access
- Event Booking System
- Organizer Dashboard
- Admin Dashboard
- Image Uploads
- Responsive UI
- Secure Backend APIs

---

# 🚀 Tech Stack

## Frontend
- React JS
- React Router DOM
- Axios
- React Icons
- CSS3
- Context API

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- dotenv
- cors

---

# 📁 Project Structure

## Frontend Structure

```bash
frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.js
│   └── index.js
```

---

## Backend Structure

```bash
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── .env
├── server.js
└── package.json
```

---

# 🔐 User Roles

## 1. Attendee
- Register/Login
- Browse events
- Book tickets
- View booking history

## 2. Organizer
- Create events
- Edit events
- Delete events
- Manage own events

## 3. Admin
- Monitor platform
- Manage users
- Manage events
- Manage bookings

---

# ✨ Features

# Authentication Features
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access

# Event Features
- Create Event
- Edit Event
- Delete Event
- Event Search
- Event Filtering
- Event Details Page
- Event Image Upload

# Booking Features
- Seat Selection
- Ticket Booking
- Booking History
- Booking Management

# Dashboard Features
- Organizer Dashboard
- Admin Dashboard
- Analytics Overview

# UI Features
- Fully Responsive Design
- Mobile Friendly
- Tablet Optimized
- Modern UI/UX
- Loading States
- Error Handling

---

# 🛠️ Installation Guide

# 1️⃣ Clone Repository

```bash
git clone <repository-url>
```

---

# 2️⃣ Backend Setup

## Navigate to backend folder

```bash
cd backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create `.env` File

Create a `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Start Backend Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## Backend Running URL

```bash
http://localhost:5000
```

---

# 3️⃣ Frontend Setup

## Navigate to frontend folder

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create `.env` File

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Start Frontend

```bash
npm start
```

---

## Frontend Running URL

```bash
http://localhost:3000
```

---

# 🔗 Frontend ↔ Backend Connection

The frontend communicates with backend APIs using Axios.

## Axios Base URL

```javascript
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
```

---

# 📡 API Endpoints

# Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

# Event APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Get All Events |
| GET | `/api/events/:id` | Get Single Event |
| POST | `/api/events/create` | Create Event |
| PUT | `/api/events/update/:id` | Update Event |
| DELETE | `/api/events/delete/:id` | Delete Event |

---

# Booking APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings/create` | Create Booking |
| GET | `/api/bookings/my-bookings` | User Bookings |

---

# Admin APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/dashboard` | Admin Dashboard |
| DELETE | `/api/admin/delete-event/:id` | Delete Event |

---

# 🧪 Backend Testing Guide

# Step 1: Start Backend Server

```bash
cd backend

npm run dev
```

---

# Step 2: Check Server Status

Open browser:

```bash
http://localhost:5000
```

Expected Response:

```json
{
  "success": true,
  "message": "Event Management API is running successfully"
}
```

---

# Step 3: Test APIs Using Postman

## Register API

### POST

```bash
http://localhost:5000/api/auth/register
```

### Request Body

```json
{
  "name": "Karthik",
  "email": "karthik@gmail.com",
  "password": "123456",
  "role": "attendee"
}
```

---

## Login API

### POST

```bash
http://localhost:5000/api/auth/login
```

### Request Body

```json
{
  "email": "karthik@gmail.com",
  "password": "123456"
}
```

---

## Create Event API

### POST

```bash
http://localhost:5000/api/events/create
```

### Headers

```bash
Authorization: Bearer your_token
```

### Body
Use form-data:
- title
- description
- category
- location
- event_date
- event_time
- total_seats
- base_price
- image

---

# 💻 Frontend Testing Guide

# Step 1: Start Frontend

```bash
cd frontend

npm start
```

---

# Step 2: Open Application

```bash
http://localhost:3000
```

---

# Step 3: Test Application Flow

## Test User Authentication
- Register account
- Login account
- Logout account

---

## Test Events
- View events
- Search events
- Open event details

---

## Test Booking
- Select seats
- Book tickets
- View booking history

---

## Test Organizer Features
- Create event
- Edit event
- Delete event

---

## Test Admin Features
- Open admin dashboard
- View analytics
- Delete events

---

# 🔒 Security Features

- JWT Token Authentication
- Password Hashing
- Protected APIs
- Role-Based Authorization
- Input Validation
- Error Middleware

---

# 📱 Responsive Design

The application is optimized for:
- Mobile Devices
- Tablets
- Laptops
- Desktops
- Foldable Devices

---

# 📸 Image Upload Support

Event organizers can upload:
- Event banners
- Event posters
- Event thumbnails

Images are stored inside:

```bash
backend/uploads/
```

---

# ⚡ Performance Features

- Lazy Loading Ready
- Optimized API Calls
- Context API State Management
- Reusable Components
- Modular Folder Structure

---

# ❌ Common Errors & Fixes

# MongoDB Connection Error

Check:
```env
MONGO_URI
```

---

# JWT Error

Check:
```env
JWT_SECRET
```

---

# CORS Error

Ensure backend uses:

```javascript
app.use(cors())
```

---

# Frontend API Error

Check:
```env
REACT_APP_API_URL
```

---

# 👨‍💻 Developer

Developed using MERN Stack Architecture.

---

# 📄 License

This project is developed for educational and portfolio purposes.