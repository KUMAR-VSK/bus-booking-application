# JWT and Role-Based Authentication Test Script

## Test the Implementation

### 1. Test User Registration (Default USER role)

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Regular User",
    "email": "user@test.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "user@test.com",
  "name": "Regular User",
  "id": 1,
  "role": "user"
}
```

### 2. Test Admin Registration

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@test.com",
    "password": "password123"
  }'
```

### 3. Test Bus Manager Registration

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bus Manager",
    "email": "manager@test.com",
    "password": "password123"
  }'
```

### 4. Update User Roles (Admin only)

First, login as admin to get token:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'
```

Then update user role:
```bash
curl -X PUT http://localhost:8080/api/admin/users/2/role \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "bus_manager"
  }'
```

### 5. Test Role-Based Access

#### Test USER permissions:
```bash
# User can search buses (should work)
curl -X GET "http://localhost:8080/api/buses/search?source=New York&destination=Boston" \
  -H "Authorization: Bearer USER_TOKEN"

# User cannot get all buses (should return 403)
curl -X GET http://localhost:8080/api/buses \
  -H "Authorization: Bearer USER_TOKEN"

# User cannot create bus (should return 403)
curl -X POST http://localhost:8080/api/buses \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "busName": "Test Bus",
    "source": "New York",
    "destination": "Boston",
    "departureTime": "09:00:00",
    "arrivalTime": "13:00:00",
    "totalSeats": 40
  }'
```

#### Test BUS MANAGER permissions:
```bash
# Bus Manager can create bus (should work)
curl -X POST http://localhost:8080/api/buses \
  -H "Authorization: Bearer MANAGER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "busName": "Manager Bus",
    "source": "Boston",
    "destination": "Washington",
    "departureTime": "10:00:00",
    "arrivalTime": "14:00:00",
    "totalSeats": 35
  }'

# Bus Manager cannot delete bus (should return 403)
curl -X DELETE http://localhost:8080/api/buses/1 \
  -H "Authorization: Bearer MANAGER_TOKEN"
```

#### Test ADMIN permissions:
```bash
# Admin can delete bus (should work)
curl -X DELETE http://localhost:8080/api/buses/1 \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Admin can manage users (should work)
curl -X GET http://localhost:8080/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 6. Test Booking Operations (USER role)

```bash
# Create booking (should work for USER)
curl -X POST http://localhost:8080/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "busId": 1,
    "seatIds": [1, 2],
    "bookingDate": "2024-01-15"
  }'

# Get user bookings (should work for USER)
curl -X GET http://localhost:8080/api/bookings/my-bookings \
  -H "Authorization: Bearer USER_TOKEN"
```

### 7. Test Analytics (Role-based)

```bash
# User cannot access analytics (should return 403)
curl -X GET http://localhost:8080/api/bookings/analytics \
  -H "Authorization: Bearer USER_TOKEN"

# Bus Manager can access bus analytics (should work)
curl -X GET http://localhost:8080/api/buses/analytics \
  -H "Authorization: Bearer MANAGER_TOKEN"

# Admin can access all analytics (should work)
curl -X GET http://localhost:8080/api/bookings/analytics \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Expected Results Summary

| Role | Search Buses | Create Bus | Delete Bus | Manage Users | Book Seats | Analytics |
|------|---------------|------------|------------|--------------|------------|-----------|
| USER | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| BUS_MANAGER | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ (Bus only) |
| ADMIN | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (All) |

## Security Verification

### JWT Token Structure
The JWT token contains:
- `sub`: User email
- `userId`: User ID
- `role`: User role (user/bus_manager/admin)
- `iat`: Issued at time
- `exp`: Expiration time

### Error Responses
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Valid token but insufficient permissions
- **404 Not Found**: Resource doesn't exist or no access

### Swagger Documentation
Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

- All protected endpoints show a lock icon
- Click "Authorize" and enter: `Bearer YOUR_JWT_TOKEN`
- Test endpoints based on role permissions

## Frontend Integration Notes

### Role-Based Navigation
```javascript
// Check user role and show appropriate UI
if (user.role === 'admin') {
  // Show admin dashboard
} else if (user.role === 'bus_manager') {
  // Show bus manager dashboard
} else {
  // Show user dashboard
}
```

### API Calls with JWT
```javascript
// All API calls should include the JWT token
const config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};

// Handle 403 errors gracefully
try {
  const response = await api.get('/api/admin/users', config);
} catch (error) {
  if (error.response.status === 403) {
    // Redirect to unauthorized page
  }
}
```

This implementation provides a comprehensive role-based access control system with JWT authentication, ensuring that each user role has exactly the permissions they need and no more.
