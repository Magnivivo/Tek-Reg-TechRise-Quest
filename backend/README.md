# Auto Documentation TechRise Backend API - User Management

- **Framework**: Express.js
- **Database**: SQLite (via Prisma ORM)
- **ORM**: Prisma 5

## Project Structure
```
├── prisma/
│   ├── schema.prisma         
│   ├── migrations/           
│   ├── seed.js               
│   └── dev.db               
├── src/
│   ├── config/
│   │   └── prisma.js         
│   ├── controllers/
│   │   └── userController.js 
│   ├── routes/
│   │   └── userRoutes.js    
│   ├── middleware/
│   │   └── errorHandler.js   
│   ├── factories/
│   │   └── userFactory.js    
│   └── utils/
│       └── responseFormatter.js 
├── .env                      
├── server.js                 
└── package.json
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


## Readme file & Guide made by Claude + Gemini
## Notes
- Email field must be unique
- Default `isActive` value is `false` for new users
- Pagination route must be accessed before single user route due to Express routing order
