# Product Management API

This project is a Product Management API built with NestJS, allowing users to manage products and categories with role-based access control.

## Description

This API provides endpoints for user authentication, product management, and category management. It uses MongoDB for data storage and JWT for authentication.

## Installation

```bash
$ yarn install
```

## Configuration

Before running the application, you need to set up your environment variables. Create a `.env` file in the root directory of the project and add the following variables:

```
MONGODB_URI = (example: mongodb://localhost:27017/)
MONGO_DB_NAME = database_name
JWT_SECRET = your_jwt_secret_key
REFRESH_TOKEN_SECRET = your_refresh_token_secret
```

You can use the provided `.env.example` file as a template.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Documentation

When the application is running, you can access the Swagger API documentation by navigating to:

```
http://localhost:3000/api
```

This provides an interactive interface to explore and test the API endpoints.

## Support

For any questions or issues, please open an issue in the project repository.
