import React, { useState, useEffect } from "react";
import CustomerInfo from "../CustomerInfo";
import PaymentInfo from "../PaymentInfo";
import OrderSubmittedInfo from "../OrderSubmittedInfo";
import { useRoomContext } from '@/context/RoomContext';
import { calculateTotalPrice } from '@/utils/roomPriceCalculator';
import { updateDatePrice } from '@/utils/datePriceUpdater';
import { getPackageTypeId } from '@/utils/getPackageTypeId';

const Index = ({ bookingInfo, packageDetail }) => {

  console.log("🚀 ~ file: index.jsx:12 ~ Index ~ bookingInfo:", bookingInfo);

  const [currentStep, setCurrentStep] = useState(0);
  const [basePrice, setBasePrice] = useState();
  const [selectedPackage, setSelectedPackage] = useState(packageDetail);
  const [razorpayResponse, setRazorpayResponse] =  useState({});

  const { state } = useRoomContext();
  const room = state;

  useEffect(() => {
    setSelectedPackage(packageDetail);
    const packageTid = getPackageTypeId(bookingInfo?.ptype, packageDetail);
    const newBasePrice = updateDatePrice(packageDetail, bookingInfo?.jdate, packageTid);
    setBasePrice(newBasePrice);
  }, [packageDetail, bookingInfo?.ptype, bookingInfo?.jdate]);

  const getTotalGuests = () => {
    return room.reduce((accumulator, item) => accumulator + (item?.adults || 0) + (item?.children || 0), 0);
  };


  const getNumberOfAdults = () => {
    return room?.reduce((accumulator, room) => accumulator + (room?.adults || 0), 0);
  };

  const getTotalPrice = () => {
    const basePricePerAdult = basePrice ? calculateTotalPrice(basePrice, room.length, getNumberOfAdults()) : 0;
    return basePricePerAdult;
  };

  // Function to handle payment success and move to the next step
  const handlePaymentSuccess = (data) => {
      setRazorpayResponse(data);
      setCurrentStep(currentStep + 1); // Move to the next step
  };

  if (!packageDetail || !bookingInfo) {
    return <div>Loading...</div>;
  }

  const steps = [
    {
      title: "Personal Details",
      stepNo: "1",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <CustomerInfo bookingInfo={bookingInfo} packageDetail={packageDetail}  />,
    },
    {
      title: "Payment Details",
      stepNo: "2",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <PaymentInfo totalPrice={getTotalPrice()} onPaymentSuccess={handlePaymentSuccess} />,
    },
    {
      title: "Final Step",
      stepNo: "3",
      stepBar: "",
      content: <OrderSubmittedInfo  razorpayResponse={razorpayResponse} />,
    },
  ];

  const renderStep = () => {
    const { content } = steps[currentStep];
    return <>{content}</>;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="row x-gap-40 y-gap-30 items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="col-auto">
              <div
                className="d-flex items-center cursor-pointer transition"
                onClick={() => setCurrentStep(index)}
              >
                <div
                  className={
                    currentStep === index
                      ? "active size-40 rounded-full flex-center bg-blue-1"
                      : "size-40 rounded-full flex-center bg-blue-1-05 text-blue-1 fw-500"
                  }
                >
                  {currentStep === index ? (
                    <>
                      <i className="icon-check text-16 text-white"></i>
                    </>
                  ) : (
                    <>
                      <span>{step.stepNo}</span>
                    </>
                  )}
                </div>

                <div className="text-18 fw-500 ml-10"> {step.title}</div>
              </div>
            </div>
            {/* End .col */}

            {step.stepBar}
          </React.Fragment>
        ))}
      </div>
      {/* End stepper header part */}

      <div className="row">{renderStep()}</div>
      {/* End main content */}

      <div className="row x-gap-20 y-gap-20 pt-20">
        <div className="col-auto">
          <button
            className="button h-60 px-24 -blue-1 bg-light-2"
            disabled={currentStep === 0}
            onClick={previousStep}
          >
            Previous
          </button>
        </div>
        {/* End prvious btn */}

        <div className="col-auto">
          <button
            className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
            disabled={currentStep === steps.length - 1}
            onClick={nextStep}
          >
            Next <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
        {/* End next btn */}
      </div>
      {/* End stepper button */}
    </>
  );
};

export default Index;
