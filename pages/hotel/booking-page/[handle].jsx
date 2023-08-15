import CallToActions from "../../../components/common/CallToActions";
import Seo from "../../../components/common/Seo";
import Header2 from "../../../components/header/header-2";
import DefaultFooter from "../../../components/footer/default";
import StepperBooking from "../../../components/booking-page/stepper-booking";
import { useRouter } from "next/router";
import { useState } from "react";

const Booking = () => {
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState({
    "handle": router.query.handle,
    "adults": router.query.adults,
    "noOfChildren": router.query.children,
    "rooms": router.query.rooms,
    "jdate": router.query.dateOfJourney,
  })
  console.log(bookingInfo);

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
          <StepperBooking bookingInfo={bookingInfo}/>
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
