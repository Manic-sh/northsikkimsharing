import { useState } from "react";
import PricingSummary from "./sidebar/PricingSummary";
import PromoCode from "./sidebar/PromoCode";
import axios from 'axios';

const PaymentInfo = ({ totalPrice }) => {
  const [paymentForm, setPaymentForm] = useState(null);
  const [formData, setFormData] = useState({
    merchantId: 2642500,
    orderID: "",
    currency: "",
    amount: 0.0,
    redirectURL: 'http://127.0.0.1:3002/ccavResponseHandler', // Default redirect URL
    cancelURL: 'http://127.0.0.1:3002/ccavResponseHandler',     // Default cancel URL
    language: 'en',

  });

  const [htmlResponse, setHtmlResponse] = useState('');
  const [showIframe, setShowIframe] = useState(false); // State to control iframe visibility

  const initiatePayment = async () => {
    // try {
    //   const response = await axios.post('/api/payment');
    //   setPaymentForm(response.data.paymentForm);
    // } catch (error) {
    //   console.error(error);
    // }
    // e.preventDefault();

    try {
      const response = await fetch("https://nss-backend-services.onrender.com/iframe/ccavRequestHandler", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        const htmlres = await response.text();
        setPaymentForm(htmlres);
        setShowIframe(true);
      } else {
        const errorMessage = await response.text();
        console.log(errorMessage);
      }
    } catch (err) {
      console.error(err);
      alert("We can't submit the form, try again later?");
    }
  };

  const handleCloseModal = () => {
    setShowIframe(false);
  };
  
  return (
    <>
      <div className="col-xl-7 col-lg-8">
        <div id="ccavenue-frame">
        {paymentForm ? (
            <div dangerouslySetInnerHTML={{ __html: paymentForm }} />
        ): ""}
        </div>
      </div>
      <div className="col-xl-5 col-lg-4">
        <div className="booking-sidebar">
          <PricingSummary totalPrice={totalPrice} />
          <PromoCode />
            <button className="button h-60 px-24 -dark-1 bg-blue-1 text-white mt-10 w-100" onClick={initiatePayment} disabled={showIframe? true: false}>Initiate Payment</button>
        </div>
      </div>
      {/* payment sidebar info */}
    </>
  );
};

export default PaymentInfo;
