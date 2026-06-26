# Goal OS

Goal OS is an AI-powered productivity app that helps users turn a goal into a structured roadmap. Users can create goals, generate monthly/weekly/daily plans with Gemini, track tasks, monitor progress, and recalculate the roadmap when plans change.

## Features

- Create personalized goals with deadline, skill level, and daily time commitment
- Generate AI roadmaps using Google Gemini
- View goals by user name
- Track daily tasks and completion progress
- Recalculate plans based on completed and pending tasks
- React dashboard for goal progress and roadmap views
- Express API with MongoDB persistence

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Google GenAI SDK
- dotenv

## Project Structure

```text
goal-os/
  client/                 # React + Vite frontend
    src/
      components/         # Reusable UI components
      pages/              # Route pages
      services/           # API client
      utils/              # Frontend helper functions
  server/                 # Express backend
    config/               # Database configuration
    controllers/          # Request handlers
    models/               # Mongoose schemas
    routes/               # API routes
    services/             # AI service integration
    utils/                # Prompt templates
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database connection string
- Gemini API key

### 1. Clone the repository

```bash
git clone <repository-url>
cd goal-os
```

### 2. Install dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the backend

From the `server` directory:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

### 5. Run the frontend

In a second terminal, from the `client` directory:

```bash
npm run dev
```

Vite will print the local frontend URL, usually:

```text
http://localhost:5173
```

## Available Scripts

### Client

```bash
npm run dev       # Start Vite development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Server

```bash
npm run dev       # Start server with nodemon
npm start         # Start server with node
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/goals` | Create a goal and generate an AI roadmap |
| `GET` | `/goals/user/:name` | Get all goals for a user name |
| `GET` | `/goals/:id` | Get one goal by ID |
| `PATCH` | `/goals/:goalId/tasks/:taskId` | Update task completion status |
| `POST` | `/goals/:id/recalculate` | Recalculate a goal roadmap |

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Backend port. Defaults to `5000`. |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `GEMINI_API_KEY` | Yes | API key for Google Gemini roadmap generation. |

## Notes

- The frontend API client currently points to `http://localhost:5000/api`.
- Keep `.env` files out of Git. Use `.env.example` if you want to share sample configuration.
- MongoDB must be running or reachable before starting the backend.

## License

This project is licensed under the terms in the `LICENSE` file.
