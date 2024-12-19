import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.ESCWORKS_API_URL;
const apiKey = process.env.ESCWORKS_API_KEY;
const router = express.Router();
import { query } from '../../db.js';

const getEventStmt = 'SELECT * FROM events WHERE id=$1 LIMIT 1';

router.get('/event', async (req, res) => {
  try {
    const { rows } = await query(getEventStmt, [req.query.eventId]);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

router.put('/check-in', async (req, res) => {
  try {
    const { userId, eventId, sessionDateTimeId } = req.body;

    if (!userId || !eventId || !sessionDateTimeId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const requestUrl = `${baseUrl}/session-events/${eventId}/attendance/${sessionDateTimeId}`;
    const request = { user_id: userId, eventId, sessionDateTimeId };
    const response = await axios.put(requestUrl, request, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('An error occurred:', error);

    // Extract the error code from the error message
    const errorCode = extractErrorCode(error.message);
    // Map error codes to HTTP status codes and messages
    const { statusCode, responseMessage } = mapErrorCodeToResponse(errorCode);
    res.status(statusCode).json(responseMessage);
  }

  // Helper function to extract error code from the message
  function extractErrorCode(message) {
    // Assuming the error code is a part of the message, e.g., "Error: CODE_404"
    // Extract the error code from the message
    const match = message.match(/\d+/);
    // Convert the matched string to an integer
    return match ? parseInt(match[0], 10) : null;
  }

  // Helper function to map error codes to status codes and response messages
  function mapErrorCodeToResponse(code) {
    switch (code) {
      case 200:
        return {
          statusCode: 200,
          responseMessage: {
            statusCode: 200,
            message: 'User successfully checked in.',
          },
        };
      case 400:
        return {
          statusCode: 400,
          responseMessage: {
            statusCode: 400,
            error: 'Invalid parameters provided.',
          },
        };
      case 402:
        return {
          statusCode: 402,
          responseMessage: {
            statusCode: 402,
            error: 'Payment is required to proceed with the check-in.',
          },
        };
      case 403:
        return {
          statusCode: 403,
          responseMessage: {
            statusCode: 403,
            error: 'Session validation failed or insufficient permissions.',
          },
        };
      case 404:
        return {
          statusCode: 404,
          responseMessage: {
            statusCode: 404,
            error: 'Session event or user not found.',
          },
        };
      case 409:
        return {
          statusCode: 409,
          responseMessage: {
            statusCode: 409,
            error: 'User has already checked in.',
          },
        };
      case 412:
        return {
          statusCode: 412,
          responseMessage: {
            statusCode: 412,
            error: 'Check-In Error',
          },
        };
      default:
        return {
          statusCode: 500,
          responseMessage: {
            statusCode: 500,
            error: 'An unexpected error occurred.',
          },
        };
    }
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
