import React, { useState, useEffect } from "react";
import { hotelsData } from "../../data/hotels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Accordion from 'react-bootstrap/Accordion';


// creating functional component ans getting props from app.js and destucturing them
const StepPackageDetails = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  console.log(values);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Standard', value: '1' },
    { name: 'Luxury', value: '2' },
  ];


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { description, places, images, pakageName, basePricePerPerson, availablePackageType } = values?.selectedPackage?.data;

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    handleFormData("packageType", radioValue)
    handleFormData("totalAmount", parseInt(basePricePerPerson * values.guestCounts.Adults));
    nextStep();
  };

  const handleShowOnMap = (e) => {
    console.log(e);
  }
  return (
    <>
      {hotelsData.slice(0, 1).map((item) => (
        <div className="col-12" key={item?.id}>
          <div className="pt-0">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4  custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        {images?.map((slide, i) => (
                          <SwiperSlide key={i}>
                            <Image
                              width={250}
                              height={250}
                              className="rounded-4 col-12 js-lazy"
                              src={slide.image}
                              alt={places}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  {/* End image */}

                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">
                  {pakageName}
                </h3>
                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">{places}</p>
                  </div>
                  <div className="row x-gap-10 y-gap-10 items-center pt-10">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>View details</Accordion.Header>
                        <Accordion.Body>
                            <p className="text-14">{description}</p>
                        </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    
                  </div>     
                  <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      className="d-block text-14 text-blue-1 underline"
                      onClick={handleShow}
                    >
                      Show on map
                    </button>
                  </div>

                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1">
                      
                    </div>
                  </div>

                  <div className="col-auto">
                    <p className="text-14">2 km to city center</p>
                  </div>
                </div>

                <div className="text-14 lh-15 mt-20">
                  <div className="fw-500">King Room</div>
                  <div className="text-light-1">1 extra-large double bed</div>
                </div>

                <div className="text-14 text-green-2 lh-15 mt-10">
                  <div className="fw-500">Free cancellation</div>
                  <div className="">
                    You can cancel later, so lock in this great price today.
                  </div>
                </div>

                <div className="row x-gap-10 y-gap-10 pt-20">
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                </div>
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">
                      3,014 reviews
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {item?.ratings}
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-14 text-light-1 mt-50 md:mt-20">
                   {values.guestCounts.Adults} adult and {values.guestCounts.Rooms} Rooms
                  </div>
                  <div className="text-22 lh-12 fw-600 mt-5">
                    {parseInt(basePricePerPerson * values?.guestCounts?.Adults)}
                  </div>
                  <div className="text-14 text-light-1 mt-5">
                  {parseInt(basePricePerPerson * values.guestCounts.Adults)} + Additional Rooms 
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", gap: '1rem' }}
                  >
                    <button
                      className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
                      onClick={prevStep}
                    >
                      <i className="icon-arrow-left text-20 mr-10" />
                      Previous
                    </button>
                    <button
                      className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
                      onClick={submitFormData}
                    >
                      Next
                      <i className="icon-arrow-right text-20 ml-10" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{places}</Modal.Title>
              </Modal.Header>
              <Modal.Body><iframe src="https://www.google.com/maps/d/embed?mid=16Zk4_DQ6qUE-CAHWbMueekIKBOA&hl=en&ehbc=2E312F" width="340" height="340"></iframe></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Next
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  );
};

export default StepPackageDetails;
