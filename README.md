# CRM Crochet Management

A full-stack Customer Relationship Management (CRM) system built for crochet ateliers and handcraft businesses. Manage clients, orders, and products in one place — from a clean, modern interface.

This is a **portfolio project** focused on clean code, best practices, and solid software architecture principles, including Domain-Driven Design (DDD), separation of concerns, and maintainable, scalable code structure.

---

## Project Structure

```
crm-crochet-management/
├── api/        # Backend REST API
└── client/     # Frontend Vue.js application
```

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Vue.js · TypeScript         |
| Backend   | Node.js · TypeScript (REST API)     |
| Database  | PostgreSQL                          |

---

## Features

- **Client management** — register and track customers
- **Order management** — create, update, and follow up on orders
- **Product catalog** — manage crochet products and pricing
- **Dashboard** — overview of business activity at a glance

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- npm or yarn
- [PostgreSQL](https://www.postgresql.org/) v18+

---

### 1. Clone the repository

```bash
git clone https://github.com/icaroabreujohann/crm-crochet-management.git
cd crm-crochet-management
```

---

### 2. Set up the database

A PostgreSQL database backup is available inside the `api/db` folder. To restore it, create a database and run:

```bash
psql -U your_user -d your_database < api/db/db-final-version.sql
```

> Make sure PostgreSQL is running and the database is created before restoring.

---

### 3. Set up the API

```bash
cd api
npm install
```

Create a `.env` file based on `.env.example` (if available) and configure your environment variables (database connection, port, etc.).

```bash
npm run dev
```

The API will start on `http://localhost:3001` by default.

---

### 4. Set up the Client

```bash
cd ../client
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000` by default.

---

## Available Scripts

### API

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start the development server   |
| `npm run build` | Build for production           |
| `npm start`     | Run the production build       |

### Client

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start the Vite dev server      |
| `npm run build` | Build for production           |
| `npm run preview` | Preview the production build |

---
