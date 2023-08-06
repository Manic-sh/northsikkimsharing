import React from "react";
import { Card, Form } from "react-bootstrap";


const StepFinal = ({ values }) => {

  //destructuring the object from values
  const { firstName, lastName, age, email } = values;
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <p>
            <strong>First Name :</strong> {firstName}{" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lastName}{" "}
          </p>
          <p>
            <strong>Age :</strong> {age}{" "}
          </p>
          <p>
            <strong>Email :</strong> {email}{" "}
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