# Appointo

Appointo is a full-stack doctor appointment booking platform built as a monorepo. It includes a patient-facing web app, an admin and doctor control panel, and a Node.js backend API connected to MongoDB, Cloudinary, and Razorpay.

The project is designed around three roles:

- `Patient` can browse doctors, book appointments, manage a profile, and pay online.
- `Admin` can manage doctors, monitor appointments, and control availability.
- `Doctor` can review appointments and manage their panel access.

## Repository Structure

```text
Appointo/
├── Backend/    # Express API, MongoDB models, auth, payments
├── admin/      # Admin + Doctor panel (React + Vite)
├── frontend/   # Patient application (React + Vite)
└── README.md
```

## Applications

### 1. Patient App

Location: [frontend](https://appointo-mauve.vercel.app/)

Main capabilities:

- Browse doctors by speciality
- View doctor profiles and consultation fees
- Generate and select appointment slots
- Register and log in as a patient
- Edit user profile and upload profile image
- View, cancel, and pay for appointments

Core technologies:

- `React`
- `Vite`
- `React Router`
- `Axios`
- `React Toastify`
- `Tailwind CSS v4`

### 2. Admin and Doctor Panel

Location: [admin](https://appointo-admin-two.vercel.app/admin-dashboard)

Main capabilities:

- Admin login and doctor login
- Admin dashboard with booking summaries
- Add doctors with profile image
- List doctors and toggle availability
- View all appointments
- Doctor dashboard with personal appointment insights
- Doctor appointment management

Core technologies:

- `React`
- `Vite`
- `React Router`
- `Axios`
- `React Toastify`
- `Tailwind CSS v4`

### 3. Backend API

Location: [Backend](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend)

Main capabilities:

- JWT authentication for users, admins, and doctors
- MongoDB persistence with Mongoose
- Doctor, user, and appointment APIs
- Profile image uploads via Cloudinary
- Payment order creation and verification with Razorpay
- Shared slot-booking and slot-release logic

Core technologies:

- `Node.js`
- `Express`
- `MongoDB`
- `Mongoose`
- `JWT`
- `Cloudinary`
- `Razorpay`
- `Multer`

## Feature Overview

### Patient Flow

1. User signs up or logs in.
2. User browses doctors by speciality.
3. User opens a doctor detail page.
4. Available slots are generated from doctor schedule data.
5. User books an appointment.
6. User can pay online or cancel from the appointments page.

### Admin Flow

1. Admin logs into the control panel.
2. Admin reviews dashboard stats.
3. Admin adds doctors.
4. Admin updates doctor availability.
5. Admin reviews and cancels appointments if required.

### Doctor Flow

1. Doctor logs into the doctor panel.
2. Doctor reviews their appointment list.
3. Doctor tracks paid and pending bookings.
4. Doctor can cancel appointments from the panel.

## Backend Architecture

### Route Groups

- [Backend/routes/userRoute.js](https://appointo-backend-kk1e.onrender.com/routes/userRoute.js)
- [Backend/routes/adminRoute.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/routes/adminRoute.js)
- [Backend/routes/doctorRoute.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/routes/doctorRoute.js)

### Controllers

- [Backend/controllers/userController.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/controllers/userController.js)
- [Backend/controllers/adminController.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/controllers/adminController.js)
- [Backend/controllers/doctorController.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/controllers/doctorController.js)

### Models

- [Backend/Models/userModel.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/Models/userModel.js)
- [Backend/Models/doctorModel.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/Models/doctorModel.js)
- [Backend/Models/appointmentModel.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/Models/appointmentModel.js)

### Middleware

- [Backend/middlewares/authUser.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/middlewares/authUser.js)
- [Backend/middlewares/authAdmin.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/middlewares/authAdmin.js)
- [Backend/middlewares/authDoctor.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/middlewares/authDoctor.js)
- [Backend/middlewares/multer.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/middlewares/multer.js)

### Shared Utility

- [Backend/utils/appointmentUtils.js](/Users/saiteja/MySpace/WEB-Projects/Appointo/Backend/utils/appointmentUtils.js)

This utility centralizes slot-release logic so appointment cancellation stays consistent across user, admin, and doctor flows.

## Frontend Architecture

### Patient App Key Files

- [frontend/src/App.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/frontend/src/App.jsx)
- [frontend/src/context/AppContext.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/frontend/src/context/AppContext.jsx)
- [frontend/src/pages/Home.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/frontend/src/pages/Home.jsx)
- [frontend/src/pages/Doctors.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/frontend/src/pages/Doctors.jsx)
- [frontend/src/pages/Appointment.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/frontend/src/pages/Appointment.jsx)
- [frontend/src/pages/MyAppointments.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/frontend/src/pages/MyAppointments.jsx)

### Admin App Key Files

- [admin/src/App.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/admin/src/App.jsx)
- [admin/src/context/AdminContext.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/admin/src/context/AdminContext.jsx)
- [admin/src/context/DoctorContext.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/admin/src/context/DoctorContext.jsx)
- [admin/src/pages/Admin/Dashboard.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/admin/src/pages/Admin/Dashboard.jsx)
- [admin/src/pages/Admin/AddDoctor.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/admin/src/pages/Admin/AddDoctor.jsx)
- [admin/src/pages/Doctor/DoctorDashboard.jsx](/Users/saiteja/MySpace/WEB-Projects/Appointo/admin/src/pages/Doctor/DoctorDashboard.jsx)

## Environment Variables

### Backend

Create a `.env` file in `Backend/` with:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
PORT=1310
```

### Frontend

Create a `.env` file in `frontend/` with:

```env
VITE_BACKEND_URL=http://localhost:1310
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin

Create a `.env` file in `admin/` with:

```env
VITE_BACKEND_URL=http://localhost:1310
```

Live backend:
[appointo-backend-kk1e.onrender.com](https://appointo-backend-kk1e.onrender.com)

If you are testing against Render instead of a local backend, use:

```env
VITE_BACKEND_URL=https://appointo-backend-kk1e.onrender.com
```

## Local Development

### 1. Start the Backend

```bash
cd Backend
npm install
npm run dev
```

### 2. Start the Patient App

```bash
cd frontend
npm install
npm run dev
```

### 3. Start the Admin App

```bash
cd admin
npm install
npm run dev
```

## Production Build

### Frontend

```bash
cd frontend
npm run build
```

### Admin

```bash
cd admin
npm run build
```

### Backend Syntax Check

```bash
cd Backend
npm run check
```

## Deployment

### Recommended Setup

- `frontend` on `Vercel`
- `admin` on `Vercel`
- `Backend` on `Render`

### Render Backend Settings

- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`

Health check:
[https://appointo-backend-kk1e.onrender.com/api/health](https://appointo-backend-kk1e.onrender.com/api/health)

### Vercel Environment Variables

For `frontend`:

```env
VITE_BACKEND_URL=https://appointo-backend-kk1e.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

For `admin`:

```env
VITE_BACKEND_URL=https://appointo-backend-kk1e.onrender.com
```

Important:

- Do not wrap environment variable values in quotes.
- Do not append `/api` to `VITE_BACKEND_URL`.
- Restart or redeploy after changing environment variables.

## API Notes

Examples of active API routes:

- [GET /api/health](https://appointo-backend-kk1e.onrender.com/api/health)
- [GET /api/doctor/list](https://appointo-backend-kk1e.onrender.com/api/doctor/list)
- [GET /api/admin/dashboard](https://appointo-backend-kk1e.onrender.com/api/admin/dashboard)
- [GET /api/doctor/getAppointments](https://appointo-backend-kk1e.onrender.com/api/doctor/getAppointments)

POST routes used by the apps:

- `POST https://appointo-backend-kk1e.onrender.com/api/user/login`
- `POST https://appointo-backend-kk1e.onrender.com/api/user/book-appointment`
- `POST https://appointo-backend-kk1e.onrender.com/api/admin/login`

## Current Project Status

The repository includes:

- redesigned patient UI
- redesigned admin and doctor panel
- refactored backend controllers and middleware
- responsive improvements for both frontend apps
- Render-compatible backend startup flow

## Screens and UX

The current UI direction is:

- responsive on desktop, tablet, and mobile
- role-specific dashboards
- appointment-centric workflows
- modern card-based layouts with accessible spacing

## Future Improvements

- add automated tests for API and UI flows
- add doctor self-profile editing endpoints
- add appointment rescheduling
- add search, sorting, and filtering improvements
- add centralized API schema validation

## Author

Built by Sai Teja.
