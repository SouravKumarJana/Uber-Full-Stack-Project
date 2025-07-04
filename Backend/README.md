# /users/register Endpoint Documentation

## Description
This endpoint registers a new user by validating the provided data and creating a new user account. On success, it returns an authentication token and user data.

## Request

### Endpoint 
**POST /users/register**

### Headers
- Content-Type: application/json

### Body
Payload should be in JSON format with the following structure:
```json
{
  
  "fullname": {
    "firstname": "John",         // Required, minimum 3 characters.
    "lastname": "Doe"              // Optional.
  },
  "email": "example@example.com",
  "password": "yourpassword"       // Required, minimum 6 characters.
}
```

## Responses

### Success - 201 Created
```json
{
  "token": "<JWT Token>",
  "user": {
    "_id": "user_id_string",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "example@example.com",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
    // ...other user fields...
  }
}
```

### Error - 400 Bad Request
If any validation errors occur (e.g., invalid email, short firstname, or password), the endpoint returns:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      // ...additional error details...
    },
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      // ...additional error details...
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      // ...additional error details...
    }
  ]
}
```
  
## Notes
- Ensure that the JSON payload strictly follows the required schema.
- The field "fullname.lastname" is optional.

---

# /users/login Endpoint Documentation

## Description
This endpoint authenticates a user using their email and password. On success, it returns an authentication token and user data.

## Request

### Endpoint
**POST /users/login**

### Headers
- Content-Type: application/json

### Body
Payload should be in JSON format with the following structure:
```json
{
  "email": "example@example.com",      // Required, must be a valid email.
  "password": "yourpassword"           // Required, minimum 6 characters.
}
```

## Responses

### Success - 200 OK
```json
{
  "token": "<JWT Token>",
  "user": {
    "_id": "user_id_string",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "example@example.com",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
    // ...other user fields...
  }
}
```

### Error - 400 Bad Request
If any validation errors occur (e.g., invalid email or password format), the endpoint returns:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      // ...additional error details...
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      // ...additional error details...
    }
  ]
}
```

### Error - 401 Unauthorized
If the email or password is incorrect:
```json
{
  "message": "Invalid Email or Password"
}
```

## Notes
- Both fields are required.
- Ensure the email is registered and the password is correct.

---

# /users/profile Endpoint Documentation

## Description
This endpoint retrieves the authenticated user's profile information. Requires authentication.

## Request

### Endpoint
**GET /users/profile**

### Headers
- Authorization: Bearer <JWT_TOKEN>
- Cookie: token=<JWT_TOKEN> (alternative)

## Responses

### Success - 200 OK
```json
{
  "_id": "user_id_string",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "example@example.com",
  "createdAt": "2024-06-01T12:00:00.000Z",
  "updatedAt": "2024-06-01T12:00:00.000Z"
}
```

### Error - 401 Unauthorized
If no token is provided or token is invalid:
```json
{
  "message": "Unauthorized User"
}
```

---

# /users/logout Endpoint Documentation

## Description
This endpoint logs out the user by clearing the authentication token and blacklisting it. Requires authentication.

## Request

### Endpoint
**GET /users/logout**

### Headers
- Authorization: Bearer <JWT_TOKEN>
- Cookie: token=<JWT_TOKEN> (alternative)

## Responses

### Success - 200 OK
```json
{
  "message": "Logged out"
}
```

### Error - 401 Unauthorized
If no token is provided or token is invalid:
```json
{
  "message": "Unauthorized User"
}
```

## Notes
- The token is blacklisted and cannot be reused
- Both cookie and Authorization header token are cleared
- Blacklisted tokens expire after 24 hours

---

# /captains/register Endpoint Documentation

## Description
This endpoint registers a new captain by validating the provided data and creating a new captain account. On success, it returns an authentication token and captain data including vehicle details.

## Request

### Endpoint
**POST /captains/register**

### Headers
- Content-Type: application/json

