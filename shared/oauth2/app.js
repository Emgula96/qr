import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from 'redis'
import getAccessToken from './token.js'

dotenv.config()

const app = express()
app.use(cors())

let url
if (process.env.NODE_ENV === 'production') {
  url = process.env.REDIS_HOST
} else {
  url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
}

const client = await createClient({ url })
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

app.get('/health', (req, res) => {
  const body = {
    "isBase64Encoded": false,
    "statusCode": 200,
    "statusDescription": "200 OK",
    "headers": {
        "Set-cookie": "cookies",
        "Content-Type": "application/json"
    },
    "body": "Hello from Lambda (optional)"
  }

  res.status(200).send(body)
})

app.get('/token', async (req, res) => {
  try {
    let token

    if (client) {
      token = await client.get('access-token')
      if (!token) {
        console.log("Fetching a fresh token")
  
        token = await getAccessToken()
        await client.set('access-token', token, { EX: process.env.REDIS_ACCESS_TOKEN_TTL })
      } else {
        console.log("Using cached access token")
      }
    } else {
      const token = await getAccessToken()
    }

    res.status(200).json({ data: token })
  } catch (err) {
    console.error("Error fetching the token", err)
    return res.status(500).send(err)
  }
})

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

export default app