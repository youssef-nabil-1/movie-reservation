# Movie Reservation System

A RESTful API for a movie reservation system built with Node.js, Express, and MongoDB. This system allows users to browse movies, check showtimes, make reservations, and manage their bookings. It includes both user and admin functionalities.

## Features

### User Features

-   **Authentication**

    -   User registration and login
    -   JWT-based authentication

-   **Movie Reservations**
    -   View available movies and showtimes
    -   Make seat reservations
    -   View personal reservation history
    -   Cancel upcoming reservations

### Admin Features

-   **User Management**

    -   Promote users to admin role
    -   View all users

-   **Reservation Management**
    -   View all reservations across the system
    -   Access to reservation statistics
    -   Monitor system revenue
    -   Track theater capacity

## API Endpoints

### Authentication

```
POST /api/auth/signup - Register a new user
POST /api/auth/login - User login
```

### Movies

```
GET /api/movies - Get all movies
GET /api/movies/:id - Get movie details
GET /api/movies/:id/showtimes - Get movie showtimes
```

### Reservations

```
POST /api/reservations - Create a new reservation
GET /api/reservations - Get user's reservations
DELETE /api/reservations/:id - Cancel a reservation (upcoming only)
```

### Admin Routes

```
GET /api/reservations/all - Get all reservations (admin only)
PUT /api/users/:userId/promote - Promote user to admin
```

## Project Structure

```
movie-reservation/
├── controllers/
│   ├── auth.js
│   ├── movie.js
│   ├── reservation.js
│   └── user.js
├── middlewares/
│   └── is-auth.js
├── models/
│   ├── movie.js
│   ├── reservation.js
│   ├── showtime.js
│   └── user.js
├── routes/
│   ├── auth.js
│   ├── movie.js
│   ├── reservation.js
│   └── user.js
├── app.js
└── package.json
```

## Technology Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB
-   npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/youssef-nabil-1/movie-reservation.git
cd movie-reservation
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the server

```bash
npm start
```

## Security Features

-   Password hashing
-   JWT authentication
-   Role-based access control
-   Input validation
-   Error handling
-   Protected routes

## Error Handling

The API implements consistent error handling with appropriate HTTP status codes:

-   400 - Bad Request
-   401 - Unauthorized
-   403 - Forbidden
-   404 - Not Found
-   406 - Not Acceptable (e.g., insufficient seats)
-   500 - Internal Server Error

## Data Models

### User

-   name (String)
-   email (String, unique)
-   password (String, hashed)
-   role (String: "user" | "admin")

### Movie

-   title (String)
-   posterUrl (String)
-   description (String)
-   showtimes (Array of references to Showtime)

### Showtime

-   movie (Reference to Movie)
-   date (Date)
-   time (String)
-   capacity (Number)
-   price (Number)

### Reservation

-   user (Reference to User)
-   movie (Reference to Movie)
-   showtime (Reference to Showtime)
-   seats (Number)
-   totalPrice (Number)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
