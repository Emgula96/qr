const express = require('express')
const pg = require('pg');

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
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
      const result = await queryDatabase('SELECT * FROM attendee');
      res.status(200).json({"data": result.rows});
    } catch (error) {
      console.error('An error ocurred:', error);
      res.status(500).json(error);
    }
  });

  module.exports = router;