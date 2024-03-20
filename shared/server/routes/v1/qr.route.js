const express = require('express')
var QRCode = require('qrcode')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        QRCode.toDataURL(`${process.env.HOST_URL}/kiosk-express/v1/attendence/check-in?userId=${req.query.userId}&eventId=${req.query.eventId}&scheduleId=${req.query.scheduleId}`, function (err, url) {
            res.status(200).json({"data": url});
        })
    } catch (error) {
      console.error('An error ocurred:', error);
      res.status(500).json(error);
    }
  });

  module.exports = router;