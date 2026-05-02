# MyMiniLibrary API

A minimalist REST API built with **Node.js** and **Express** for managing a personal miniature library. This project uses **PostgreSQL** as its database and is ready to run via **Docker**.

## 🚀 Features

- **MVC Architecture:** Clear separation between models, controllers, and routes.
- **CORS Management:** Differentiated configurations for public and private access.
- **Validation:** Ready for schema validation with Zod.
- **Containerization:** Docker and Docker Compose ready configuration.
- **Code Quality:** ESLint, Prettier, and Husky integration to enforce coding standards.

## 🛠️ Tech Stack

- **Language:** JavaScript (ES Modules)
- **Framework:** [Express](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via `pg` pool)
- **Validation:** [Zod](https://zod.dev/)
- **Linter/Formatter:** ESLint, Prettier
- **Dev Tools:** ts-node-dev (hot reload), Husky

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) (optional, for container deployment)
- A running **PostgreSQL** instance

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
   git clone <repository-url>
   cd MyMiniLibrary
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Configure environment variables:**
   Copy `.env_template` to a new `.env` file and fill in the values:
```bash
   cp .env_template .env
```
   Make sure to set your database credentials and allowed CORS origins correctly.

## 🏃 Running the App

### Development
Run with hot reload:
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker
```bash
docker-compose up --build
```

## 🛣️ API Endpoints

All endpoints are prefixed with `/mini`:

| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/mini/:id` | Get a miniature by ID | Public |
| `POST` | `/mini/` | Create a miniature | Private |
| `PATCH` | `/mini/:id` | Update an existing miniature | Private |
| `DELETE` | `/mini/:id` | Delete a miniature | Private |

> **Note:** POST, PATCH, and DELETE operations are currently work in progress.

## 🏗️ Project Structure

```text
src/
└── app/
    ├── config/          # Database and other configuration
    ├── controllers/     # Request handling logic
    ├── middlewares/     # Middlewares (CORS, etc.)
    ├── models/          # Database interaction
    ├── routes/          # Express route definitions
    ├── app.js           # Application entry point
    └── miniDB.js        # Express server initialization
```

## 🧹 Linting & Formatting

- **Lint:** `npm run lint`
- **Format:** `npm run format`