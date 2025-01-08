import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.ESCWORKS_API_URL;
const apiKey = process.env.ESCWORKS_API_KEY;
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { time, roomname } = req.query;

    const response = await axios.get(
      `${baseUrl}/rooms/${roomname}/session-events/${time}`,
      {
        headers: {
          'X-API-Key': apiKey,
        },
      }
    );

    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error('Request details:', {
      url: `${baseUrl}/rooms/${roomname}/session-events/${time}`,
      headers: {
        'X-API-Key': process.env.ESCWORKS_API_KEY,
      },
      error: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });

    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

export default router;
