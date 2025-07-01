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
