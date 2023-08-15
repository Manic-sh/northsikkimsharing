import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { hotelsData } from "../../../data/hotels";
import Seo from "../../../components/common/Seo";
import DefaultHeader from "../../../components/header/header-2";
import Overview from "../../../components/hotel-single/Overview";
import PopularFacilities from "../../../components/hotel-single/PopularFacilities";
import RatingTag from "../../../components/hotel-single/RatingTag";
import TopBreadCrumb from "../../../components/hotel-single/TopBreadCrumb";
import SidebarRight2 from "../../../components/hotel-single/SidebarRight2";
import AvailableRooms2 from "../../../components/hotel-single/AvailableRooms2";
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
import FilterBox2 from "../../../components/hotel-single/filter-box-2";
import StickyHeader2 from "../../../components/hotel-single/StickyHeader2";
import RatingBox from "../../../components/hotel-single/RatingBox";
import PropertyHighlights2 from "../../../components/hotel-single/PropertyHighlights2";
import { builder } from "@builder.io/sdk";
import Link from "next/link";

builder.init("02508b9173c94715834f124a5247ac79");


const HotelSingleV2Dynamic = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const [hotel, setHotel] = useState({});
  const handle = router.query.handle;
  const adults = router.query.adults;
  const children = router.query.children;
  const jdate = router.query.dateOfJourney;
  const rooms = router.query.rooms;
  const [packageDetail, setPackageDetail] = useState(null);
  
  useEffect(() => {
    if (!handle) <h1>Loading...</h1>;
    else fetchPackage();
    //setHotel(hotelsData.find((item) => item.handle == handle));

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
      setHotel(data);
      setPackageDetail(data)
      console.log(data);
    }

    return () => {};
  }, [handle]);

  console.log(hotel);

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
                      original={packageDetail?.data?.images[0].image}
                      thumbnail={packageDetail?.data?.images[0].image}
                      width={660}
                      height={660}
                    >
                      {({ ref, open }) => (
                        <img
                          src={packageDetail?.data?.images[0].image}
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
                      original="/img/gallery/1/2.png"
                      thumbnail="/img/gallery/1/2.png"
                      width={450}
                      height={375}
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src="/img/gallery/1/2.png"
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
                      original="/img/gallery/1/3.png"
                      thumbnail="/img/gallery/1/3.png"
                      width={450}
                      height={375}
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src="/img/gallery/1/3.png"
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

              <div className="row justify-between items-end pt-40">
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
                      Rs {packageDetail?.data?.basePricePerPerson * adults}
                    </span>
                  </div>
                  <Link
                      href={{
                        pathname: `/hotel/booking-page/${handle}`,
                        query: {
                          'dateOfJourney': jdate,
                          'adults': adults,
                          'children': children,
                          'rooms': rooms,
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
              {/* End .row */}

              <div id="overview" className="row y-gap-40 pt-40 ">
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
              {/* End .col-12  Overview */}
            </div>
            {/* End left hotel galler  */}

            <div>
              <SidebarRight2 />
              <RatingBox hotel={hotel} />
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

          <AvailableRooms2 hotel={hotel} />
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
