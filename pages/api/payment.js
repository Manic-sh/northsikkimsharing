// pages/api/payment.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://localhost:3001/payment'); // Adjust the URL if needed
      res.status(200).json({ paymentForm: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Payment initiation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}