### Body
Payload should be in JSON format with the following structure:
```json
{
  "fullname": {
    "firstname": "John",         // Required, minimum 3 characters.
    "lastname": "Doe"              // Optional.
  },
  "email": "captain@example.com",  // Required, must be a valid email.
  "password": "yourpassword",      // Required, minimum 5 characters.
  "vehicle": {
    "color": "Red",                // Required, minimum 3 characters.
    "plate": "XYZ123",             // Required, minimum 5 characters.
    "capacity": 4,                 // Required, integer, at least 1.
    "vehicleType": "car",          // Required, valid values: "car", "motorcycle", "auto".
    "model": "Model S"             // Required, minimum 4 characters.
  }
}
```

## Responses

### Success - 201 Created
```json
{
  "token": "<JWT Token>",
  "captain": {
    "_id": "captain_id_string",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car",
      "model": "Model S"
    },
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
    // ...other captain fields...
  }
}
```

### Error - 400 Bad Request
If any validation errors occur (e.g., invalid email, insufficient field length, or missing vehicle information), the endpoint returns:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      // ...additional error details...
    },
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      // ...additional error details...
    },
    {
      "msg": "Password must be atleast 5 charchters long",
      "param": "password",
      // ...additional error details...
    },
    {
      "msg": "Color must be atleast 3 characters long",
      "param": "vehicle.color",
      // ...additional error details...
    },
    {
      "msg": "Plate must be atleast 5 characters long",
      "param": "vehicle.plate",
      // ...additional error details...
    },
    {
      "msg": "Capacity must be an integer and at least 1",
      "param": "vehicle.capacity",
      // ...additional error details...
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      // ...additional error details...
    },
    {
      "msg": "Model must be atleast 4 characters long",
      "param": "vehicle.model",
      // ...additional error details...
    }
  ]
}
```

---

# /captains/login Endpoint Documentation

## Description
This endpoint authenticates a captain using their email and password. On success, it returns an authentication token and captain data.

## Request

### Endpoint
**POST /captains/login**

### Headers
- Content-Type: application/json

### Body
Payload should be in JSON format with the following structure:
```json
{
  "email": "captain@example.com",   // Required, must be a valid email.
  "password": "yourpassword"          // Required, minimum 5 characters.
}
```

## Responses

### Success - 200 OK
```json
{
  "token": "<JWT Token>",
  "captain": {
    "_id": "captain_id_string",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car",
      "model": "Model S"
    },
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
    // ...other captain fields...
  }
}
```

### Error - 400 Bad Request
If any validation errors occur:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      // ...additional error details...
    },
    {
      "msg": "Password must be atleast 5 charchters long",
      "param": "password",
      // ...additional error details...
    }
  ]
}
```

### Error - 401 Unauthorized
If the email or password is incorrect:
```json
{
  "message": "Invalied Email or Password"
}
```

---

# /captains/profile Endpoint Documentation

## Description
This endpoint retrieves the authenticated captain's profile information, including vehicle details. Requires authentication.

## Request

### Endpoint
**GET /captains/profile**

### Headers
- Authorization: Bearer <JWT_TOKEN>
- Cookie: token=<JWT_TOKEN> (alternative)

## Responses

### Success - 200 OK
```json
{
  "_id": "captain_id_string",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car",
    "model": "Model S"
  },
  "createdAt": "2024-06-01T12:00:00.000Z",
  "updatedAt": "2024-06-01T12:00:00.000Z"
}
```

### Error - 401 Unauthorized
If no token is provided or token is invalid:
```json
{
  "message": "Unauthorized Captain"
}
```

---

# /captains/logout Endpoint Documentation

## Description
This endpoint logs out the captain by clearing the authentication token and blacklisting it. Requires authentication.

## Request

### Endpoint
**GET /captains/logout**

### Headers
- Authorization: Bearer <JWT_TOKEN>
- Cookie: token=<JWT_TOKEN> (alternative)

## Responses

### Success - 200 OK
```json
{
  "message": "Logout Successfully"
}
```

### Error - 400 or 401 Unauthorized
If no token is provided, token is invalid, or another error occurs:
```json
{
  "message": "Unauthorized Captain" // or "token not provided"
}
```

## Notes
- After logout, the token is blacklisted and cannot be reused.
- The response clears the token from both cookie and Authorization header.
