import React from "react";
import { Card } from "react-bootstrap";

const StepFinal = ({ values }) => {

  //destructuring the object from values
  console.log(values);

  const { dateOfJourney, guestCounts, packageType, totalAmount } = values;
  const { pakageName } = values?.selectedPackage?.data;
  const jdate = new Date(dateOfJourney);
  
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <p>
            <strong>Package :</strong> {pakageName}
          </p>
          <p>
            <strong>Date of Journey :{jdate.toDateString()}</strong> 
          </p>
          <p>
            <strong>Guest Counts :</strong> {guestCounts?.Adults} Adults <span> Rooms {guestCounts?.Rooms}</span>
          </p>
          <p>
            <strong>Total Amount :</strong> {totalAmount}
          </p>
          <div
            style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", gap: '1rem' }}
          >
            <button
              className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
            >
              Checkout
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepFinal;