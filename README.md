# Project Name

## Overview
This project is a full-stack application consisting of a **backend (Node.js, Express, MongoDB)** and a **frontend (React, Redux, Material UI)**. The application provides an appointment booking system where users can schedule appointments with doctors.

---

## Deployed Link
https://baby-steps-one.vercel.app/

## Backend

### Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- CORS
- RTK Query (for API interactions)
- Socket.io (for real-time updates)

### Setup Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo.git
   cd backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=8082
   MONGO_URI=mongodb+srv://your-db-connection
   ```

4. **Run the server**
   ```sh
   npm start
   ```

### API Endpoints
#### **Doctors**
- `GET /doctors` - Fetch all doctors
- `POST /doctors` - Create a new doctor
- `GET /doctors/:id/slots?date=YYYY-MM-DD` - Get available slots for a doctor on a specific date

#### **Appointments**
- `GET /appointments` - Fetch all appointments
- `POST /appointments` - Book a new appointment
- `PUT /appointments/:id` - Update an appointment
- `DELETE /appointments/:id` - Cancel an appointment

---

## Frontend

### Technologies Used
- React.js
- Redux Toolkit (RTK Query)
- Material UI
- React Router
- Formik & Yup (for forms validation)
- Socket.io-client (for real-time updates)

### Setup Instructions

1. **Navigate to the frontend folder**
   ```sh
   cd frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create `.env` file**
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

4. **Run the frontend**
   ```sh
   npm start
   ```

### Features
- View list of doctors
- Check available appointment slots
- Book, update, and delete appointments
- Real-time updates using WebSockets

### Folder Structure
```
frontend/
│-- src/
│   ├── components/ (Reusable UI components)
│   ├── pages/ (Different views like Home, Appointments, etc.)
│   ├── services/ (RTK API calls)
│   ├── store/ (Redux store)
│   ├── App.tsx (Main app component)
│   ├── index.tsx (Entry point)
│-- public/
│-- package.json
│-- README.md
```

---

