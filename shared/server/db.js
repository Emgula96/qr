import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const poolConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
}

if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = {
    rejectUnauthorized: false
  }
}

const pool = new pg.Pool(poolConfig);

export const query = (text, params) => pool.query(text, params);