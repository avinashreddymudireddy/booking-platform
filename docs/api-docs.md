# API Documentation

## Base URL
```
http://localhost:5002/api
```

## Authentication

### Login
```http
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "isAdmin": false
  }
}
```

### Register
```http
POST /auth/register
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Events

### List Events
```http
GET /events
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `search`: Search term
- `startDate`: Filter by start date
- `endDate`: Filter by end date

Response:
```json
{
  "events": [
    {
      "id": 1,
      "title": "Concert Name",
      "description": "Description",
      "price": 29.99,
      "startDate": "2025-06-15T19:00:00Z",
      "endDate": "2025-06-15T23:00:00Z",
      "venue": {
        "id": 1,
        "name": "Venue Name",
        "address": "Address"
      }
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

### Get Event
```http
GET /events/:id
```

Response:
```json
{
  "id": 1,
  "title": "Concert Name",
  "description": "Description",
  "price": 29.99,
  "startDate": "2025-06-15T19:00:00Z",
  "endDate": "2025-06-15T23:00:00Z",
  "venue": {
    "id": 1,
    "name": "Venue Name",
    "address": "Address"
  },
  "schedule": [
    {
      "id": 1,
      "startTime": "2025-06-15T19:00:00Z",
      "endTime": "2025-06-15T23:00:00Z",
      "availableSeats": 100
    }
  ]
}
```

## Bookings

### Create Booking
```http
POST /bookings
```

Request body:
```json
{
  "eventId": 1,
  "quantity": 2,
  "scheduleId": 1
}
```

Response:
```json
{
  "id": 1,
  "eventId": 1,
  "userId": 1,
  "quantity": 2,
  "totalPrice": 59.98,
  "status": "pending",
  "paymentUrl": "https://payment-gateway.com/pay/123"
}
```

### List User Bookings
```http
GET /bookings
```

Response:
```json
{
  "bookings": [
    {
      "id": 1,
      "event": {
        "id": 1,
        "title": "Concert Name"
      },
      "quantity": 2,
      "totalPrice": 59.98,
      "status": "confirmed",
      "bookingDate": "2025-06-01T10:00:00Z"
    }
  ]
}
```

### Get Booking
```http
GET /bookings/:id
```

Response:
```json
{
  "id": 1,
  "event": {
    "id": 1,
    "title": "Concert Name",
    "description": "Description",
    "startDate": "2025-06-15T19:00:00Z",
    "endDate": "2025-06-15T23:00:00Z"
  },
  "quantity": 2,
  "totalPrice": 59.98,
  "status": "confirmed",
  "bookingDate": "2025-06-01T10:00:00Z",
  "payment": {
    "id": 1,
    "status": "completed",
    "paymentMethod": "credit_card",
    "paymentDate": "2025-06-01T10:01:00Z"
  }
}
```

## Support

### Create Support Ticket
```http
POST /support
```

Request body:
```json
{
  "subject": "Booking Issue",
  "description": "Cannot access my tickets"
}
```

Response:
```json
{
  "id": 1,
  "subject": "Booking Issue",
  "description": "Cannot access my tickets",
  "status": "open",
  "priority": "medium",
  "createdAt": "2025-06-01T10:00:00Z"
}
```

### List Support Tickets
```http
GET /support
```

Response:
```json
{
  "tickets": [
    {
      "id": 1,
      "subject": "Booking Issue",
      "status": "open",
      "priority": "medium",
      "createdAt": "2025-06-01T10:00:00Z"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```
