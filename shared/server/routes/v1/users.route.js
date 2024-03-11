const express = require('express')

const router = express.Router();

const mockResp = {
    "user_profile": {
        "first_name":"Joe",
        "last_name":"Anderson",
        "email":"joe.anderson@esc4.net",
        "user_id":"123",
        "tenant_id":"123"
    }
}

router.get('/', async (req, res) => {
    try {
      res.status(200).json({"data": mockResp});
    } catch (error) {
      console.error('An error ocurred:', error);
      res.status(500).json(error);
    }
  });

  module.exports = router;