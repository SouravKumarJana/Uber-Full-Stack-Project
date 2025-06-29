# /users/register Endpoint Documentation

## Description
This endpoint registers a new user by validating the provided data and creating a new user account. On success, it returns an authentication token and user data.

## Request

### Endpoint 
**POST /users/register**

Method:  http

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
