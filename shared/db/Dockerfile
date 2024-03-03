FROM postgres:14.1-alpine as db

WORKDIR /app
COPY ../scripts/init.sh /docker-entrypoint-initdb.d
COPY ../scripts/seed_db.sql ./scripts/db/seed_db.sql