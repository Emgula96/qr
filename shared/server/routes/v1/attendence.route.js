import express from 'express'
const router = express.Router()
import { query } from '../../db.js'

const checkInStmt = `
  INSERT INTO attendees (user_id, event_id, schedule_id, status, checked_in, checked_out)
  VALUES ($1, $2, '1', 1, $3, $4)
  ON CONFLICT(user_id)
  DO UPDATE SET
    status = EXCLUDED.status,
    checked_in = EXCLUDED.checked_in,
    checked_out = EXCLUDED.checked_out;
`

const hasAttendenceRecordStmt = 'SELECT EXISTS(SELECT 1 FROM attendees WHERE user_id=$1 AND event_id=$2)'

const getEventStmt = 'SELECT * FROM events WHERE id=$1 LIMIT 1'

router.get('/event', async (req, res) => {
  try {
    const { rows } = await query(getEventStmt, [req.query.eventId])
    res.status(200).json({ 'data': rows })
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

router.get('/check-in', async (req, res) => {
  try {
    const hasRecordResult = await query(hasAttendenceRecordStmt, [req.query.userId, req.query.eventId])
    if (!hasRecordResult.rows[0]?.exists) {
      const checkInResult = await query(checkInStmt, [req.query.userId, req.query.eventId, true, false])
      
      if (checkInResult.rowCount > 0) {
        console.log('Check in success')
        return res.status(200).json({ data: {} })
      }

      return res.status(500).json({ message: 'db error at check in' })
    } else {
      console.log('User has existing check-in record')
      
      return res.status(400).json({ message: 'user already has a check-in record' })
    }
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM attendees WHERE event_id=$1', [req.query.eventId]);
    res.status(200).json({ 'data': rows })
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

export default router
