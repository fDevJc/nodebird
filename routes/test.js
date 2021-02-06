const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('test router execute');
  res.send('Hello Test');
});

module.exports = router;
