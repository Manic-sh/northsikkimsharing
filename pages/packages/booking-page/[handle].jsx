import CallToActions from "../../../components/common/CallToActions";
import Seo from "../../../components/common/Seo";
import Header2 from "../../../components/header/header-2";
import DefaultFooter from "../../../components/footer/default";
import StepperBooking from "../../../components/booking-page/stepper-booking";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { builder } from "@builder.io/sdk";


builder.init("02508b9173c94715834f124a5247ac79");

const Booking = () => {
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState();
  const [packageDetail, setPackageDetail] = useState(null);

  useEffect(() => {
    if (router.isReady) {

      const { handle } = router.query;

      if (!handle) <h1>Loading...</h1>;
      else { 
        async function fetchPackage() {
          const data = await builder.get("package", {
            fields: "data",
            includeRefs: true, // Currently this only gets one level of nested references
            cachebust: true,
            query: {
              // Get the specific article by handle
              "data.handle": handle,
            },
          }).promise() || null;
          setPackageDetail(data);
    
        }
    
        if (!router.query.handle) <h1>Loading...</h1>;
        else fetchPackage();

        setBookingInfo({
          "handle": handle,
          "jdate": router.query.dateOfJourney,
          'ptype': router.query.ptype,
          'adults': router.query.adults,
          'children': router.query.children
        });

      }
    }
  },[router.isReady]);

  return (
    <>
      <Seo pageTitle="Hotel Booking Page" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header2 />
      {/* End Header 1 */}

      <section className="pt-40 layout-pb-md">
        <div className="container">
          <StepperBooking bookingInfo={bookingInfo} packageDetail={packageDetail} />
        </div>
        {/* End container */}
      </section>
      {/* End stepper */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default Booking;
