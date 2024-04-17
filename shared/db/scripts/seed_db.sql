DROP TABLE IF EXISTS attendees;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users_events;

-- CreateTable Attendence
CREATE TABLE attendees (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
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
  "room_number" TEXT NOT NULL,
  "presenter" TEXT NOT NULL,
  "facilitator" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "credits" TEXT NOT NULL,
  "start_time" TIMESTAMP NULL,
  "notes" TEXT NOT NULL,
  "max_attendees" SMALLINT NOT NULL
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
  "user_id" INTEGER REFERENCES users(id), 
  "event_id" INTEGER REFERENCES events(id), 
  CONSTRAINT "users_events_pk" PRIMARY KEY(user_id,event_id),
  "paid" BOOL DEFAULT false
);

-- Seed
INSERT INTO users (first_name, last_name, email, phone) VALUES ('Bryan', 'Wheeler', 'bryan.wheeler@esc4.net', '555-555-5555');
INSERT INTO users (first_name, last_name, email, phone) VALUES ('John', 'Doe', 'john.doe@esc4.net', '555-555-5555');

INSERT INTO events (region, district, campus, title, location, start_time, room_number, presenter, facilitator, description, credits, notes, max_attendees) VALUES ('South Houston', 'District 9', 'Cool Campus', 'STEMulating Design Challenges in Science, Grades 9–12', 'Some Location', NOW(), 'MCC102', 'Jane Doe, PhD', 'Amanda Silva', 'Explore ways to implement TEKS-aligned design challenges in a high school science and CTE classroom. Experience using the engineering design process to address design challenges that support student growth and success in the classroom and beyond.', '6 CPE', 'This session has a restricted access window. Check in will not be permitted after 9:30 a.m.|This session requires check out in order to receive credit. Please scan your QR code once the session has ended', 30);
INSERT INTO events (region, district, campus, title, location, start_time, room_number, presenter, facilitator, description, credits, notes, max_attendees) VALUES ('South Houston', 'District 9', 'Cool Campus', 'STEMulating Design Challenges in Science, Grades 9–12', 'Some Location', NOW(), 'MCC102', 'Jane Doe, PhD', 'Amanda Silva', 'Explore ways to implement TEKS-aligned design challenges in a high school science and CTE classroom. Experience using the engineering design process to address design challenges that support student growth and success in the classroom and beyond.', '6 CPE', 'This session has a restricted access window. Check in will not be permitted after 9:30 a.m.|This session requires check out in order to receive credit. Please scan your QR code once the session has ended', 30);

INSERT INTO users_events (user_id, event_id, paid) VALUES (1, 1, true);
INSERT INTO users_events (user_id, event_id, paid) VALUES (1, 2, true);
INSERT INTO users_events (user_id, event_id, paid) VALUES (2, 2, false);
