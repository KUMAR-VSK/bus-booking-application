# Bus Booking Application Backend

A complete RESTful API backend for a bus booking system built with Spring Boot, Spring Security (JWT), Spring Data JPA, and MySQL.

## Features

- **User Authentication & Authorization** - JWT-based authentication with BCrypt password encryption
- **Bus Management** - View all buses, search by route, view seat availability
- **Booking System** - Create bookings, view bookings, cancel bookings with seat management
- **Clean Architecture** - Layered architecture (Controller → Service → Repository → Entity)
- **Exception Handling** - Global exception handling with proper HTTP status codes
- **CORS Support** - Configured for React frontend integration

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Security (JWT)
- Spring Data JPA
- MySQL
- Lombok
- Maven

## Project Structure

```
backend/src/main/java/com/busbooking/
├── controller/          # REST API endpoints
├── service/            # Business logic
├── repository/         # Data access layer
├── entity/             # JPA entities
├── dto/                # Data transfer objects
├── security/           # JWT authentication
├── exception/          # Exception handling
├── config/             # Configuration classes
└── BusBookingApplication.java
```

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE bus_booking_db;
```

### 2. Configuration

Update `src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build and Run

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Initialize Sample Data (Optional)

The application will automatically create tables on startup. To populate sample bus and seat data, you can:

1. Enable data.sql by adding to `application.properties`:
```properties
spring.sql.init.mode=always
spring.datasource.initialization-mode=always
```

2. Or manually run the SQL in `src/main/resources/data.sql`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |

### Buses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/buses` | Get all buses | Yes |
| GET | `/api/buses/search?source=&destination=&date=` | Search buses | Yes |
| GET | `/api/buses/{busId}` | Get bus details | Yes |
| GET | `/api/buses/{busId}/seats` | Get seat availability | Yes |

### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/bookings` | Create booking | Yes |
| GET | `/api/bookings/user/{userId}` | Get user bookings | Yes |
| PUT | `/api/bookings/{bookingId}/cancel` | Cancel booking | Yes |

## API Usage Examples

### Register User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "john@example.com",
  "name": "John Doe"
}
```

### Get All Buses

```bash
curl -X GET http://localhost:8080/api/buses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Search Buses

```bash
curl -X GET "http://localhost:8080/api/buses/search?source=New%20York&destination=Boston" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Booking

```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": 1,
    "busId": 1,
    "bookingDate": "2024-01-15",
    "seatIds": [1, 2]
  }'
```

### Get User Bookings

```bash
curl -X GET http://localhost:8080/api/bookings/user/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Cancel Booking

```bash
curl -X PUT http://localhost:8080/api/bookings/1/cancel \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Schema

### Users
- `user_id` (PK)
- `name`
- `email` (unique)
- `password_hash`
- `created_at`

### Buses
- `bus_id` (PK)
- `bus_name`
- `source`
- `destination`
- `departure_time`
- `arrival_time`
- `total_seats`

### Seats
- `seat_id` (PK)
- `bus_id` (FK)
- `seat_number`
- `is_available`

### Bookings
- `booking_id` (PK)
- `user_id` (FK)
- `bus_id` (FK)
- `booking_date`
- `total_amount`
- `status` (BOOKED, CANCELLED)
- `created_at`

### Booking_Seats
- `id` (PK)
- `booking_id` (FK)
- `seat_id` (FK)

## Security

- JWT tokens expire after 24 hours (configurable)
- Passwords are hashed using BCrypt
- All endpoints except `/api/auth/**` require authentication
- CORS is configured to allow requests from React frontend

## Development

### Build

```bash
mvn clean package
```

### Run Tests

```bash
mvn test
```

### Run Application

```bash
java -jar target/bus-booking-backend-1.0.0.jar
```

## Configuration

Key configuration properties in `application.properties`:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/bus_booking_db
spring.jpa.hibernate.ddl-auto=update

# JWT
app.jwt.secret=YourSecretKeyHere
app.jwt.expiration=86400000  # 24 hours in milliseconds
```

## Notes

- The application uses `spring.jpa.hibernate.ddl-auto=update` which automatically creates/updates tables
- For production, use `spring.jpa.hibernate.ddl-auto=validate` or `none`
- JWT secret should be stored securely (use environment variables in production)
- CORS is configured to allow all origins for development - restrict in production

## License

This project is licensed under the MIT License.