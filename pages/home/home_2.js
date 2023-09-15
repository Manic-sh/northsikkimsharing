import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import Footer2 from "../../components/footer/footer-2";
import Header from "../../components/header/header-2";
import Hero2 from "../../components/hero/hero-2";
import CallToActions from "../../components/home/home-2/CallToActions";
import Testimonial from "../../components/home/home-2/Testimonial";
import TestimonialRating from "../../components/home/home-2/TestimonialRating";
import Sights from "../../components/home/home-2/Sights";
import WhyChoose from "../../components/block/BlockGuide";
import BlockGuide from "@/components/home/home-2/BlockGuide";
import Destinations from "../../components/home/home-2/Destinations";

import { builder } from "@builder.io/sdk";

builder.init("02508b9173c94715834f124a5247ac79");

const Home = () => {
  const [sights, setSights] = useState([]);
  const [destinations, setDestinations] = useState([]);
  
  useEffect(() => {
    async function fetchSights() {
      const data = await builder.getAll("sights", {
        fields: "data",
      });
      setSights(data || []); // Use an empty array as a fallback if data is undefined
    }
  
    async function fetchDestinations() {
      const dest = await builder.getAll("destinations", {
        fields: "data",
      });
      setDestinations(dest || []); // Use an empty array as a fallback if dest is undefined
    }
  
    fetchSights();
    fetchDestinations();
  }, []);

  return (
    <>
      <Seo pageTitle="Home" />
      {/* End Page Title */}

      <Header destinations={destinations} />
      {/* End Header 2 */}
      <Hero2 />
      {/* End Hero 2 */}

      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">How North Sikkim Sharing Works</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <BlockGuide />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Why Choose Us</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <WhyChoose />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End travel block sections */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Connect With Destinations
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="d-flex x-gap-15 items-center justify-center pt-40 sm:pt-20">
                <div className="col-auto">
                  <button className="d-flex items-center text-24 arrow-left-hover js-places-prev">
                    <i className="icon icon-arrow-left" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination -dots text-border js-places-pag" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="d-flex items-center text-24 arrow-right-hover js-places-next">
                    <i className="icon icon-arrow-right" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <Destinations destinations={destinations} />
          {/* End travellers component */}
        </div>
        {/* End .container */}
      </section>
      {/* End Connect with Travellers Sections */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-10 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Sights</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
            {/* End .col-auto */}

            {/* <div className="col-auto tabs -pills-2 ">
              <FilterHotelsTabs />
            </div> */}
            {/* End .col-auto */}
          </div>
          {/* End .row */}

          <div className="relative overflow-hidden pt-40 sm:pt-20">
            <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              <Sights sights={sights} />
            </div>
          </div>
          {/* End relative */}
        </div>
      </section>
      {/* End travel block sections */}

      <section className="layout-pt-lg layout-pb-lg bg-dark-3">
        <div className="container">
          <div className="row y-gap-60">
            <div className="col-xl-5 col-lg-6">
              <TestimonialRating />
            </div>
            {/* End .col */}

            <div className="col-xl-4 offset-xl-2 col-lg-5 offset-lg-1 col-md-10">
              <Testimonial />
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End testimonial and brand sections Section */}

      {/* End blog Section */}

      <CallToActions />
      {/* End CallToActions Section */}

      <Footer2 />
      {/* End Footer Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
