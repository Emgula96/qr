const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors())

// const pgp = require('pg-promise')({});
// const db = pgp('postgres://postgres:root@localhost:5432/postgres')

app.get('/kiosk-express', (req, res) => {
  res.json({"data": "Welcome to Region 4!"})
})

module.exports = app;