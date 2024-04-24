import express from 'express'
const router = express.Router()
import { query } from '../../db.js'

const checkInStmt = `
  INSERT INTO attendees (user_id, event_id, schedule_id, status, checked_in, checked_out)
  VALUES ($1, $2, '1', 1, $3, $4);
`

const getUserEventStmt = `
  SELECT * FROM users
  INNER JOIN users_events ue ON users.id = ue.user_id
  INNER JOIN events e ON ue.event_id = e.id
  WHERE ue.user_id = $1 AND ue.event_id = $2;
`

const attendenceRecordStmt = 'SELECT * FROM attendees WHERE user_id=$1 AND event_id=$2'

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
    // Fetch the attendence record for the user
    const { rows } = await query(attendenceRecordStmt, [req.query.userId, req.query.eventId]) 
    if (rows.length > 1) {
      return res.status(200).json({ data: { code: 'MULTICHECKIN', header: 'Already checked into another event', message: 'You are already checked into another event', status: false } })
    } else if (rows.length !== 0 && rows[0].checked_in) {
      return res.status(200).json({ data: { code: 'ALREADYCHECKIN', header: 'Already Checked In', message: 'You have already checked into this event', status: false } })
    }

    // Fetch the user event record
    const eventRecordResult = await query(getUserEventStmt, [req.query.userId, req.query.eventId])
    if (!eventRecordResult.rows.length) {
      return res.status(200).json({ data: { code: 'NONREGISTER', header: 'Not Registered', message: 'You are not registered for this event', status: false } })
    } else if (!eventRecordResult.rows[0].paid) {
      return res.status(200).json({ data: { code: 'NOPAY', header: 'Payment Not Received', message: 'You have not payed for this event', status: false } } )
    }

    // Check the user in
    const checkInResult = await query(checkInStmt, [req.query.userId, req.query.eventId, true, false])
    if (checkInResult) {
      res.status(200).json({ data: { code: 'CHECKIN', header: 'Checked In', message: 'You have checked into this event', status: true } })
    } else {
      res.status(500).json()
    }
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM attendees WHERE event_id=$1', [req.query.eventId])
    res.status(200).json({ 'data': rows })
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

export default router
