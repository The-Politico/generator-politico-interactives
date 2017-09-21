const express = require('express');
<% if (context) { %>
const context = require('./context.js');
<% } %>

const router = express.Router();

router.get('/', (req, res) => {
  <% if (context) { %>
  const ctx = context.getContext();
  <% } else { %>
  const ctx = {};
  <% } %>
  res.render('index.html', ctx);
});

router.get('/:view.html', (req, res) => {
  <% if (context) { %>
  const ctx = context.getContext();
  <% } else { %>
  const ctx = {};
  <% } %>
  res.render(`${req.params.view}.html`, ctx)
});

router.get('/*/:view.html', (req, res) => {
  <% if (context) { %>
  const ctx = context.getContext();
  <% } else { %>
  const ctx = {};
  <% } %>
  res.render(req._parsedUrl.path.substr(1), ctx);
});

module.exports = router;
