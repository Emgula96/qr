import express from 'express'
import QRCode from 'qrcode'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const string = `userId=${req.query.userId},sessionId=${req.query.sessionId}`
    QRCode.toString(string, { version: 10 }, function (err, url) {
      if (err) {
        throw err
      }

      res.status(200).json({ data: string })
    })
  } catch (error) {
    console.error('An error ocurred: ', error)
    res.status(500).json(error)
  }
})

export default router
