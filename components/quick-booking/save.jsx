import { Button, Col, message, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import QuickBookingFormContext from "./QuickBookingFormContext";

const Save = () => {
  // Get details, address, and linksDetails from MultiStepFormContext
  const { next, prev } = useContext(QuickBookingFormContext);
  // Define state variables to store user details
  const [details, setDetails] = useState({});
  const [address, setAddress] = useState({});
  const [linksDetails, setLinksDetails] = useState({});
  const [showAll, setShowAll] = useState(false);

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

  /**
   * Define the submit function which moves to the next step and displays a success message
   * only if "showAll" flag is true in the  condition  and "confirm" button then redirects.
   */

  const handleSubmit = () => {
    if (showAll === true) {
      message.success("Details submitted successfully!");
      next();
    }
  };

  //Define the  function which  sets showAll state variable to true,
  // which enables the display of all the user's entered details
  const handleView = () => {
    setShowAll(true);
  };

  // Render the Save form with the user's inputted details
  return (
    <div className={"details__wrapper"}>
      <div>
        <h1 className="review__header" style={{ textAlign: "center" }}>
          Confirm Details
        </h1>
        <Button
          type="primary"
          onClick={handleView}
          className="view__button"
          style={{
            margin: "auto",
            marginBottom: "40px",
            display: "block",
            paddingBottom: "10px",
            borderRadius: "5px",
            fontWeight: "bold"
          }}
        >
          View
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {showAll && (
          <div>
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
          </div>
        )}
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
              Confirm
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Save;
