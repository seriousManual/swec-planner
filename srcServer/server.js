const express = require('express');
const bodyParser = require('body-parser');

const { initializeSessions } = require('./sessions');
const { listSessions } = require('./controllers/list-sessions');
const { saveSubscriptions } = require('./controllers/save-subscriptions');

const PORT = 8080;

initializeSessions();

express()
  .use(express.static('build'))
  .use(bodyParser.json())
  .get('/sessions', listSessions)
  .post('/api/save-subscription/', saveSubscriptions)
  .listen(PORT, () => console.log(`listening: ${PORT}`));
