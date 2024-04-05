import express from 'express'
import QRCode from 'qrcode'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      throw 'userID not set'
    }

    const url = `${process.env.HOST_URL}/v1/attendence/check-in?id=${req.query.id}}`
    QRCode.toDataURL(url, { version: 10 }, function (err, url) {
      if (err) {
        throw err
      }

      res.status(200).json({ 'data': url })
    })
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

export default router