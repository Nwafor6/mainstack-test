# Product Management API

A RESTful API for product management built with Node.js, Express, TypeScript, and MongoDB. This API provides authentication and product management capabilities with full CRUD operations.

## Features

- User authentication (signup/login)
- JWT-based authorization
- Product management (CRUD operations)
- TypeScript support
- MongoDB integration
- Input validation using Joi
- Docker support
- Automated testing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker and Docker Compose (optional)

## Project Structure

```
├── src/
│   ├── __tests__/        # Test files
│   ├── controllers/      # Route controllers
│   ├── interfaces/       # TypeScript interfaces
│   ├── models/          # MongoDB models
│   ├── routers/         # Express routes
│   ├── schemas/         # Joi validation schemas
│   ├── support/         # Helper functions & middleware
│   ├── app.ts           # Express app configuration
│   ├── db.ts            # Database configuration
│   └── index.ts         # Application entry point
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/mainstack
TOKEN_KEY=your_secret_key_here
PROJ_ENV=DEV
```

## Installation

### Using Node.js

1. Clone the repository:
```bash
git clone https://github.com/Nwafor6/mainstack-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

### Using Docker

1. Build and start the containers:
```bash
docker-compose up
```

## Running Tests

```bash
npm test
```

The test suite uses MongoDB Memory Server to run tests in isolation without affecting your development database.

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Success responses:

```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Optional data object
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)