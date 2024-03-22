// routes/subscriptionRoute.js
const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscription');

// GET all subscriptions

router.get('/get-all-subsriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.json(subscriptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single subscription by ID
router.get('/get-subscription/:id', getSubscription, (req, res) => {
    res.json(res.subscription);
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'olajoycelyn.ak@gmail.com',
      pass: 'dbdrxfajchwiexch',
    },
  });
  
  // API endpoint for subscription
  router.post('/create-subscribe', (req, res) => {
    const { email } = req.body;
  
    // Email options
    const mailOptions = {
      from: 'olajoycelyn.ak@gmail.com',
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our service!',
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Failed to send email');
      }
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    });
  });
  

// Middleware to get a subscription by ID
async function getSubscription(req, res, next) {
    let subscription;
    try {
        subscription = await Subscription.findById(req.params.id);
        if (subscription == null) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscription = subscription;
    next();
}

// Export the router
module.exports = router;
