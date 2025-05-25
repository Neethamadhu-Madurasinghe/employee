# Employee Management System - Backend

This is the backend for the Employee Management System, built with Express.js, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn
- PostgreSQL server running
- Docker (optional, for running PostgreSQL in a container)

## Getting Started

1.  **Clone the repository:**
    ```bash
    # If you haven't already:
    # git clone <repository-url>
    # cd <repository-folder>/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    -   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    -   Edit the `.env` file with your actual database credentials, JWT secret, and other configurations:
        ```
        PORT=5001

        DB_USER=your_db_user
        DB_HOST=localhost
        DB_NAME=your_db_name
        DB_PASSWORD=your_db_password
        DB_PORT=5432

        JWT_SECRET=your очень_секретный_ключ_jwt_здесь # Change this to a strong random string
        ```

4.  **Database Setup:**
    -   Ensure your PostgreSQL server is running and accessible with the credentials provided in `.env`.
    -   Create the database specified in `DB_NAME` if it doesn't exist.
    -   Connect to your PostgreSQL instance (e.g., using `psql` or a GUI tool like pgAdmin).
    -   Run the initial schema migration located in `migrations/001_initial_schema.sql` against your database.
        Example using `psql`:
        ```bash
        psql -U your_db_user -d your_db_name -a -f migrations/001_initial_schema.sql
        ```
        (You might need to provide host, port, and password depending on your PostgreSQL setup).

5.  **Build the project:**
    ```bash
    npm run build
    ```
    This compiles TypeScript to JavaScript in the `dist` folder.

6.  **Run the application:**

    *   **For development (with auto-reloading):**
        ```bash
        npm run dev
        ```
        The server will typically start on `http://localhost:5001` (or the port specified in your `.env`).

    *   **For production (after building):**
        ```bash
        npm run start
        ```

## API Endpoints

The API specification is defined in the OpenAPI document provided separately. Key base routes include:
- `/api/auth`
- `/api/users`
- `/api/departments`
- `/api/leaves`
- `/api/attendance`
- `/api/dashboard`

A health check endpoint is available at `/api/health`.

## Project Structure

- `src/`: Source code
  - `config/`: Database and environment configuration.
  - `controllers/`: HTTP request handlers.
  - `middlewares/`: Custom middleware (e.g., authentication).
  - `models/`: TypeScript interfaces for data structures.
  - `routes/`: API route definitions.
  - `services/`: Business logic.
  - `utils/`: Utility functions.
- `dist/`: Compiled JavaScript output.
- `migrations/`: SQL database migration scripts.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript compiler options.

## Linting and Formatting (TODO)

- Instructions for running linters (e.g., ESLint) and formatters (e.g., Prettier) will be added here.
