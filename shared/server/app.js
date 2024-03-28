const express = require('express')
const cors = require('cors')
const getAccessToken = require('./oauth2/token')
const dotenv = require('dotenv')
dotenv.config()

const routes =  require('./routes')

const app = express()
app.use(cors())

app.use((req, res, next) => {
  if (!req.headers.Authorization) {
    console.debug("Unauthorized, attempting to fetch an access token...")
    getAccessToken().then((token) => {
      res.set("Authorization", token)
      next()
    })
  } else {
    next()
  }
})

app.use('/kiosk-express', routes)

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

module.exports = app;