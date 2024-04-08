# QR Check-In Front End Applications

## .env
Add the following .env under /shared directory
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

VITE_ENVIRONMENT=development

# These are only used for local development and working with AWS Cognito, these values will need to be fetched and used locally 
VITE_CLIENT_ID=
VITE_CLIENT_SECRET=
VITE_API_URL=http://localhost:3030/kiosk-express
VITE_MODE_DEBUG_LOCAL_PROD=false
```

Add the following .env under /shared/server
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432

HOST_URL=http://localhost:3030
```

## Starting the services
In /shared run
```
docker compose up
```