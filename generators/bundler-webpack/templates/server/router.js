const express = require('express');
const router = express.Router();

<% if (context) { %>
const context = require('./context.js')
<% } %>

router.get('/', function(req, res) {
  <% if (context) { %>
  const ctx = context.getContext();
  <% } else { %>
  const ctx = {};
  <% } %>
  res.render('index.html', ctx);
});

module.exports = router;
