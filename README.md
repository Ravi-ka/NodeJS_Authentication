# NodeJS Authentication

This project is a demonstration of implementing authentication in a Node.js application using Express and Passport.js.

## Features

- User authentication with email and password
- Password hashing for security
- Session management with Passport.js
- Protected routes
- Google OAuth2.0 Integration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB installed and running

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Ravi-ka/NodeJS_Authentication.git
   ```

2. Navigate into the project directory:

   ```bash
   cd NodeJS_Authentication
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Rename `.env.example` to `.env` and update the environment variables with your own values.

5. Start the server:

   ```bash
   npm start
   ```

6. Open your web browser and visit `http://localhost:3000` to view the application.

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

- `PORT`: Port number for the server (default is `3000`)
- `DB_URL`: URI for connecting to MongoDB
- `SESSION_SECRET`: Secret key for session management
- `SMPT_SERVICE` : Set it to 'gmail'
- `AUTHENTICATION_SMPT_MAIL` : update the email address which will be used for email communication
- `AUTHENTICATION_SMPT_MAIL_PASSWORD` : Application Password of the email
- `PASSPORT_GOOGLE_CLIENT_ID` : passport-google-OAuth2.0 clientId
- `PASSPORT_GOOGLE_CLIENT_SECRET`: passport-google-OAuth2.0 secret Id

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
