DROP TABLE IF EXISTS attendee;

-- CreateTable
CREATE TABLE attendee (
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

-- Seed
INSERT INTO attendee (user_id, event_id, schedule_id, status, checked_in, checked_out) VALUES ('user_1', 'test_event', 'test_schedule', 1, false, false);