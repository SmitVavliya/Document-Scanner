const express = require('express');
const config = require('./config');

const app = express();

const client = require('twilio')(config.accountSID, config.authToken);

app.get('/login', (req, res) => {
  client.verify
    .services(config.serviceID)
    .verifications.create({
      to: `+${req.query.phonenumber}`,
      channel: req.query.channel,
    })
    .then(data => {
      res.status(200).send(data);
    });
});

app.get('/verify', (req, res) => {
  client.verify
    .services(config.serviceID)
    .verificationChecks.create({
      to: `+${req.query.phonenumber}`,
      code: req.query.code,
    })
    .then(data => {
      res.status(200).send(data);
    });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
