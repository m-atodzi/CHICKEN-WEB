const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Replace with your Twilio Account SID
const authToken = 'zYOUR_TWILIO_AUTH_TOKEN'; // Replace with your Twilio Auth Token
const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER'; // Replace with your Twilio phone number

const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.json());

// Serve static files from the project directory
app.use(express.static(path.join(__dirname)));

// Endpoint to handle form submissions
app.post('/send-sms', (req, res) => {
  const { name, contact, address } = req.body;

  const message = `New Buyer Details:\nName: ${name}\nContact: ${contact}\nAddress: ${address}`;

  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: 'YOUR_PHONE_NUMBER' // Replace with your phone number to receive SMS
    })
    .then(() => {
      res.status(200).send('SMS sent successfully!');
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
      res.status(500).send('Failed to send SMS.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});