# College Discovery Platform

A full-stack, production-ready web application for discovering and comparing colleges. Built with React 18, Vite, Tailwind CSS, Express, and PostgreSQL.

## Features

1. **College Listing & Search**: Browse a paginated list of colleges with real-time search capabilities.
2. **Advanced Filtering**: Filter colleges by state/location and specify a minimum/maximum annual fee.
3. **Comprehensive Detail Page**: View an in-depth breakdown of each college including overview, courses, placements (with visual comparisons), and facilities.
4. **Side-by-Side Comparison**: Select up to 3 colleges and compare their key metrics in a detailed table view.

## Tech Stack

**Frontend**: React 18, React Router v6, Tailwind CSS v4, Axios, React Icons, Vite.
**Backend**: Node.js, Express, PostgreSQL (`pg`), CORS, dotenv.

---

## Setup Instructions

### 1. Database Setup (Supabase / PostgreSQL)
1. Set up a PostgreSQL database (e.g., using Supabase).
2. Open your SQL editor and execute the contents of `college-backend/seed.sql` to create the schema and populate it with 50 realistic Indian colleges.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd college-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
4. Edit the `.env` file and replace the `DATABASE_URL` with your actual PostgreSQL connection string.
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:5000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd college-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. The `.env` file is already configured to point to `http://localhost:5000/api`. If you change your backend port, update `VITE_API_URL` in `.env`.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The app will open in your browser, typically at `http://localhost:5173`.*

---

## Design Highlights
- Professional, human-written code following best practices.
- Fully responsive design using Tailwind CSS utility classes.
- Meaningful variable names, organized React structure, and extracted components.
- Smooth loading states with skeletons for enhanced user experience.
- Graceful error handling and validation across all inputs.
