# QR Check-In Front End Applications

## .env
Add the following .env under /shared directory
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

# VITE_FRONT_END_SERVER_URL=http://localhost:3030/kiosk-express
VITE_FRONT_END_SERVER_URL=https://qlfz9ox1dk.execute-api.us-east-1.amazonaws.com/development/kiosk-express

CLIENT_ID=
CLIENT_SECRET=
API_AUTH_TOKEN_URL=https://kiosk.auth.us-east-1.amazoncognito.com/oauth2/token
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