const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const routes =  require('./routes')

const app = express()
app.use(cors())
app.use(function (req, res, next) {
  res.setHeader('access-control-allow-origin', '*');
  next()
})
app.use('/kiosk-express', routes)

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

module.exports = app;