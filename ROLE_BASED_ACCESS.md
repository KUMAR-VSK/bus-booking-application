# Role-Based Access Control Implementation

## User Roles and Permissions

### 1. USER Role
**Description**: Regular users who can book seats and search for buses.

**Permissions**:
- ✅ Search buses by source, destination, and date
- ✅ View bus details and seat layouts
- ✅ Create bookings (book seats)
- ✅ View their own bookings
- ✅ Cancel their own bookings
- ❌ Cannot manage buses
- ❌ Cannot view other users' bookings
- ❌ Cannot access admin functions

**API Endpoints**:
- `GET /api/buses/search` - Search buses
- `GET /api/buses/{busId}` - Get bus details
- `GET /api/buses/{busId}/seats` - Get seat layout
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PUT /api/bookings/{bookingId}/cancel` - Cancel booking

### 2. BUS_MANAGER Role
**Description**: Bus managers who can manage buses and view booking analytics.

**Permissions**:
- ✅ All USER permissions
- ✅ Add new buses
- ✅ Update existing buses
- ✅ View all buses
- ✅ View bus analytics
- ✅ View all bookings (for management purposes)
- ❌ Cannot delete buses (Admin only)
- ❌ Cannot manage users
- ❌ Cannot access admin-only functions

**API Endpoints**:
- All USER endpoints +
- `GET /api/buses` - Get all buses
- `POST /api/buses` - Create new bus
- `PUT /api/buses/{busId}` - Update bus
- `GET /api/buses/analytics` - Get bus analytics
- `GET /api/bookings` - View all bookings

### 3. ADMIN Role
**Description**: System administrators with full control over the entire system.

**Permissions**:
- ✅ All BUS_MANAGER permissions
- ✅ Delete buses
- ✅ Manage users (view, update roles, delete)
- ✅ View system-wide analytics
- ✅ Full booking management
- ✅ User role management

**API Endpoints**:
- All BUS_MANAGER endpoints +
- `DELETE /api/buses/{busId}` - Delete bus
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{userId}/role` - Update user role
- `DELETE /api/admin/users/{userId}` - Delete user
- `GET /api/admin/analytics/users` - Get user analytics
- `GET /api/bookings/analytics` - Get booking analytics

## Security Implementation

### JWT Token Structure
```json
{
  "sub": "user@example.com",
  "userId": 123,
  "role": "user|bus_manager|admin",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Method-Level Security
- `@PreAuthorize("hasRole('USER')")` - Only users with USER role
- `@PreAuthorize("hasRole('ADMIN')")` - Only users with ADMIN role
- `@PreAuthorize("hasAnyRole('BUS_MANAGER', 'ADMIN')")` - Bus Managers or Admins
- `@PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")` - All authenticated users

### URL-Based Security
```java
.authorizeHttpRequests(auth -> auth
    // Public endpoints
    .requestMatchers("/api/auth/**").permitAll()
    
    // User endpoints
    .requestMatchers("/api/buses/search", "/api/buses/*/seats").hasAnyRole("USER", "BUS_MANAGER", "ADMIN")
    .requestMatchers("/api/bookings/my-bookings").hasRole("USER")
    
    // Bus Manager endpoints
    .requestMatchers("/api/buses").hasAnyRole("BUS_MANAGER", "ADMIN")
    
    // Admin endpoints
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .requestMatchers("/api/bookings/analytics").hasRole("ADMIN")
)
```

## Authentication Flow

### 1. User Registration
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "john@example.com",
  "name": "John Doe",
  "id": 123,
  "role": "user"
}
```

### 2. User Login
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response: Same as registration
```

### 3. API Access with JWT
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Role Assignment

### Default Role Assignment
- New users automatically get `USER` role
- Only Admins can change user roles

### Role Validation
```java
private boolean isValidRole(String role) {
    return "user".equals(role) || "bus_manager".equals(role) || "admin".equals(role);
}
```

## Error Handling

### Access Denied Responses
- **401 Unauthorized**: Invalid or missing JWT token
- **403 Forbidden**: User authenticated but lacks required role
- **404 Not Found**: Resource doesn't exist or user lacks permission

### Example Error Messages
```json
{
  "timestamp": "2024-01-01T12:00:00Z",
  "status": 403,
  "error": "Forbidden",
  "message": "Access is denied. Required role: ADMIN",
  "path": "/api/admin/users"
}
```

## Testing the Implementation

### Test Users
1. **Regular User**: `user@test.com` / `password123` (role: user)
2. **Bus Manager**: `manager@test.com` / `password123` (role: bus_manager)
3. **Admin**: `admin@test.com` / `password123` (role: admin)

### Test Scenarios
1. **User tries to access admin endpoint**: Should return 403
2. **Bus Manager tries to delete bus**: Should return 403
3. **Admin accesses any endpoint**: Should succeed
4. **Unauthenticated user tries to access protected endpoint**: Should return 401

## Frontend Integration

### Role-Based Navigation
```javascript
const { user, isAdmin, isBusManager, isUser } = useAuth();

// Show different navigation based on role
{isAdmin && <AdminDashboard />}
{isBusManager && <BusManagerDashboard />}
{isUser && <UserDashboard />}
```

### API Request Headers
```javascript
// Automatically include JWT token
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## Security Best Practices

1. **JWT Expiration**: Tokens expire after 24 hours
2. **Password Hashing**: BCrypt with salt rounds
3. **HTTPS Required**: Production environment only
4. **Input Validation**: All user inputs validated
5. **Rate Limiting**: Prevent brute force attacks
6. **Audit Logging**: Track all admin actions

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Role Constraints
```sql
ALTER TABLE users ADD CONSTRAINT chk_role 
CHECK (role IN ('user', 'bus_manager', 'admin'));
```
