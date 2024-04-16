import express from 'express'
import QRCode from 'qrcode'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const url = `${process.env.HOST_URL}/check-in?eventId=${req.query.eventId}&userId=${req.query.userId}`
    QRCode.toDataURL(url, { version: 10 }, function (err, url) {
      if (err) {
        throw err
      }

      res.status(200).json({ data: url })
    })
  } catch (error) {
    console.error('An error ocurred: ', error)
    res.status(500).json(error)
  }
})

export default router
