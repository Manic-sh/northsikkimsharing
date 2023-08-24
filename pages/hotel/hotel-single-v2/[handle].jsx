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
import RatingTag from "../../../components/hotel-single/RatingTag";
import TopBreadCrumb from "../../../components/hotel-single/TopBreadCrumb";
import SidebarRight2 from "../../../components/hotel-single/SidebarRight2";
import ReviewProgress2 from "../../../components/hotel-single/guest-reviews/ReviewProgress2";
import DetailsReview2 from "../../../components/hotel-single/guest-reviews/DetailsReview2";
import ReplyForm from "../../../components/hotel-single/ReplyForm";
import ReplyFormReview2 from "../../../components/hotel-single/ReplyFormReview2";
import Facilities from "../../../components/hotel-single/Facilities";
import Image from "next/image";
import Surroundings from "../../../components/hotel-single/Surroundings";
import HelpfulFacts from "../../../components/hotel-single/HelpfulFacts";
import Faq from "../../../components/faq/Faq";
import Hotels2 from "../../../components/hotels/Hotels2";
import CallToActions from "../../../components/common/CallToActions";
import DefaultFooter from "../../../components/footer/default";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import PropertyHighlights2 from "../../../components/hotel-single/PropertyHighlights2";
import { builder } from "@builder.io/sdk";
import Link from "next/link";
import GuestSearch from '../../../components/hero/hero-2/GuestSearch';

builder.init("02508b9173c94715834f124a5247ac79");


const HotelSingleV2Dynamic = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [packageDetail, setPackageDetail] = useState(null);
  const [packageType, setPackageType] = useState('Standard');
  const [basePrice, setBasePrice] = useState();
  const [isSolo, setIsSolo] = useState(false);
  const [guestCounts, setGuestCounts] = useState({});

  const handleSetPackageType = (value, basePrice) => {
    setPackageType(value);
    setBasePrice(basePrice);
  }
  useEffect(() => {

    if (router.isReady) {

      const { handle, adults } = router.query;

      if (!handle) <h1>Loading...</h1>;
      else fetchPackage(handle);
    }
    async function fetchPackage(handle) {

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
      setBasePrice(data?.data?.availablePackageType[0]?.typeName?.value?.data?.basePrice);
      setGuestCounts({
        'Adults': router?.query?.adults,
        'Children': router?.query?.children,
        'Rooms': router?.query?.rooms,
      })

      if(router?.query?.adults == 1){
        setIsSolo(true);
      }else{
        setIsSolo(false);
      }
    }

    return () => { };
  }, [router.isReady]);

  const getTotalPrice = () => {
    const totalPrice = (basePrice * guestCounts?.Adults) + ((guestCounts?.Rooms - 1) * 2000);
    if(guestCounts.Adults == 1){
      return totalPrice + 1000;
    }
    return totalPrice;
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
                        'adults': router?.query?.adults,
                        'children': router?.query?.children,
                        'rooms': router?.query?.rooms,
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
                        value={elType?.typeName?.value?.data?.typeName}
                        checked={packageType === elType?.typeName?.value?.data?.typeName}
                        onChange={(e) => handleSetPackageType(e.currentTarget.value, elType?.typeName?.value?.data?.basePrice)}
                      >
                        {elType?.typeName?.value?.data?.typeName}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>

                </div>
                <div className="col-auto">

                </div>
                <div className="col-auto">
                <GuestSearch setSelectedGuestCount={setGuestCounts} />
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

      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-12">
              <RatingTag />
            </div>
            {/* End .col-12 This property is in high demand! */}
          </div>
        </div>
        {/* End container */}
      </section>
      {/* End single page content */}

      <section id="rooms" className="pt-30">
        <div className="container">
          <div className="row pb-20">
            <div className="col-auto">
              <h3 className="text-22 fw-500">Available Rooms</h3>
            </div>
          </div>
          {/* End .row */}

          {/* <AvailableRooms2 hotel={hotel} /> */}
        </div>
        {/* End .container */}
      </section>
      {/* End Available Rooms */}

      <section className="mt-40" id="facilities">
        <div className="container">
          <div className="row x-gap-40 y-gap-40">
            <div className="col-12">
              <h3 className="text-22 fw-500">Facilities of this Hotel</h3>
              <div className="row x-gap-40 y-gap-40 pt-20">
                <Facilities />
              </div>
              {/* End .row */}
            </div>
            {/* End .col-12 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End facilites section */}

      <div className="container mt-40 mb-40">
        <div className="border-top-light"></div>
      </div>

      <section className="pt-40" id="reviews">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-3">
              <h3 className="text-22 fw-500">Guest reviews</h3>
              <ReviewProgress2 />
              {/* End review with progress */}
            </div>
            {/* End col-xl-3 */}

            <div className="col-xl-8">
              <DetailsReview2 />
            </div>
            {/* End col-xl-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
        {/* End container */}
      </section>
      {/* End Review section */}

      <div className="container mt-40 mb-40">
        <div className="border-top-light"></div>
      </div>

      <section>
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-3">
              <div className="row">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Leave a Reply</h3>
                  <p className="text-15 text-dark-1 mt-5">
                    Your email address will not be published.
                  </p>
                </div>
              </div>
              {/* End .row */}

              <ReplyFormReview2 />
              {/* End ReplyFormReview */}
            </div>
            {/* End .col-xl-3 */}

            <div className="col-xl-8">
              <ReplyForm />
            </div>
            {/* End .col-xl-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Reply Comment box section */}

      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="px-24 py-20 rounded-4 bg-light-2">
                <div className="row x-gap-20 y-gap-20 items-center">
                  <div className="col-auto">
                    <div className="flex-center size-60 rounded-full bg-white">
                      <Image
                        width={30}
                        height={30}
                        src="/img/icons/health.svg"
                        alt="icon"
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <h4 className="text-18 lh-15 fw-500">
                      Extra health &amp; safety measures
                    </h4>
                    <div className="text-15 lh-15">
                      This property has taken extra health and hygiene measures
                      to ensure that your safety is their priority
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End health &  safety measures section */}

      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-22 fw-500">Hotel surroundings</h3>
            </div>
          </div>
          {/* End .row */}

          <div className="row x-gap-50 y-gap-30 pt-20">
            <Surroundings />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End hotel surroundings */}

      <section className="pt-40">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row">
              <div className="col-12">
                <h3 className="text-22 fw-500">Some helpful facts</h3>
              </div>
            </div>
            {/* End .row */}

            <div className="row x-gap-50 y-gap-30 pt-20">
              <HelpfulFacts />
            </div>
            {/* End .row */}
          </div>
          {/* End .pt-40 */}
        </div>
        {/* End .container */}
      </section>
      {/* End helpful facts surroundings */}

      <section id="faq" className="pt-40 layout-pb-md">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row y-gap-20">
              <div className="col-lg-4">
                <h2 className="text-22 fw-500">
                  FAQs about
                  <br /> The Crown Hotel
                </h2>
              </div>
              {/* End .row */}

              <div className="col-lg-8">
                <div className="accordion -simple row y-gap-20 js-accordion">
                  <Faq />
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
          </div>
          {/* End .pt-40 */}
        </div>
        {/* End .container */}
      </section>
      {/* End Faq about sections */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Popular properties similar to The Crown Hotel
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
              {/* End sectionTitle */}
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <div className="pt-40 sm:pt-20 item_gap-x30">
            <Hotels2 />
          </div>
          {/* End slide hotel */}
        </div>
        {/* End .container */}
      </section>
      {/* End similar hotel */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(HotelSingleV2Dynamic), {
  ssr: false,
});
