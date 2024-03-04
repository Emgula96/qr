import express from 'express';
const pgp = require('pg-promise')({
    // Initialization Options
});


const db = pgp('postgres://postgres:root@localhost:5432/postgres')

// TODO: The express proxy will handle API connections for both the attendees and nextgen backend APIs

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist'
  app.use(express.static(frontendFiles))
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html')
  })
  app.listen(process.env['PORT'])
}

export const app = express();

app.get('/api/test', (_, res) => {
    db.one('SELECT * FROM test.attendee')
    .then((data) => {
        console.log('DATA:', data.value)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    })
})