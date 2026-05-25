# 🎟️ EventHub – Smart Event Booking & Ticket Management Platform

EventHub is a full-stack event booking and management platform that allows attendees to discover and book events, organizers to create and manage events, and administrators to monitor platform activity through analytics dashboards.

## Features

- User Authentication & Authorization
- Event Creation & Management
- Real-Time Seat Booking
- QR-Based Ticket Generation
- Email Notifications
- Role-Based Access Control
- SQLite/Turso Data Persistence
- Admin Dashboard
- Deployment Ready Architecture

---

# 🚀 Live Demo

Frontend:
https://event-hub-three-ruby.vercel.app

Backend:
https://eventhub-lh90.onrender.com

---

# 📌 Project Overview

EventHub provides a complete event booking experience.

### Attendee
- Register/Login
- Browse events
- Search & Filter
- Book seats
- View bookings
- Cancel booking

### Organizer
- Create events
- Upload event images
- Manage bookings
- Update/Delete events

### Admin
- Dashboard
- User management
- Event monitoring
- Analytics

---

## 🔑 Demo Login Working Credentials

Admin | admin@example.com | Admin@123  
Organizer | organizer@example.com | Organizer@123  
Attendee | attendee@example.com | Attendee@123  

---

# 🏗 System Architecture

Frontend (React + Axios)

↓

Backend (Node.js + Express)

↓

SQLite / Turso Database

↓

Cloudinary + Mailtrap

---

# 🛠 Tech Stack

## Frontend
- React.js
- Axios
- React Router
- CSS

## Backend
- Node.js
- Express.js
- JWT
- Multer
- Nodemailer
- QRCode

## Database
- SQLite
- Turso

## Deployment
- Vercel

---

# 📂 Project Structure

```plaintext
EventHub/
│
├── frontend/                           # React Application
│   │
│   ├── public/                         # Static assets
│   │
│   └── src/
│       ├── api/                        # API communication layer
│       │   ├── authApi.js
│       │   ├── eventApi.js
│       │   ├── bookingApi.js
│       │   └── adminApi.js
│       │
│       ├── components/                 # Reusable UI components
│       │
│       ├── pages/                      # Application screens
│       │
│       ├── services/                   # Axios instance & helpers
│       │
│       ├── assets/                     # Images, icons, styles
│       │
│       ├── context/                    # Global state management
│       │
│       ├── hooks/                      # Custom React hooks
│       │
│       ├── utils/                      # Frontend utility functions
│       │
│       ├── App.jsx
│       └── main.jsx
│
├── backend/                            # Express API Server
│   │
│   ├── config/                         # DB & environment setup
│   │
│   ├── controllers/                    # Request handlers
│   │
│   ├── middleware/                     # Auth, validation, uploads
│   │
│   ├── models/                         # Database operations
│   │
│   ├── routes/                         # API endpoints
│   │
│   ├── utils/                          # Helpers (JWT, Email, QR)
│   │
│   ├── uploads/                        # Uploaded event images
│   │
│   └── server.js                       # Application entry point
│
├── database/
│   └── SQLite / Turso                  # Persistent storage
│
├── .env                                # Environment variables
│
├── package.json
│
└── README.md
```

---

# 🔐 Authentication

JWT Authentication

Flow:

Register

↓

Validate

↓

Store User

↓

Generate Token

↓

Login

↓

Protected Routes

---

# 👥 Roles

| Role | Access |
|------|--------|
| Attendee | Book Events |
| Organizer | Manage Events |
| Admin | Full Access |

---

# 🗄 Database

## Users

- id
- name
- email
- password
- role
- profile_image
- created_at

## Events

- id
- organizer_id
- title
- description
- category
- location
- event_date
- event_time
- total_seats
- available_seats
- base_price
- current_price
- image_url
- status

## Tickets

- id
- user_id
- event_id
- seat_number
- ticket_price
- booking_status
- qr_code

## Booking History

- BOOKED
- CANCELLED

---

# 🎯 APIs

## Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

---

## Events

POST /api/events

GET /api/events

GET /api/events/:id

PUT /api/events/:id

DELETE /api/events/:id

---

## Bookings

POST /api/bookings

GET /api/bookings/my-bookings

GET /api/bookings/public/booked-seats/:eventId

DELETE /api/bookings/:bookingId

---

## Admin

GET /api/admin/dashboard

DELETE /api/admin/users/:id

DELETE /api/admin/events/:id

---

# 💰 Dynamic Pricing

40% seats booked → +10%

70% seats booked → +20%

Example:

Base ₹1000

50% booked → ₹1100

70% booked → ₹1200

---

# 🎫 Booking Flow

Login

↓

Select Event

↓

Choose Seat

↓

Validate

↓

Generate QR

↓

Save Booking

↓

Update Inventory

↓

Send Email

---

# ☁️ File Upload

Allowed:

- JPG
- JPEG
- PNG
- WEBP

Limit:

5MB

Folder:

uploads/event-images

---

# 📩 Email Service

Booking confirmation includes:

- Event Details
- QR Ticket
- User Details
- Seat Information

---

# 🧠 Validations

### Register

- Email validation
- Password validation
- Role validation

### Event

- Date validation
- Seat validation
- Price validation

### Booking

- Seat availability
- Duplicate prevention

---

# ⚙ Environment Variables

Backend .env

PORT=

JWT_SECRET=

TURSO_DATABASE_URL=

TURSO_AUTH_TOKEN=

EMAIL_HOST=

EMAIL_PORT=

EMAIL_USER=

EMAIL_PASS=

---

# ▶ Installation

Clone

git clone <repo-url>

Backend

cd backend

npm install

npm run dev

Frontend

cd frontend

npm install

npm start

---

# 🧪 Testing

✔ Register

✔ Login

✔ Create Event

✔ Upload Image

✔ Book Seat

✔ Generate QR

✔ Email Sent

✔ Dashboard

---

# 📈 Future Scope

- Payment Gateway
- Notifications
- PDF Tickets
- Recommendations

---

# 👨‍💻 Author

Full Stack Event Booking & Management Platform
