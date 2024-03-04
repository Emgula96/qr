const express = require('express')
const app = express()
const port = 3030

// const pgp = require('pg-promise')({});
// const db = pgp('postgres://postgres:root@localhost:5432/postgres')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})