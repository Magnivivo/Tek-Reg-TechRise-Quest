# TechRise Backend API - User Management

## Overview
Backend REST API built with Express.js and Prisma ORM for managing user data.

## Tech Stack
- **Framework**: Express.js
- **Database**: SQLite (via Prisma ORM)
- **ORM**: Prisma 5
- **Additional**: dotenv, cors

## Project Structure
```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   ├── seed.js               # Database seeder
│   └── dev.db                # SQLite database file
├── src/
│   ├── config/
│   │   └── prisma.js         # Prisma client instance
│   ├── controllers/
│   │   └── userController.js # User CRUD logic
│   ├── routes/
│   │   └── userRoutes.js     # API routes
│   ├── middleware/
│   │   └── errorHandler.js   # Error handling
│   ├── factories/
│   │   └── userFactory.js    # Dummy data factory
│   └── utils/
│       └── responseFormatter.js # Response formatter
├── .env                      # Environment variables
├── server.js                 # Main application
└── package.json              # Dependencies
```

## Database Schema
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  username  String
  isActive  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## API Endpoints

### 1. Add New User
**URL**: `/users/add`  
**Method**: `POST`  
**Request Body**:
```json
{
  "email": "userdummy@gmail.com",
  "username": "dummykoboy"
}
```
**Response**:
```json
{
  "status": 200,
  "msg": "Success Add User",
  "data": null
}
```

### 2. Get All Users
**URL**: `/users`  
**Method**: `GET`  
**Response**:
```json
{
  "status": 200,
  "msg": "Success",
  "data": [
    {
      "id": 1,
      "email": "user0@gmail.com",
      "username": "user123",
      "isActive": false
    },
    ...
  ]
}
```

### 3. Get User by ID
**URL**: `/users/:userId`  
**Method**: `GET`  
**Example**: `/users/1`  
**Response**:
```json
{
  "status": 200,
  "msg": "Success",
  "data": {
    "id": 1,
    "email": "user1@gmail.com",
    "username": "user456",
    "isActive": true
  }
}
```

### 4. Update User Active Status
**URL**: `/users/update/active`  
**Method**: `PUT`  
**Request Body**:
```json
{
  "id": 1,
  "isActive": false
}
```
**Response**:
```json
{
  "status": 200,
  "msg": "Success Update Status",
  "data": null
}
```

### 5. Get Users with Pagination
**URL**: `/users/:limit/:page`  
**Method**: `GET`  
**Example**: `/users/5/1`  
**Response**:
```json
{
  "status": 200,
  "msg": "Success",
  "data": {
    "users": [
      {
        "id": 1,
        "email": "user0@gmail.com",
        "username": "user123",
        "isActive": false
      },
      ...
    ],
    "max_page": 1,
    "totalData": 3
  }
}
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file with:
```
PORT=3000
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV=development
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma migrate dev --name init
# or
npx prisma db push
```

### 4. Seed Database (Optional)
```bash
npm run seed
```

### 5. Start Server
```bash
# Development with nodemon
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

## Response Format
All API responses follow this standard format:
```json
{
  "status": <HTTP_STATUS_CODE>,
  "msg": "<MESSAGE>",
  "data": <DATA_OR_NULL>
}
```

## Error Handling
- **400**: Bad Request (validation errors, missing fields)
- **404**: Not Found (user doesn't exist)
- **500**: Internal Server Error

## Testing
Import `POSTMAN_COLLECTION.json` into Postman or Thunder Client for easy testing.

## npm Scripts
- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run seed` - Populate database with dummy data

## Notes
- Email field must be unique
- Default `isActive` value is `false` for new users
- Pagination route must be accessed before single user route due to Express routing order
