import React from "react";
import MainFilterSearchBox from './MainFilterSearchBox';
import Link from "next/link";
import { Container, Row, Col } from 'react-bootstrap';

const initialState = {
  tabs: [
    { id: 1, name: "Home", icon: "icon-home", linkUrl: '/' },
    { id: 2, name: "About Us", icon: "icon-user", linkUrl: '/others-pages/about' },
    { id: 3, name: "Packages", icon: "icon-ski", linkUrl: '/tour/tour-list-v2' },
    { id: 4, name: "Contact Us", icon: "icon-tickets", linkUrl: '/contact' },
  ],
  currentTab: "Package",
};

const Index = (props) => {

  return (
    <section className="masthead -type-2 z-2">
      <div className="masthead__bg bg-dark-2">
        <img alt="image" src="/img/masthead/2/bg.png" className="js-lazy" />
      </div>
      {/* End bg image */}

      
        <div className="masthead__tabs border-bottom-light">
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

        <div className="masthead__content">
          <div className="hero">
            <Container fluid>
              <Row>
                {/* Right Column for Form */}
                <Col md={6}>
                  <div className="form-container" data-aos="fade-up" data-aos-offset="0">
                      {/* <MainFilterSearchBox packageData={packageData} /> */}
                      <MainFilterSearchBox />
                      {/* End filter content */}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          {/* End .row */}
        </div>
        {/* End .masthead__content */}
      
      {/* End .container */}
    </section>
  );
};

export default Index;
