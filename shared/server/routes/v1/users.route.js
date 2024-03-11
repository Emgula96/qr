const express = require('express')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      res.status(200).json({"data": "Welcome to Region 4!"});
    } catch (error) {
      console.error('An error ocurred:', error);
      res.status(500).json(error);
    }
  });

  module.exports = router;