const express = require('express')
const pg = require('pg');

const pool = new pg.Pool({
  user: "postgres",
  password: "kioskdev",
  host: "kiosk.ce8uwnpsqkhc.us-east-1.rds.amazonaws.com",
  database: "kiosk",
  port: "5432",
  ssl: {
      rejectUnauthorized: false
  }
});

async function queryDatabase(query) {
  const client = await pool.connect();
  const result = await client.query(query);
  client.release();
  return result;
}

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await queryDatabase('SELECT * FROM kiosk.attendees');
      res.status(200).json({"data": result.rows});
    } catch (error) {
      console.error('An error ocurred:', error);
      res.status(500).json(error);
    }
  });

  module.exports = router;