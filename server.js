// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const ccavenue = require('ccavenue');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CC Avenue Configuration
const ccavenueConfig = {
  merchant_id: '2642500',
  working_key: '2ECBD7426D8709922E27043E0A2DA2F4',
  access_code: 'AVLO86KG54AS07OLSA',
  redirect_url: 'http://yourdomain.com/payment-success', // Update this with your success URL
};

// Create a CC Avenue instance
const ccav = ccavenue(ccavenueConfig);

// Payment Route
app.post('/payment', (req, res) => {
  // Process the payment request and generate a payment form
  const paymentData = {
    order_id: 'YOUR_ORDER_ID', // Replace with your order ID
    amount: '100', // Replace with the order amount
    currency: 'INR', // Currency code
    redirect_url: 'http://yourdomain.com/payment-response', // Update this with your response URL
    cancel_url: 'http://yourdomain.com/payment-cancel', // Update this with your cancel URL
  };

  const paymentForm = ccav.getPaymentForm(paymentData);
  res.send(paymentForm);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
