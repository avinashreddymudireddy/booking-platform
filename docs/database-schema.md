# Database Schema

## Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Booking : makes
    User ||--o{ SupportTicket : creates
    Event ||--o{ Booking : has
    Event ||--o{ EventCategory : belongs_to
    Booking ||--|| Payment : has
    Event ||--o{ Schedule : has
    Venue ||--o{ Event : hosts

    User {
        int id PK
        string email
        string password
        string name
        boolean isAdmin
        boolean isVerified
        datetime createdAt
        datetime updatedAt
    }

    Event {
        int id PK
        string title
        string description
        decimal price
        int capacity
        string imageUrl
        datetime startDate
        datetime endDate
        int venueId FK
        datetime createdAt
        datetime updatedAt
    }

    Booking {
        int id PK
        int userId FK
        int eventId FK
        int quantity
        string status
        decimal totalPrice
        datetime bookingDate
        datetime createdAt
        datetime updatedAt
    }

    Payment {
        int id PK
        int bookingId FK
        string transactionId
        decimal amount
        string status
        string paymentMethod
        datetime paymentDate
        datetime createdAt
        datetime updatedAt
    }

    Venue {
        int id PK
        string name
        string address
        int capacity
        string facilities
        datetime createdAt
        datetime updatedAt
    }

    SupportTicket {
        int id PK
        int userId FK
        string subject
        string description
        string status
        string priority
        datetime createdAt
        datetime updatedAt
    }

    Schedule {
        int id PK
        int eventId FK
        datetime startTime
        datetime endTime
        int availableSeats
        datetime createdAt
        datetime updatedAt
    }

    EventCategory {
        int id PK
        int eventId FK
        string name
        string description
        datetime createdAt
        datetime updatedAt
    }
```

## Table Descriptions

### User Table
Stores user information and authentication details.
- Primary key: id
- Unique constraints: email
- Indexes: email, isAdmin

### Event Table
Contains event details and metadata.
- Primary key: id
- Foreign keys: venueId
- Indexes: startDate, endDate, price

### Booking Table
Records event bookings and their status.
- Primary key: id
- Foreign keys: userId, eventId
- Indexes: userId, eventId, status

### Payment Table
Tracks payment information for bookings.
- Primary key: id
- Foreign keys: bookingId
- Indexes: transactionId, status

### Venue Table
Stores venue information and capabilities.
- Primary key: id
- Indexes: name

### SupportTicket Table
Manages customer support requests.
- Primary key: id
- Foreign keys: userId
- Indexes: status, priority

### Schedule Table
Handles event timing and availability.
- Primary key: id
- Foreign keys: eventId
- Indexes: startTime, endTime

### EventCategory Table
Manages event categorization.
- Primary key: id
- Foreign keys: eventId
- Indexes: name

## Data Migration

### Initial Setup
```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# Seed initial data
npx sequelize-cli db:seed:all
```

### Backup Strategy
- Daily automated backups
- Point-in-time recovery
- Geographic replication (production)

## Data Lifecycle

### Creation
- Data validation
- Constraint checking
- Audit logging
- Error handling

### Updates
- Optimistic locking
- Transaction management
- Change tracking
- Version control

### Deletion
- Soft delete policy
- Cascade rules
- Archive strategy
- Data retention

## Performance Optimization

### Indexing Strategy
- Primary keys
- Foreign keys
- Common queries
- Full-text search

### Query Optimization
- Query planning
- Join optimization
- Subquery optimization
- Aggregate optimization

### Caching Strategy
- Result caching
- Query caching
- Object caching
- Cache invalidation

## Data Security

### Access Control
- Role-based access
- Row-level security
- Column-level security
- Audit logging

### Data Protection
- Encryption at rest
- Encryption in transit
- Data masking
- Secure backups

### Compliance
- GDPR requirements
- Data retention
- Data anonymization
- Access logging
