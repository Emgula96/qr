const express = require('express')
const app = express()
const port = 3030

// const pgp = require('pg-promise')({});
// const db = pgp('postgres://postgres:root@localhost:5432/postgres')

app.get('/api/test', (req, res) => {
  res.json({"data": "Region 4!"})
})

app.listen(port, () => {
  console.log(`Kiosk Front-End Server Listening on Port: ${port}`)
})