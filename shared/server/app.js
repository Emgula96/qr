const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const routes =  require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/kiosk-express', routes)

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

// const pgp = require('pg-promise')({});
// const db = pgp('postgres://postgres:root@localhost:5432/postgres')

// app.get('/kiosk-express', (req, res) => {
//   res.json({"data": "Welcome to Region 4!"})
// })

module.exports = app;