import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import "photoswipe/dist/photoswipe.css";
import Seo from "../../../components/common/Seo";
import Header2 from "../../../components/header/header-2";
import Overview from "../../../components/hotel-single/Overview";
import Itinerary from "@/components/hotel-single/Itinerary";

import PopularFacilities from "../../../components/hotel-single/PopularFacilities";
import CallToActions from "../../../components/common/CallToActions";
import Footer2 from "../../../components/footer/footer-2";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RoomsCount from "@/components/hotels/RoomsCount";
import PropertyHighlights2 from "../../../components/hotel-single/PropertyHighlights2";
import { builder } from "@builder.io/sdk";
import Link from "next/link";
import { calculateTotalPrice } from '@/utils/roomPriceCalculator';
import { useRoomContext } from '@/context/RoomContext';
import { updateDatePrice } from '@/utils/datePriceUpdater';
import SlideGallery from '@/components/hotel-single/SlideGallery';

builder.init("02508b9173c94715834f124a5247ac79");


const HotelSingleV2Dynamic = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [packageDetail, setPackageDetail] = useState(null);
  const [packageType, setPackageType] = useState('Standard');
  const [packageTypeId, setPackageTypeId] = useState('4c1a3a64978d4df29a35150965916882')
  const [basePrice, setBasePrice] = useState();
  const [packageTypeDetails, setPackageTypeDetails] = useState(null);

  const [isSolo, setIsSolo] = useState(false);
  const { state } = useRoomContext();

  const room = state;

  const handleSetPackageType = (value, typeId) => {
    setPackageType(value);
    setPackageTypeId(typeId);
  }

  useEffect(() => {
    if (router.isReady) {
      const { handle, dateOfJourney } = router.query;

      if (!handle) <h1>Loading...</h1>;
      else {
        fetchPackage(handle, dateOfJourney);
        fetchPackageTypeDetails();
      }
    }
    async function fetchPackage(handle, dateOfJourney) {
      const data = await builder.get("package", {
        fields: "data",
        includeRefs: true, // Currently this only gets one level of nested references
        cachebust: true,
        query: {
          // Get the specific article by handle
          "data.handle": handle,
        },
      }).promise() || null;
      // Set Package Deatils 
      setPackageDetail(data);


      function getPackageTypeId(packageName) {
        const availablePackageType = data?.data?.availablePackageType;
        const matchingPackage = availablePackageType.find((packageType) => {
          return packageType?.typeName?.typeName?.value?.data?.name === packageName;
        });

        if (matchingPackage) {
          return matchingPackage.typeName?.typeName?.value?.id;
        } else {
          return null; // Return null if the package name is not found
        }
      }
      const packageTid = getPackageTypeId(packageType);




      setBasePrice(updateDatePrice(packageDetail, dateOfJourney, packageTid));
      //setBasePrice(data?.data?.pricingPeriods?.value?.data?.basePrice?.standard);  
      if (getTotalGuests == 1) {
        setIsSolo(true);
        setBasePrice(basePrice + 1000);
      }
    }

    async function fetchPackageTypeDetails() {
      const packageData = await builder.get("package-type", {
        fields: "data",
        includeRefs: true, // Currently this only gets one level of nested references
        cachebust: true,
        query: {
          // Get the specific article by handle
          "data.typeName.id": packageTypeId,
        },
      }).promise() || null;

      setPackageTypeDetails(packageData);
    }
    return () => { };
  }, [router.isReady, basePrice, packageType]);


  const getTotalGuests = () => {
    let noGuests = room.reduce((accumulator, item) => {
      return accumulator + item?.adults + item?.children;
    }, 0);
    return noGuests;
  }

  const getNumberOfAdults = () => {
    return room?.reduce((accumulator, room) => accumulator + (room?.adults || 0), 0);
  };
  const getNumberOfChildren = () => {
    return room?.reduce((accumulator, room) => accumulator + (room?.children || 0), 0);
  };


  //Function to calculate the total price
  const getTotalPrice = () => {
    // Using forEach to calculate total Adults and Children
    let noOfAdults = 0;
    let noOfChildren = 0

    room?.forEach(room => {
      noOfAdults += room?.adults;
      noOfChildren += room?.children;
    });

    let basePricePerAdult = 0;

    basePricePerAdult = basePrice ? calculateTotalPrice(basePrice, room.length, noOfAdults) : 0;

    return basePricePerAdult;
  }
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
      />

      <Seo pageTitle="Hotel Single v2" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header2 />

      <section className="pt-0 package-details-container">
        <div>
          <div className="hotelSingleGrid">
            <div className="d-flex flex-column">
              <div className="row">
                <div className="col">
                  <SlideGallery sliderImg={packageDetail?.data?.images} />
                </div>
              </div>
              <div className="row mt-10 display-sm-none">
                <div className="col justify-between items-end pb-2">
                  <div className="col-auto">
                    <h3 className="text-18 fw-500">Select Package Type</h3>
                    <ButtonGroup>
                      {packageDetail?.data?.availablePackageType?.map((elType, idx) => (
                        <ToggleButton
                          className="rounded-0"
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                          name="radio"
                          value={elType?.typeName?.typeName?.value?.data?.name}
                          checked={packageType === elType?.typeName?.typeName?.value?.data?.name}
                          onChange={(e) => handleSetPackageType(e.currentTarget.value, elType?.typeName?.typeName?.id)}
                        >
                          {elType?.typeName?.typeName?.value?.data?.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>

                  </div>
                  {/* End .col */}
                </div>
                <div className="col">
                  <div className="border-light rounded-0">
                    <div className="mb-15">
                      <div className="pt-2">
                        <div className="w-100 border-bottom-light pb-2">
                          <div className="text-14 px-20">
                            from{" "}
                            <span className="text-14 text-dark-1 fw-500">
                              Rs {basePrice}/per person
                            </span>
                          </div>
                        </div>
                        <div className="w-100 border-bottom-light pb-2">
                          <div className="mt-24 px-20 relative">
                            <RoomsCount />
                          </div>
                        </div>
                        <div className="w-100 border-bottom-light pb-2">
                          <div className="text-14 mt-10 px-20">
                            Amount{" "}
                            <span className="text-22 text-dark-1 fw-500">
                              Rs {getTotalPrice()}
                            </span>
                          </div>
                        </div>
                        <div className="w-100">
                          <div className="px-20">
                            <Link
                              href={{
                                pathname: `/packages/booking-page/${router?.query?.handle}`,
                                query: {
                                  'dateOfJourney': router?.query?.dateOfJourney,
                                  'ptype': packageType,
                                  'adults': getNumberOfAdults(),
                                  'children': getNumberOfChildren(),
                                }
                              }}
                              className="button -md bg-dark-1 text-white mt-10"
                            >
                              Book Now
                              <div className="icon-arrow-top-right ml-15"></div>
                            </Link>
                          </div>
                        </div>
                        {/* End .col */}
                      </div>
                      {/* End .row */}
                    </div>
                  </div>
                </div>
                <div className="col">
                </div>
              </div>
              {/* End .col-12  Overview */}
            </div>
            {/* End left hotel galler  */}

            <div className="display-lg-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block">
              <div className="row pb-2">
                <div className="col-auto">
                  <div className="row x-gap-20 items-center">
                    <div className="col-auto">
                      <h1 className="text-30 sm:text-25 fw-600 pl-20 pt-15">
                        {packageDetail?.data?.pakageName}
                      </h1>

                    </div>
                    {/* End .col */}
                  </div>
                  {/* End .row */}

                  <div className="row x-gap-20 y-gap-20 items-center">
                    <div className="col-auto">
                      <div className="d-flex items-center text-15 sm:text-13 text-light-1 pl-20">
                        <i className="icon-location-2 text-16 mr-5" />
                        {packageDetail?.data?.places}
                      </div>
                    </div>
                  </div>
                  {/* End .row */}
                </div>
              </div>
              <div className="row justify-between items-end pb-2">
                <div className="col-auto">
                  <h3 className="text-18 fw-500 pl-20">Select Package Type</h3>
                  <div className="pl-20">
                    <ButtonGroup>
                      {packageDetail?.data?.availablePackageType?.map((elType, idx) => (
                        <ToggleButton
                          className="rounded-0"
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                          name="radio"
                          value={elType?.typeName?.typeName?.value?.data?.name}
                          checked={packageType === elType?.typeName?.typeName?.value?.data?.name}
                          onChange={(e) => handleSetPackageType(e.currentTarget.value, elType?.typeName?.typeName?.id)}
                        >
                          {elType?.typeName?.typeName?.value?.data?.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </div>
                {/* End .col */}
              </div>
              <div className="row rounded-0">
                <div className="col mb-15">
                  <div className="pt-2">
                    <div className="w-100  pb-2">
                      <div className="text-14 px-20">
                        from{" "}
                        <span className="text-14 text-dark-1 fw-500">
                          Rs {basePrice}/per person
                        </span>
                      </div>
                    </div>
                    <div className="w-100  pb-2">
                      <div className="mt-24 px-20 relative text-white">
                        <RoomsCount />
                      </div>
                    </div>
                    <div className="w-100 pb-2">
                      <div className="text-14 mt-10 px-20">
                        Amount{" "}
                        <span className="text-22 text-dark-1 fw-500">
                          Rs {getTotalPrice()}
                        </span>
                      </div>
                    </div>
                    <div className="w-100">
                      <div className="px-20">
                        <Link
                          href={{
                            pathname: `/packages/booking-page/${router?.query?.handle}`,
                            query: {
                              'dateOfJourney': router?.query?.dateOfJourney,
                              'ptype': packageType,
                              'adults': getNumberOfAdults(),
                              'children': getNumberOfChildren(),
                            }
                          }}
                          className="button -md bg-dark-1 text-white mt-10"
                        >
                          Book Now
                          <div className="icon-arrow-top-right ml-15"></div>
                        </Link>
                      </div>
                    </div>
                    {/* End .col */}
                  </div>
                  {/* End .row */}
                </div>
              </div>
              {/* <RatingBox hotel={hotel} /> */}
            </div>
            {/* End right content */}
          </div>
        </div>
        {/* End .container */}
      </section>
      {/* End gallery grid wrapper */}
      <section>
        <div className="row w-1000 items-top pt-40 mb-20">
          <div className="col-md-8 col-sm-12">
            <Tabs
              defaultActiveKey="itinerary"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="itinerary" title="Itinerary">
                <Itinerary itinenary={packageDetail?.data?.itinenary} />
              </Tab>
              <Tab eventKey="policy" title="Policy">
                These are non-refundable amounts as per the current components attached. In the case of component change/modifications, the policy will change accordingly.
                Please check the exact cancellation and date change policy on the review page before proceeding further.
                Please note, TCS once collected cannot be refunded in case of any cancellation / modification. You can claim the TCS amount as adjustment against Income Tax payable at the time of filing the return of income.
                Cancellation charges shown is exclusive of all taxes and taxes will be added as per applicable.
              </Tab>
              <Tab eventKey="overview" title="Overview">
                <div id="overview" className="row pt-40 ">
                  <div className="col-12">
                    <Overview description={packageDetail?.data?.description} />
                  </div>
                  {/* End col-12 */}
                </div>
              </Tab>
            </Tabs>
          </div>
          <div className="col-md-4 col-sm-12">
            <h3 className="text-22 fw-500 pt-40">
              Package Facilities
            </h3>
            <div className="row y-gap-10 pt-20">
              <PopularFacilities />
            </div>
          </div>
        </div>
      </section>
      <CallToActions />
      {/* End Call To Actions Section */}

      <Footer2 />
    </>
  );
};

export default dynamic(() => Promise.resolve(HotelSingleV2Dynamic), {
  ssr: false,
});
