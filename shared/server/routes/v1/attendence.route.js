const express = require('express')
const pg = require('pg');

const poolConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
}

if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = {
    rejectUnauthorized: false
  }
}

const pool = new pg.Pool(poolConfig);

async function queryDatabase(query) {
  const client = await pool.connect();
  const result = await client.query(query);
  client.release();
  return result;
}

const router = express.Router();

const checkInStmt = (userId, status, checkedIn, checkedOut) => {
  const stmt = `
    INSERT INTO attendee (user_id, status, checked_in, checked_out)
    VALUES ('${userId}', ${status}, ${checkedIn}, ${checkedOut})
    ON CONFLICT(user_id)
    DO UPDATE SET
      status = EXCLUDED.status,
      checked_in = EXCLUDED.checked_in,
      checked_out = EXCLUDED.checked_out;
  `

  return stmt
}

const hasAttendenceRecordStmt = (userId, eventId, scheduleId) => {
  const stmt = `SELECT EXISTS(SELECT 1 FROM attendee WHERE user_id='${userId}' AND event_id='${eventId}' AND schedule_id='${scheduleId}')`
  return stmt
}

router.get('/check-in', async (req, res) => {
  try {
    const hasRecordSql = hasAttendenceRecordStmt(req.query.userId, req.query.eventId, req.query.scheduleId)
    const hasRecordResult = await queryDatabase(hasRecordSql)
    console.log("HAS RECORD", hasRecordResult.rows[0].exists)

    const checkInSql = checkInStmt(req.query.userId, 1, true, false)
    const checkInResult = await queryDatabase(checkInSql);
    res.status(200).json({"data": checkInResult.rows});
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await queryDatabase('SELECT * FROM attendee');
    res.status(200).json({"data": result.rows});
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

  module.exports = router;