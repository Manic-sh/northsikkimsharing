import React, { useState, useEffect } from "react";
import PricingSummary from "./sidebar/PricingSummary";
import PromoCode from "./sidebar/PromoCode";
import { loadScript } from "@/utils/razorPayScript";
import axios from "axios";

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
      const { data: { key } } = await axios.get("http://www.localhost:5050/api/getkey")
      const response = await fetch("http://localhost:5050/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
          email: "mash.pro666@gmail.com",
          currency: "INR"
        }),
      });

      const order = await response.json();

      // Initialize Razorpay
      const options = {
        key: key,
        amount: totalPrice,
        currency: order.order.currency,
        name: "North Sikkim Sharing",
        description: "Test Transaction",
        image: "https://razorpay.com/docs/build/browser/static/razorpay-docs-dark.6f09b030.svg",
        order_id: order.order.id,

        "handler": async (response) => {
          const verifyResponse = await fetch("http://localhost:5050/api/paymentverification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            })
          })
          const paymentVerificationResult = await verifyResponse.json();
          if (paymentVerificationResult.success) {
            onPaymentSuccess(paymentVerificationResult)
          } else {
            // Payment failed, you can show an error message to the user
            console.error("Payment failed!");
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
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
