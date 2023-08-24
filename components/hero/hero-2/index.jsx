import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import { Builder, builder } from '@builder.io/react'


import MainFilterSearchBox from './MainFilterSearchBox';

const Index = (props) => {

  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();


  return (
    <section className="masthead -type-2 z-2">
      <div className="masthead__bg bg-dark-2">
        <img alt="image" src="/img/masthead/2/bg.png" className="js-lazy" />
      </div>
      {/* End bg image */}

      <div className="container">
        <div className="masthead__tabs border-bottom-light">
          <div className="tabs -bookmark-2 js-tabs">
            <div className="tabs__controls d-flex items-center js-tabs-controls justify-content-between">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  className={`tabs__button px-30 py-20 sm:px-15 sm:py-15 fw-600 text-white js-tabs-button ${
                    tab?.name === currentTab ? "is-tab-el-active" : ""
                  }`}
                  onClick={() => dispatch(addCurrentTab(tab?.name))}
                >
                  <i className={`${tab.icon} text-20 mb-10 sm:mb-16`}></i>
                  {tab?.name}
                </button>
              ))}
            </div>
          </div>
          {/* End tabs */}
        </div>
        {/* End .masthead__tabs */}

        <div className="masthead__content">
          <div className="row y-gap-40">
            <div className="col-xl-5" data-aos="fade-up" data-aos-offset="0">
              <h1 className="z-2 text-60 lg:text-40 md:text-30 text-white pt-40 xl:pt-0">
                {/* <span className="text-yellow-1"></span>
                <br /> */}
                {props.title ? props.title : 'Choose Your Package' }
              </h1>
              {/* <MainFilterSearchBox packageData={packageData} /> */}
              <MainFilterSearchBox />
              {/* End filter content */}
            </div>
            {/* End .col */}

            <div className="col-xl-7">
              <div className="masthead__images relative-1">
                <div data-aos="fade" data-aos-delay="400">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02508b9173c94715834f124a5247ac79%2F84f2cc860c3b46ee9ceb30787145a532"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End left image */}

                <div data-aos="fade" data-aos-delay="600">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02508b9173c94715834f124a5247ac79%2F3b774f97c0a54a968528af965f7bc318?format=webp"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End right top image */}

                <div data-aos="fade" data-aos-delay="800">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02508b9173c94715834f124a5247ac79%2F84f2cc860c3b46ee9ceb30787145a532"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End right bottom image */}
              </div>

              {/* End .masthead__images */}
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .masthead__content */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default Index;

// Register this component for use in the Visual Editor
Builder.registerComponent(Index,{
  name: 'Hero',
  inputs: [
    // 'name' is the name of your prop
    { name: 'title', type: 'text', defaultValue: 'Choose Your Package' },
    { name: 'description', type: 'text', defaultValue: 'Checkout Beautiful Places Arround North Sikkim.' },
  ],
} 
);
