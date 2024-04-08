DROP TABLE IF EXISTS attendees;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users_events;

-- CreateTable Attendence
CREATE TABLE attendees (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL UNIQUE,
  "event_id" TEXT NOT NULL,
  "schedule_id" TEXT NOT NULL,
  "status" SMALLINT NOT NULL,
  "checked_in" BOOL NOT NULL,
  "checked_in_timestamp" TIMESTAMP NULL,
  "checked_out" BOOL NOT NULL,
  "checked_out_timestamp" TIMESTAMP NULL,
  "checked_out_created_by" VARCHAR(35) NULL
);

-- CreateTable Events
CREATE TABLE events (
  "id" SERIAL PRIMARY KEY,
  "region" TEXT NOT NULL,
  "district" TEXT NOT NULL,
  "campus" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "start_time" TIMESTAMP NULL
);

-- CreateTable Users
CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL
);

-- CreateTable Users_Events
CREATE TABLE users_events(
  user_id INTEGER REFERENCES users(id), 
  event_id INTEGER REFERENCES events(id), 
  CONSTRAINT users_events_pk PRIMARY KEY(user_id,event_id) 
);

-- Seed
INSERT INTO users (first_name, last_name, email, phone) VALUES ('Bryan', 'Wheeler', 'bryan.wheeler@esc4.net', '555-555-5555');
INSERT INTO users (first_name, last_name, email, phone) VALUES ('John', 'Doe', 'john.doe@esc4.net', '555-555-5555');

INSERT INTO events (region, district, campus, title, location, start_time) VALUES ('South Houston', 'District 9', 'Cool Campus', 'Super Cool Training Session', 'Some Location', NOW());
INSERT INTO events (region, district, campus, title, location, start_time) VALUES ('South Houston', 'District 9', 'Cool Campus', 'Super Cool Training Session 2', 'Some Location', NOW() + '1 day');

INSERT INTO users_events (user_id, event_id) VALUES (1, 1);
INSERT INTO users_events (user_id, event_id) VALUES (1, 2);
INSERT INTO users_events (user_id, event_id) VALUES (2, 2);