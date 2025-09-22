FROM postgres:14.1-alpine

WORKDIR /db
COPY ./scripts/init.sh /docker-entrypoint-initdb.d
COPY ./scripts/seed_db.sql ./scripts/seed_db.sql
