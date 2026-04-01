# Bus Booking System - Integration Guide

## Backend Setup

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Database Setup
```sql
CREATE DATABASE bus_booking_db;
USE bus_booking_db;

-- The application will auto-create tables using JPA
```

### Running the Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Swagger Documentation
Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

API Documentation available at: `http://localhost:8080/api-docs`

## Frontend Setup

### Prerequisites
- Node.js 14+
- npm or yarn

### Running the Frontend
```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## Integration Features

### 1. Swagger API Documentation
- Complete API documentation with OpenAPI 3.0
- Interactive testing interface
- JWT authentication support
- Role-based endpoint documentation

### 2. Real Backend Integration
- Frontend now connects to actual Spring Boot backend
- JWT-based authentication
- Proper error handling
- Automatic token management

### 3. Enhanced Authentication
- Role-based access control (user, bus_manager, admin)
- Secure JWT tokens
- Token validation and refresh
- Protected routes

### 4. Database Integration
- MySQL database with JPA/Hibernate
- Auto-generated schema
- Proper relationships between entities
- Data validation

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Bus Management
- `GET /api/buses` - Get all buses
- `POST /api/buses` - Create new bus
- `GET /api/buses/{id}` - Get bus details
- `PUT /api/buses/{id}` - Update bus
- `DELETE /api/buses/{id}` - Delete bus
- `GET /api/buses/search` - Search buses

### Booking Management
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/{id}` - Get booking details
- `PUT /api/bookings/{id}/cancel` - Cancel booking

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}/role` - Update user role
- `GET /api/bookings/analytics` - Get booking analytics

## Security Features

### JWT Authentication
- Secure token generation
- Token expiration handling
- Automatic token refresh
- Protected API endpoints

### Role-Based Access Control
- User: Can search buses and make bookings
- Bus Manager: Can manage buses and view bookings
- Admin: Full system access and user management

### CORS Configuration
- Proper cross-origin resource sharing
- Frontend-backend communication
- Security headers

## Testing the Integration

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```

### 2. Start Frontend
```bash
cd frontend
npm start
```

### 3. Test Authentication
- Navigate to `http://localhost:3000`
- Register a new user or login
- Verify role-based navigation

### 4. Test API Integration
- Use Swagger UI to test endpoints
- Verify frontend-backend communication
- Check authentication flow

## Environment Variables

### Backend (application.properties)
- Database connection settings
- JWT configuration
- Server port

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL
- Default: `http://localhost:8080/api`

## Troubleshooting

### Common Issues
1. **Database Connection**: Ensure MySQL is running and credentials are correct
2. **CORS Errors**: Check backend CORS configuration
3. **JWT Token Issues**: Verify JWT secret and expiration settings
4. **Port Conflicts**: Ensure ports 8080 and 3000 are available

### Debug Tips
- Check backend logs for database errors
- Use browser dev tools to inspect API calls
- Verify JWT tokens in localStorage
- Check Swagger UI for API testing

## Next Steps

1. **Payment Gateway Integration**: Add payment processing
2. **Real-time Features**: Implement WebSocket for live tracking
3. **Email Notifications**: Add booking confirmation emails
4. **Mobile App**: Develop React Native application
5. **Deployment**: Deploy to cloud platform
