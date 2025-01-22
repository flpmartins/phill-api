# Project: Go Train

Go Train is a training and gym platform designed to facilitate the organization and tracking of physical activities.

## About the Project

- **Version:** 1.0.0
- **Technologies:** Node.js (16.4 or higher), Prisma.

## Environment Setup

### Required Dependencies

Make sure you have installed:

- [Node.js](https://nodejs.org/) (version 16.4 or higher).
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) as a dependency manager.

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone <REPOSITORY_URL>
   cd <PROJECT_FOLDER>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Prisma:**
   - Generate Prisma clients:
     ```bash
     npx prisma generate
     ```
   - Apply the schema to the database:
     ```bash
     npx prisma db push
     ```

4. **Set up the `.env` file:**
   - Fill in the necessary configurations in the `.env` file based on the `.env.example` file.

## Running the Project

To start the project, run:

```bash
npm start
```

Or, if you prefer to use development mode:

```bash
npm run dev
```

## Contribution

### Guidelines

- **Code Review:** Submit a Pull Request and wait for a review before merging.

