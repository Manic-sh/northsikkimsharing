import { Button, Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import QuickBookingFormContext from "./QuickBookingFormContext";

const Review = () => {
  // Get details, address, and linksDetails from MultiStepFormContext
  const { next, prev } = useContext(QuickBookingFormContext);
  // Define state variables to store user details
  const [details, setDetails] = useState({});
  const [address, setAddress] = useState({});
  const [linksDetails, setLinksDetails] = useState({});

  // Load user details from localStorage on mount
  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    if (storedDetails) {
      setDetails(JSON.parse(storedDetails));
    }

    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }

    const storedLinksDetails = localStorage.getItem("linksDetails");
    if (storedLinksDetails) {
      setLinksDetails(JSON.parse(storedLinksDetails));
    }
  }, []);

  // Define the submit function, which moves to the next step
  const handleSubmit = () => {
    next();
  };

  // Render the review form with the user's inputted details
  return (
    <div className={"details__wrapper"}>
      <div>
        <h1 className="review__header" style={{ textAlign: "center" }}>
          Review Details
        </h1>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 className="review__header">Personal Details</h2>
          <div className="review__details">
            <p className="review__item">
              <strong>Name:</strong> {details?.name}
            </p>
            <p className="review__item">
              <strong>Email:</strong> {details?.email}
            </p>
            <p className="review__item">
              <strong>Username:</strong> {details?.username}
            </p>
          </div>
        </Col>
        <Col span={24}>
          <h2 className="review__header">Address Details</h2>
          <div className="review__details">
            <p className="review__item">
              <strong>Phone:</strong> {address?.phone}
            </p>
            <p className="review__item">
              <strong>Address:</strong> {address?.address1}
            </p>
            <p className="review__item">
              <strong>Country:</strong> {address?.country}
            </p>
            <p className="review__item">
              <strong>State:</strong> {address?.state}
            </p>
            <p className="review__item">
              <strong>City:</strong> {address?.city}
            </p>
          </div>
        </Col>
        <Col span={24}>
          <h2 className="review__header">Website Details</h2>
          <div className="review__details">
            <p className="review__item">
              <strong>Portfolio Link:</strong> {linksDetails?.portfolio}
            </p>
            <p className="review__item">
              <strong>Github Link:</strong> {linksDetails?.github}
            </p>
            <p className="review__item">
              <strong>Website Link:</strong> {linksDetails?.website}
            </p>
          </div>
        </Col>
        <Col span={24}>
          <div
            className={
              "form__item button__items d-flex justify-content-between"
            }
          >
            {/* Button to go back to the previous step */}
            <Button type={"default"} onClick={prev}>
              Back
            </Button>
            {/* Button to submit and move to the next step */}
            <Button type={"primary"} onClick={handleSubmit}>
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Review;
