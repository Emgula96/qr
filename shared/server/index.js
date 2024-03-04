const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = 3030

app.use(cors())

// const pgp = require('pg-promise')({});
// const db = pgp('postgres://postgres:root@localhost:5432/postgres')

app.get('/api/test', (req, res) => {
  res.json({"data": "Welcome to Region 4!"})
})

app.listen(port, () => {
  console.log(`Kiosk Front-End Server Listening on Port: ${port}`)
})