import express from 'express'
const router = express.Router()
import { query } from '../../db.js'

router.get('/', async (req, res) => {
  try {
    const { email, first_name, last_name } = req.query

    const sqlQuery = `
        SELECT * FROM users
        INNER JOIN users_events ue ON users.id = ue.user_id
        INNER JOIN events e ON ue.event_id = e.id
        WHERE users.email = $1 AND LOWER(users.first_name) = LOWER($2) AND LOWER(users.last_name) = LOWER($3)
        ORDER BY e.start_time ASC
        LIMIT 1;
      `

    const { rows } = await query(sqlQuery, [email, first_name, last_name])

    res.status(200).json({ 'data': rows })
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
});

export default router