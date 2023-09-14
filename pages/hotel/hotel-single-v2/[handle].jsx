import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import Seo from "../../../components/common/Seo";
import DefaultHeader from "../../../components/header/header-2";
import Overview from "../../../components/hotel-single/Overview";
import PopularFacilities from "../../../components/hotel-single/PopularFacilities";

import TopBreadCrumb from "../../../components/hotel-single/TopBreadCrumb";
import SidebarRight2 from "../../../components/hotel-single/SidebarRight2";
import CallToActions from "../../../components/common/CallToActions";
import DefaultFooter from "../../../components/footer/default";
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


builder.init("02508b9173c94715834f124a5247ac79");


const HotelSingleV2Dynamic = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [packageDetail, setPackageDetail] = useState(null);
  const [packageType, setPackageType] = useState('Standard');
  const [packageTypeId, setPackageTypeId] = useState('') 
  const [basePrice, setBasePrice] = useState();


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
      else fetchPackage(handle, dateOfJourney);
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
      if(getTotalGuests == 1){
        setIsSolo(true);
        setBasePrice(basePrice + 1000);
      }
    }
    return () => { };
  }, [router.isReady, basePrice, packageType]);  

  
  const getTotalGuests = () => {
    let noGuests = room.reduce((accumulator, item) => {
      return accumulator + item?.adults + item?.children ;
    }, 0);
    return noGuests;
  }

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
    
    basePricePerAdult = basePrice ? calculateTotalPrice(basePrice, room.length, noOfAdults): 0;
  
    return  basePricePerAdult;
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

      <DefaultHeader />
      {/* End DefaultHeader */}

      {/* End Search filter top */}

      {/* End StickyHeader2 */}

      <TopBreadCrumb />
      {/* End top breadcrumb */}

      <section className="pt-40">
        <div className="container">
          <div className="hotelSingleGrid">
            <div>
              <Gallery>
                <div className="galleryGrid -type-2">
                  <div className="galleryGrid__item relative d-flex justify-end">
                    <Item
                      original={packageDetail?.data?.images[0]?.image}
                      thumbnail={packageDetail?.data?.images[0]?.image}
                      width={660}
                      height={660}
                    >
                      {({ ref, open }) => (
                        <img
                          src={packageDetail?.data?.images[0]?.image}
                          ref={ref}
                          onClick={open}
                          alt="image"
                          role="button"
                          className="rounded-4"
                        />
                      )}
                    </Item>
                    <div className="absolute px-20 py-20">
                      <button className="button -blue-1 size-40 rounded-full bg-white">
                        <i className="icon-heart text-16" />
                      </button>
                    </div>
                  </div>
                  {/* End .galleryGrid__item */}

                  <div className="galleryGrid__item">
                    <Item
                      original={packageDetail?.data?.images[1]?.image}
                      thumbnail={packageDetail?.data?.images[1]?.image}
                      width={450}
                      height={375}
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={packageDetail?.data?.images[1]?.image}
                          alt="image"
                          className="rounded-4"
                          role="button"
                        />
                      )}
                    </Item>
                  </div>
                  {/* End .galleryGrid__item */}

                  <div className="galleryGrid__item">
                    <Item
                      original={packageDetail?.data?.images[2]?.image}
                      thumbnail={packageDetail?.data?.images[2]?.image}
                      width={450}
                      height={375}
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={packageDetail?.data?.images[2]?.image}
                          alt="image"
                          className="rounded-4"
                          role="button"
                        />
                      )}
                    </Item>
                  </div>
                  {/* End .galleryGrid__item */}

                  <div className="galleryGrid__item relative d-flex justify-end items-end">
                    <img
                      src="/img/gallery/1/4.png"
                      alt="image"
                      className="rounded-4"
                    />
                    <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                      <Item
                        original="/img/gallery/1/4.png"
                        thumbnail="/img/gallery/1/4.png"
                        width={362}
                        height={302}
                      >
                        {({ ref, open }) => (
                          <div
                            className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                            ref={ref}
                            onClick={open}
                            role="button"
                          >
                            See All Photos
                          </div>
                        )}
                      </Item>
                    </div>
                  </div>
                  {/* End .galleryGrid__item */}
                </div>
              </Gallery>
              {/* End gallery grid */}
              <div className="row justify-between items-end pt-2">
                <div className="col-auto">
                  <div className="row x-gap-20  items-center">
                    <div className="col-auto">
                      <h1 className="text-30 sm:text-25 fw-600">
                        {packageDetail?.data?.pakageName}
                      </h1>

                    </div>
                    {/* End .col */}
                    <div className="col-auto">
                      <i className="icon-star text-10 text-yellow-1" />
                      <i className="icon-star text-10 text-yellow-1" />
                      <i className="icon-star text-10 text-yellow-1" />
                      <i className="icon-star text-10 text-yellow-1" />
                      <i className="icon-star text-10 text-yellow-1" />
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row x-gap-20 y-gap-20 items-center">
                    <div className="col-auto">
                      <div className="d-flex items-center text-15 text-light-1">
                        <i className="icon-location-2 text-16 mr-5" />
                        {packageDetail?.data?.places}
                      </div>
                    </div>
                  </div>
                  {/* End .row */}
                </div>
                {/* End .col */}

                <div className="col-auto">
                  <div className="text-14 text-md-end">
                    From{" "}
                    <span className="text-22 text-dark-1 fw-500">
                      Rs {getTotalPrice()}
                    </span>
                  </div>
                  <Link
                    href={{
                      pathname: `/hotel/booking-page/${router?.query?.handle}`,
                      query: {
                        'dateOfJourney': router?.query?.dateOfJourney,
                        'ptype': packageType,
                      }
                    }}
                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  >
                    Book Now
                    <div className="icon-arrow-top-right ml-15"></div>
                  </Link>
                </div>
                {/* End .col */}
              </div>

              <div className="row justify-between items-end pt-40">
                <div className="col-auto">
                  <h3 className="text-18 fw-500">Select Package Type</h3>
                  <ButtonGroup>
                    {packageDetail?.data?.availablePackageType?.map((elType, idx) => (
                      <ToggleButton
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
                <div className="col-auto">
                </div>
                <div className="col-auto">
                  <RoomsCount />
                </div>
                <div className="col-auto">
                </div>
              </div>
              {/* End .row */}
              <div className="row w-1000 items-end pt-40">
                <div className="col-auto">
                  <Tabs
                    defaultActiveKey="itenary"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                  >
                    <Tab eventKey="itenary" title="Itenary">
                      Enjoy the cool breeze with intermittent rain showers in Goa. Explore secluded beaches with lush greens, visit architectural gems and grab off-season discounts!
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

                        <div className="col-12">
                          <h3 className="text-22 fw-500 pt-40 border-top-light">
                            Package Facilities
                          </h3>
                          <div className="row y-gap-10 pt-20">
                            <PopularFacilities />
                          </div>
                        </div>
                        {/* End .col-12  */}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>

              {/* End .col-12  Overview */}
            </div>
            {/* End left hotel galler  */}

            <div>
              <SidebarRight2 />
              {/* <RatingBox hotel={hotel} /> */}
              <PropertyHighlights2 />
            </div>
            {/* End right content */}
          </div>
        </div>
        {/* End .container */}
      </section>
      {/* End gallery grid wrapper */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(HotelSingleV2Dynamic), {
  ssr: false,
});
