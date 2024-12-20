# KIOSK and WALL PANEL Front End Applications

## Table of Contents
- [Environment Configuration](#environment-configuration)
- [Applications](#applications)
- [Application Workflow](#application-workflow)
- [Supported Environments](#supported-environments)
- [Project Structure](#project-structure)

## Environment Configuration

### .env
Add the following .env under /shared/server
```
# DEVELOPMENT
# ESCWORKS_API_URL=https://dev.escworks.com/api
# ESCWORKS_API_KEY={"API-KEY":"b-728yT-92EnUmyQ"}

# QA
# ESCWORKS_API_URL=https://qa.escworks.com/api
# ESCWORKS_API_KEY={"API-KEY":"update this"}

# UAT
ESCWORKS_API_URL=https://uat.escworks.com/api
ESCWORKS_API_KEY='{"API-KEY":"aB1!cD2@eF3#gH4$iJ5%kL6^mN7&oP8*pQ9(rS0)qT"}'
```

### Shared Environment Variables
These are put in .env under /shared/
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

VITE_ENVIRONMENT=development

# These are only used for local development and working with AWS Cognito, these values will need to be fetched and used locally
VITE_CLIENT_ID=7ed6re55ui982icppppknm6o48
VITE_CLIENT_SECRET=1c65bnoo0r9gm42tj5590tfgfk69dr3mfrqdfhq6r74b52n067ji
# VITE_API_URL=https://qlfz9ox1dk.execute-api.us-east-1.amazonaws.com/development/kiosk-express
VITE_API_ROOT_URL=http://localhost:3030/kiosk-express
# VITE_API_URL=https://dev.escworks.com
VITE_API_KEY='{"API-KEY":"b-728yT-92EnUmyQ"}'
VITE_MODE_DEBUG_LOCAL_PROD=false

# MSSQL_SA_PASSWORD=StrongerP@ssw0rd123
# MSSQL_PORT=1433
# MSSQL_USER=local_user
# MSSQL_PASSWORD=mssql
# MSSQL_SERVER=mssql_local
# MSSQL_DATABASE=mssql_db
#1080x1920

MSSQL_USER=devteam
MSSQL_PASSWORD=H0ll1ster~
MSSQL_SERVER=R04HOUSQL82A\ESCDB
MSSQL_DATABASE=escworks.system
MSSQL_PORT=1433
```

---

## Applications

### 1. Kiosk Check-In System
The kiosk application allows users to check in and receive their QR code badge:
- Initial registration and check-in
- Find session/workshop information
- Prints personalized QR code badges for attendees
- Integrates with badge printing hardware
- Communicates with NextGen API for user verification
- Runs on dedicated touch-screen kiosks

### 2. Wall Panel Check-In System
Wall panels are mounted displays where users scan their QR code badges to:
- Check into sessions/workshops
- Document attendance
- Record professional development hours
- Verify session eligibility

---

## Application Workflow

### 1. Initial Setup/ Running the application
- Ensure all environment variables are properly configured in `.env`
- Start the Docker services using `docker compose up`
- Run `npm run dev` inside /shared to start the frontend application
- Run `npm run dev inside /shared/server` to start the backend application

### 2. Authentication Flow
- Application uses AWS Cognito for user authentication
- Local development uses the configured `VITE_CLIENT_ID` and `VITE_CLIENT_SECRET`

### 3. API Communication
- Frontend communicates with ESCWorks(NextGen) API using configured endpoints
- Development: Uses local API at `http://localhost:3030/kiosk-express`
- Production: Uses deployed API endpoints based on environment

### 4. Database Interactions
- Application connects to both PostgreSQL and MSSQL databases
- PostgreSQL: Used for local development and storing application data
- MSSQL: Connects to ESCWorks system database for core business logic

### 5. Development Mode
- Set `VITE_ENVIRONMENT=development` for development features
- Debug mode can be toggled using `VITE_MODE_DEBUG_LOCAL_PROD`

### 6. QR Check-In Process
1. User scans QR code at kiosk
2. NextGen(API) validates user credentials if checks pass call lambda function to record attendance
3. Attendance is recorded in the database
4. Confirmation is displayed to user via panels

---

## Supported Environments
- Development
- QA
- UAT
- Production

Note: Each environment requires its own API configuration and credentials.

---

## Project Structure

### Directory Layout
```
/
├── shared/
│   ├── server/
│   │   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── models/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── styles/
│   │
│   ├── public/
│   └── .env
│
├── docker-compose.yml
├── package.json
└── README.md
```

### Directory Descriptions

#### /shared/server
- Contains the Express.js backend application
- Handles API requests
- Manages database connections
- Processes business logic

#### /shared/src
- Contains the React frontend application
- Manages UI components
- Handles user interactions
- Communicates with backend API

#### /shared/public
- Static files and assets
- Images
- Fonts
- Other static resources


