# Ride Service API

This project is a ride service API developed with Express.js and Node.js. The API allows for creating, canceling, and listing rides, as well as user registration and authentication.

## Table of Contents

- Installation
- Usage
- API Routes
- Swagger Documentation

## Installation

1. Clone the repository:
``git clone https://github.com/your-username/ride-service-api.git``

2. Navigate to the project directory:
``cd ride-service-api``

3. Install the dependencies:
``npm install``

5. Create a .env file in the root of the project and add the following environment variables:
``API_BASE_URL=http://localhost:3000``
``NODE_ENV=development``
``JWT_SECRET=your_jwt_secret``

## Usage

To start the server, run:
``npm start``

The server will be running at http://localhost:3000.

## API Routes

### Register a New User

**Endpoint:** POST /rides/register

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
- 201 Created
```json
{
  "id": 1,
  "email": "user@example.com"
}
```

### User Login

**Endpoint:** POST /rides/login

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### Create a New Ride

**Endpoint:** POST /rides/create

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Response:**
- 201 Created
```json
{
  "id": 1,
  "user_id": "user123",
  "status": "active",
  "created_at": "2024-06-17T00:00:00.000Z"
}
```

### Cancel a Ride

**Endpoint:** POST /rides/cancel/:id

**Parameters:**
- id (Number): ID of the ride to be canceled.

**Response:**
- 200 OK
```json
{
  "id": 1,
  "status": "canceled"
}
```

### Get All Rides

**Endpoint:** GET /rides

**Response:**
- 200 OK
  
```json
[
  {
    "id": 1,
    "user_id": "user123",
    "status": "active",
    "created_at": "2024-06-17T00:00:00.000Z"
  },
  {
    "id": 2,
    "user_id": "user456",
    "status": "completed",
    "created_at": "2024-06-17T00:00:00.000Z"
  }
]
```

### Get All Rides When No Rides Are Present

**Response:**
- 200 OK
```json
[]
```

## Swagger Documentation

The API documentation is available via Swagger. To view the documentation, navigate to /api-docs in your browser.
