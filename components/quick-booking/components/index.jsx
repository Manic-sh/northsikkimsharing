import { useSelector, useDispatch } from "react-redux";
import React, {useState, useEffect } from "react";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import MainFilterSearchBox from "./MainFilterSearchBox";
import { Builder, builder } from '@builder.io/react'
import { propTypes } from "google-map-react";

const Index = (props) => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const [packageData, setPackageData] = useState();
  const dispatch = useDispatch();
 

  useEffect(() => {
      async function fetchContent() {  
        const data = await builder.getAll('package', {
          fields: 'data',
          includeRefs: true, // Currently this only gets one level of nested references
          cachebust: true,
        });
        setPackageData(data)
      }
      fetchContent();
  }, []);
  console.log("Package:", packageData);

  return (
    <section className="masthead -type-2 z-2">
      <div className="masthead__bg bg-dark-3">
        <img alt="image" src="/img/masthead/2/bg.png" className="js-lazy" />
      </div>
      {/* End bg image */}

      <div className="container">
        <div className="masthead__tabs">
          <div className="tabs -bookmark-2 js-tabs">
            <div className="tabs__controls d-flex items-center js-tabs-controls">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  className={`tabs__button px-30 py-20 sm:px-20 sm:py-15 rounded-4 fw-600 text-white js-tabs-button ${
                    tab?.name === currentTab ? "is-tab-el-active" : ""
                  }`}
                  onClick={() => dispatch(addCurrentTab(tab?.name))}
                >
                  <i className={`${tab.icon} text-20 mr-10 sm:mr-5`}></i>
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
              <h1 className="z-2 text-60 lg:text-40 md:text-30 text-white pt-80 xl:pt-0">
                {/* <span className="text-yellow-1"></span>
                <br /> */}
                {props.title ? props.title : 'Choose Your Package' }
              </h1>
              <p className="z-2 text-white mt-20">
              {props.description ? props.description : 'Checkout Beautiful Places Arround North Sikkim.'}
              </p>

              <MainFilterSearchBox packageData={packageData} />

              {/* End filter content */}
            </div>
            {/* End .col */}

            <div className="col-xl-7">
              <div className="masthead__images relative-1">
                <div data-aos="fade" data-aos-delay="400">
                  <img
                    src="/img/masthead/2/1.png"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End left image */}

                <div data-aos="fade" data-aos-delay="600">
                  <img
                    src="/img/masthead/2/2.png"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End right top image */}

                <div data-aos="fade" data-aos-delay="800">
                  <img
                    src="/img/masthead/2/3.png"
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
