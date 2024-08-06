import axios from 'axios';
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const baseUrl = process.env.ESCWORKS_API_URL;
const apiKey = process.env.ESCWORKS_API_KEY;
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const time = req.query.time;
        const roomName = req.query.roomname;
        const response = await axios.get(`${baseUrl}/rooms/${roomName}/session-events/${time}`, {
            headers: {
                'x-api-key': apiKey
            }
        });
        res.status(200).json({ 'data': response.data })
    } catch (error) {
      console.error('An error ocurred:', error)
      res.status(500).json(error)
    }
  })

export default router
