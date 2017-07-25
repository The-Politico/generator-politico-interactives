const context = require('./context.js')
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  const ctx = context.getContext();
  res.render('index.html', ctx);
});

module.exports = router;
