import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.ESCWORKS_API_URL;
const apiKey = process.env.ESCWORKS_API_KEY;
const router = express.Router();
import { query } from '../../db.js';

const checkInStmt = `
  INSERT INTO attendees (user_id, event_id, schedule_id, status, checked_in, checked_out)
  VALUES ($1, $2, '1', 1, $3, $4);
`;

const getUserEventStmt = `
  SELECT * FROM users
  INNER JOIN users_events ue ON users.id = ue.user_id
  INNER JOIN events e ON ue.event_id = e.id
  WHERE ue.user_id = $1 AND ue.event_id = $2;
`;

const attendenceRecordStmt =
  'SELECT * FROM attendees WHERE user_id=$1 AND event_id=$2';

const getEventStmt = 'SELECT * FROM events WHERE id=$1 LIMIT 1';

router.get('/event', async (req, res) => {
  try {
    console.log(req);
    const { rows } = await query(getEventStmt, [req.query.eventId]);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

router.put('/check-in', async (req, res) => {
  try {
    const { userId, sessionId, sessionDateTimeId } = req.body;

    if (!userId || !sessionId || !sessionDateTimeId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const mockTime = '2024-07-23T08:00:00'; // API expects a time; will be deprecated
    const requestUrl = `${baseUrl}/session-events/${sessionId}/attendance/${mockTime}`;
    const request = { userId }; // Include mockTime if necessary
    console.log(
      requestUrl,
      request,
      apiKey,
      ' requestUrl',
      ' request',
      ' apiKey'
    );
    const response = await axios.put(requestUrl, request, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM attendees WHERE event_id=$1', [
      req.query.eventId,
    ]);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

export default router;
