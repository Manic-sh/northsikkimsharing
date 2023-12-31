import React from "react";
import MainFilterSearchBox from './MainFilterSearchBox';
import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const initialState = {
  tabs: [
    { id: 1, name: "Home", icon: "icon-home", linkUrl: '/' },
    { id: 2, name: "About Us", icon: "icon-user", linkUrl: '/others-pages/about' },
    { id: 3, name: "Packages", icon: "icon-ski", linkUrl: '/packages/package-list' },
    { id: 4, name: "Contact Us", icon: "icon-tickets", linkUrl: '/contact' },
  ],
  currentTab: "Package",
};
const imageUrl = 'hero-section-banner';


const Index = (props) => {

  return (
    <section className="masthead -type-2 z-2">
      <div className="masthead__tabs bg-dark-2">
        <div className="container">
          <div className="tabs -bookmark-2 js-tabs">
            <div className="tabs__controls d-flex items-center js-tabs-controls justify-content-between">
              {initialState.tabs?.map((tab) => (
                <Link
                  key={tab?.id}
                  href={{ pathname: `${tab.linkUrl}` }}
                  className={`tabs__button px-30 py-20 sm:px-15 sm:py-15 fw-600 text-white js-tabs-button ${tab?.name === initialState.currentTab ? "is-tab-el-active" : ""
                    }`}
                >
                  <i className={`${tab.icon} text-20 mb-10 sm:mb-16`}></i>
                  {tab?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* End tabs */}
      </div>
      {/* End .masthead__tabs */}
      {/* End bg image */}

      <Row>
        <Col lg={12} sm={12}>
          <div className="hero-image-container relative">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="hero-content absolute z-1">
                  <h1 className="text-yellow-1 text-60">North Sikkim Sharing</h1>
                  <p className="z-2 text-white is-in-view text-30">Booking your trip was never so easy! </p>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <MainFilterSearchBox />
              </div>
            </div>

            <img alt="image" src="/img/backgrounds/background.jpg" className="js-lazy" />
          </div>
        </Col>
      </Row>

    </section>
  );
};

export default Index;
