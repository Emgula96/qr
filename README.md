# QR Check-In Front End Applications

## .env
Add the following .env under /shared directory
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5432

VITE_FRONT_END_SERVER_URL=http://localhost:3030
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