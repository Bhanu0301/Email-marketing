const nodemailer = require('nodemailer');
const User = require('./back'); // Replace with the actual path to your User model

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhanu0301reddy@gmail.com', // Your Gmail email address
    pass: 'iahhdsrxhuwjnayd', // Your Gmail password or app-specific password
  },
});

// Query the database for users with age greater than 18 and retrieve their email addresses
User.find({ age: { $gt: 18 } }, 'email', (err, users) => {
  if (err) {
    console.error('Error querying the database:', err);
    return;
  }

  // Iterate through the retrieved users and send emails to their addresses
  users.forEach(user => {
    // Define your email content
    const mailOptions = {
      from: 'bhanu0301reddy@gmail.com', // Sender's email address
      to: user.email, // Recipient's email address from the user document
      subject: 'Welcome to Reliance dataStore',
      text: 'Hello, this is the content of your email.',
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });
});
