import dotenv from 'dotenv'
import Redis from "ioredis"
import getAccessToken from './token.js'

dotenv.config()

const resp = (token, status, cacheHit) => {
  const body = {
      "statusCode": status,
      "isBase64Encoded": false,
      "headers": {
          "Content-Type": "application/json",
          "x-access-token-cache-hit": cacheHit,
      },
      "body": token
    }
    
    return body
}

export const handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const client = new Redis("redis://kiosk-redis-0001-001.d7mmmy.0001.use1.cache.amazonaws.com:6379");

  client
  .on('error', (e) => {
    console.log(e)
    client.disconnect()
    callback(null, resp(e, 500))
    return
  })
  .on('close', () => {
    client.disconnect()
    callback(null, resp("client disconnected", 500))
    return
  })
  
  try {
    let isTokenCached = false
    const token = await client.get('access-token')
    if (!token) {
      console.log("Fetching a fresh token")

      token = await getAccessToken()
      await client.set('access-token', token, { EX: process.env.REDIS_ACCESS_TOKEN_TTL })
    } else {
      console.log("Using cached access token")
      isTokenCached = true
    }
    
    callback(null, resp(token, 200, isTokenCached));
  } catch (err) {
    console.error("Error fetching the token", err)
    callback(null, resp(null, 500, false));
  }
};
