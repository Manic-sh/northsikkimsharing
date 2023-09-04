import React, { useState, useEffect } from "react";
import CustomerInfo from "../CustomerInfo";
import PaymentInfo from "../PaymentInfo";
import OrderSubmittedInfo from "../OrderSubmittedInfo";
import { useRoomContext } from '@/context/RoomContext';
import { getTotalPrice } from '@/utils/totalPriceCalculator';


const Index = ({bookingInfo, packageDetail}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [basePrice, setBasePrice] = useState(packageDetail?.data?.basePricePerPerson);
  const [luxuryBasePrice, setLuxuryBasePrice] = useState(0);
  const [totalPackagePrice, setPackageTotalPrice] = useState(0);

  const { state } = useRoomContext();
  const room = state;

  useEffect(() => {
    setBasePrice(packageDetail?.data?.basePricePerPerson);
    if (bookingInfo?.ptype == 'Luxury') {
      const luxury = packageDetail?.data?.availablePackageType.find((ptype) => ptype?.typeName?.value?.name == 'Luxury');
      setLuxuryBasePrice(luxury?.typeName?.value?.data?.basePrice);
    }
  }, [packageDetail?.data?.basePricePerPerson, bookingInfo?.ptype]);

  const getTotalGuests = () => {
    let noGuests = room.reduce((accumulator, item) => {
      return accumulator + item?.adults + item?.children ;
    }, 0);
    return noGuests;
  }

  const getNumberOfAdults = () => {
    let noOfAdults = 0;
    room?.forEach(room => {
      noOfAdults += room?.adults;
    });
    return noOfAdults;
  }
  const getTotalPriceW = () => {
    // Using forEach to calculate total Adults and Children    
    let basePricePerAdult = 0;
    if (bookingInfo?.ptype == 'Luxury') {
      basePricePerAdult = luxuryBasePrice?  getTotalPrice(room.length, luxuryBasePrice, getNumberOfAdults()) : 0;
    } else {
      basePricePerAdult = basePrice ? getTotalPrice(room.length, basePrice, getNumberOfAdults()) : 0;
    }
    return basePricePerAdult;
  }

  if (packageDetail === null || bookingInfo === null) {
    return <div>Loading...</div>; // Handle the initial undefined state
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
      content: <PaymentInfo totalPrice={getTotalPriceW()} />,
    },
    {
      title: "Final Step",
      stepNo: "3",
      stepBar: "",
      content: <OrderSubmittedInfo />,
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
