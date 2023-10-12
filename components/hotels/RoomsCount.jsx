import React from "react";
import { useRoomContext } from '../../context/RoomContext';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MAX_COUNT = 4;

const RoomGuestCounter = ({ roomIndex, adultsCount, childrenCount, disableIncrement, dispatch }) => {

  const handleAdultIncrement = () => {
    if (!disableIncrement && adultsCount < 3) {
      dispatch({ type: 'INCREMENT_ADULTS', roomIndex });
    }
  };

  const handleAdultDecrement = () => {
    dispatch({ type: 'DECREMENT_ADULTS', roomIndex });
  };

  const handleChildIncrement = () => {
    if (disableIncrement || childrenCount == 3) return;
    dispatch({ type: 'INCREMENT_CHILDREN', roomIndex });
  };

  const handleChildDecrement = () => {
    dispatch({ type: 'DECREMENT_CHILDREN', roomIndex });
  };

  return (
    <>
      <div className="row y-gap-10 items-center d-flex flex-column">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">Adults</div>
        </div>
        {/* End .col-auto */}
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-0 js-down"
              onClick={handleAdultDecrement}
            >
              <i className="icon-minus text-12" />
            </button>
            {/* decrement button */}
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{adultsCount}</div>
            </div>
            {/* counter text  */}
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-0 js-up"
              onClick={handleAdultIncrement}
              disabled={disableIncrement}
            >
              <i className="icon-plus text-12" />
            </button>
            {/* increment button */}
          </div>
        </div>
        {/* End .col-auto */}
      </div>
      <div className="row y-gap-10 items-center flex-column">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500 d-flex align-content-center">Children - <span className="text-13 lh-12 text-light-1 ml-5"> Below 4 Years</span></div>
        </div>
        {/* End .col-auto */}
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-0 js-down"
              onClick={handleChildDecrement}
            >
              <i className="icon-minus text-12" />
            </button>
            {/* decrement button */}
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{childrenCount}</div>
            </div>
            {/* counter text  */}
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-0 js-up"
              onClick={handleChildIncrement}
              disabled={disableIncrement}
            >
              <i className="icon-plus text-12" />
            </button>
            {/* increment button */}
          </div>
        </div>
        {/* End .col-auto */}
      </div>
      {/* End .row */}
    </>
  );
};


const RoomsCount = () => {

  const { state, dispatch } = useRoomContext();

  const room = state;

  const handleRoomAdd = () => {
    if (room.length == 5) return;
    dispatch({ type: 'ADD_ROOM' });
  };

  const handleRoomRemove = (roomIndex) => {
    dispatch({ type: 'REMOVE_ROOM', roomIndex });
  }
  // Using forEach to calculate total Adults and Children
  let noOfAdults = 0;
  let noOfChildren = 0

  room?.forEach(room => {
    noOfAdults += room?.adults;
    noOfChildren += room?.children;
  });

  const disableGuestIncrement = (totalGuests) => {
    if (totalGuests == MAX_COUNT) return true;

    return false;
  }

  return (
    <>
      <div className="searchMenu-guests js-form-dd js-form-counters position-relative">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
          data-bs-offset="0,22"
        >
          <div className="d-flex">
            <div className="">

              <div className="text-15 text-light-1 ls-2 lh-16 text-white">
                <span className="js-count-adult">{noOfAdults}</span>{" "}
                adults -{" "}
                <span className="js-count-child">{noOfChildren}</span>{" "}
                childeren -{" "}
                <span className="js-count-room">{room?.length}</span> room
              </div>
            </div>
            {/* End ml-10 */}
          </div>
        </div>
        {/* End guest */}

        <div className="shadow-2 dropdown-menu min-width-400 guest-count-dropdown">
          <Alert variant='warning' className="pb-5 rounded-0 bg-yellow-1 text-center">
                      Maximum 4 guests are allowed in a room
          </Alert>
          <div className="bg-white px-6 pb-10 rounded-4 counter-box">
            <Accordion defaultActiveKey="0" flush>
              {room?.map((roomItem, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>
                    <Container>
                      <Row>
                        <Col>
                          <div>Room {index + 1}</div>
                        </Col>
                        <Col>
                          <div>{roomItem?.adults} Adults, and {roomItem?.children}</div>
                        </Col>
                      </Row>
                    </Container></Accordion.Header>
                  <Accordion.Body>
                    <div key={index} className='d-flex justify-content-between'>
                      <RoomGuestCounter roomIndex={index} adultsCount={roomItem?.adults} childrenCount={roomItem?.children} disableIncrement={disableGuestIncrement(roomItem?.adults + roomItem?.children)} dispatch={dispatch} />
                    </div>
                    {room.length > 1 &&
                      (<div className="d-flex w-100 justify-content-end py-2 mt-24 border-top-light">
                        <Button className="rounded-0 text-black" type="button" variant="outline-danger" size="sm" onClick={() => handleRoomRemove(index)}>Remove</Button>
                      </div>)
                    }
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          <div className="bg-white px-30 py-10 rounded-0 text-center">
            <Button className="rounded-0 bg-yellow-1 text-black" variant="warning" onClick={handleRoomAdd} disabled={room.length == 5}>+Add Room</Button>{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomsCount;
