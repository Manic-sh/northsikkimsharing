import { useState } from "react";
import PricingSummary from "./sidebar/PricingSummary";
import PromoCode from "./sidebar/PromoCode";
import {loadScript} from '@/utils/razorPayScript';

const PaymentInfo = ({ totalPrice, onPaymentSuccess }) => {
  const [showIframe, setShowIframe] = useState(false);

  const initiatePayment = async () => {
    try {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
      }
      // Call your Express API endpoint to create a Razorpay order
      const response = await fetch('https://nss-backend-services.onrender.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1, // You can use the 'totalPrice' prop here if needed
          email: "mash.pro666@gmail.com",
        }),
      });

      const order = await response.json();

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_UXdf8YbAHfDH51',
        amount: order.amount,
        currency: 'INR', // Change it based on your currency
        order_id: order.id,
        handler: function (response) {
          // Handle successful payment response
          onPaymentSuccess();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("We can't submit the form, try again later?");
    }
  };

  return (
    <div className="col-xl-5 col-lg-4">
      <div className="booking-sidebar">
        <PricingSummary totalPrice={totalPrice} />
        <PromoCode />
        <button
          className="button h-60 px-24 -dark-1 bg-blue-1 text-white mt-10 w-100"
          onClick={initiatePayment}
          disabled={showIframe}
        >
          Initiate Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
