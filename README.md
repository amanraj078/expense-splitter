# Expense Splitter App

A full-stack MERN (MongoDB, Express, React, Node.js) application to split expenses between participants. Includes **user authentication (JWT)**, **expense management**, and a **summary view**.

## Features

-   Register / Login with JWT authentication
-   Add expenses with participants
-   View list of expenses
-   See summary of balances
-   Protected routes (only logged-in users can manage expenses)
-   React + Tailwind CSS frontend
-   Node.js + Express backend with MongoDB

## Project Structure

```
expense-splitter/
│
├── backend/           # Express + MongoDB + API
│   ├── src/
│   │   ├── routes/
│   │   ├── controller/
│   │   ├── model/
│   │   └── server.js
│   └── package.json
│
├── client/            # React + Vite frontend
│   ├── src/
│   ├── dist/          # Production build
│   └── package.json
│
└── README.md
```

## Prerequisites

-   Node.js (v18+ recommended)
-   MongoDB (local or Atlas cloud DB)
-   npm or yarn

## Backend Setup

1. Navigate to backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in `backend/` with:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=3000
    ```

4. Start backend server:
    ```bash
    npm run dev   # with nodemon
    # or
    npm start
    ```

👉 Backend runs at: **http://localhost:3000**

## Frontend Setup

1. Navigate to client folder:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start development server:
    ```bash
    npm run dev
    ```

👉 Frontend runs at: **http://localhost:5173**

## Build & Deploy

1. Build frontend:

    ```bash
    cd client
    npm run build
    ```

2. Serve frontend via backend (already configured in `server.js`):
   The built files will be in `client/dist/`.

3. Start backend (it will serve frontend too):
    ```bash
    cd backend
    npm start
    ```

👉 Now visit **http://localhost:3000** for the full app.

## Notes

-   Ensure MongoDB is running before starting backend.
-   Tokens are stored in **localStorage** for authentication.
-   In production, use environment variables safely (e.g., Render, Railway, or Netlify + Render).
