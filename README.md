# Task Manager App

A full-stack task management application built with **React (TypeScript)** on the frontend, **Express + Prisma + PostgreSQL** on the backend, and styled with a mix of **inline styles** and component-level CSS.

---

## Features

- Create, read, update, and delete tasks
- Filter tasks by **All**, **Completed**, and **Pending**
- Persistent data with PostgreSQL
- Clean API structure with Express + Prisma
- Responsive and simple UI
- Modern TypeScript-first development

---

## Project Structure
```
task-manager/
├── src/
│   ├── index.ts           # Express server entry point
│   ├── routes/
│   │   └── task.ts        # Task CRUD API endpoints
│   ├── components/
│   │   ├── TaskList.tsx   # Main task list component
│   │   └── TaskCard.tsx   # Single task UI card
│   └── utils.ts           # Shared types and styles
├── prisma/
│   └── schema.prisma      # Prisma DB schema
├── client/                # React frontend
├── .env                   # DB connection string
├── package.json
└── README.md
---
```

## Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React (TypeScript)       |
| Backend      | Express.js               |
| DB ORM       | Prisma                   |
| Database     | PostgreSQL               |
| Runtime      | Node.js, Vite, tsx       |

---

## Setup Instructions

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. **Install dependencies**
```bash
npm install
```
### 3. **Start PostgreSQL** 
If you’re on macOS:
```bash
brew services start postgresql
createdb mydb
```
Or manually using psql:
```bash
psql -U youruser
CREATE DATABASE mydb;
```

### 4. **Configure environment variables**  

Create a .env file in the project root:
```bash
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/mydb"
```

### 5. **Run migrations and generate the Prisma client in src/ folder** 
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. **(Optional) Seed the database with sample tasks** 

To insert seed data into your database:
```bash
npx prisma db seed
```

### 7. **Start the backend server** 
API will be live at: http://localhost:4000/api/tasks
```bash
npm run server
```

### 8. **Start the frontend** 
Frontend will be live at: http://localhost:5173
```bash
npm run dev
```

## Design Decisions
- PostgreSQL was chosen as a SQL database great for structured data, relational queries, and long-term scalability.
- Vite was used as the frontend build tool for its lightning-fast dev server and native React + TypeScript support.
- TypeScript ensures end-to-end type safety across both frontend and backend.
- Prisma provides a type-safe, developer-friendly ORM with built-in migrations and seeding.
- ES Modules + tsx enable modern syntax and a clean, no-build server dev experience.
- Inline styles were used for quick prototyping and scoped component styling without external CSS dependencies.
