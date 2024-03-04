import express from 'express';

// TODO: The express proxy will handle API connections for both the attendees and nextgen backend APIs

export const app = express();
app.get('/api/test', (_, res) => 
    res.json({ greeting: "Hello" }
))