const express = require('express')
var QRCode = require('qrcode')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {userId, eventId, scheduleId} = req.query
        if (!userId || !eventId || !scheduleId) {
            throw "required query params not set"
        }

        const url = `${process.env.HOST_URL}/kiosk-express/v1/attendence/check-in?userId=${req.query.userId}&eventId=${req.query.eventId}&scheduleId=${req.query.scheduleId}`
        QRCode.toDataURL(url, { version: 10 }, function (err, url) {
            if (err) {
                throw err
            }

            res.status(200).json({"data": url});
        })
    } catch (error) {
      console.error('An error ocurred:', error);
      res.status(500).json(error);
    }
  });

  module.exports = router;