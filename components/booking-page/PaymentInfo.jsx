import React, { useState, useEffect } from "react";
import PricingSummary from "./sidebar/PricingSummary";
import PromoCode from "./sidebar/PromoCode";
import { loadScript } from "@/utils/razorPayScript";

const PaymentInfo = ({ totalPrice, onPaymentSuccess }) => {
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);

  useEffect(() => {
    // Load the Razorpay script when the component mounts
    async function loadRazorpayScript() {
      const scriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
      }
    }

    loadRazorpayScript();
  }, []);

  const initiatePayment = async () => {
    try {
      setIsPaymentInitiated(true); // Disable the payment button

      // Call your Express API endpoint to create a Razorpay order
      const response = await fetch("https://nss-backend-services.onrender.com/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
          email: "mash.pro666@gmail.com",
        }),
      });

      const order = await response.json();

      // Initialize Razorpay
      const options = {
        key: "rzp_test_UXdf8YbAHfDH51",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: function (response) {
          const data = {
            orderCreationId: order.id,
            amountPaid: totalPrice,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          // Handle successful payment response
          onPaymentSuccess(data);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("We can't submit the form. Please try again later.");
    } finally {
      setIsPaymentInitiated(false); // Re-enable the payment button
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
          disabled={isPaymentInitiated}
        >
          {isPaymentInitiated ? "Payment Processing..." : "Payment Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
