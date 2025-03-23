const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password' // Use the App Password, NOT your Gmail password
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, phone, position } = req.body;

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'your_email@gmail.com', // Change this to where you want to receive emails
    subject: 'New Job Application',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
