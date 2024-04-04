const express = require('express')
var QRCode = require('qrcode')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {userId} = req.query
        if (!userId) {
            throw "userID not set"
        }

        const url = `${process.env.HOST_URL}/v1/attendence/check-in?userId=${req.query.userId}}`
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