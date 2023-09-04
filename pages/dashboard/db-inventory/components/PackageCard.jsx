import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from "moment";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function PackageCard({ editingPackage, data, selectedDate, handleTableDataUpdate }) {
  const [availability, setAvailability] = useState(editingPackage?.availableSeats);
  const [basePrice, setBasePrice] = useState(editingPackage?.basePrice);
  let dateSelected = moment(selectedDate);

  // Function to check if a date is within the range
  const isWithinRange = (date, start, end) => {
    const selected = new Date(date);
    const rangeStart = new Date(start);
    const rangeEnd = new Date(end);
    return selected >= rangeStart && selected <= rangeEnd;
  };

  
    // Function to update pricingPeriods
    const updatePricingPeriods = (newPeriod) => {
      const updatedPackageData = { ...editingPackage };
      const existingPeriodIndex = updatedPackageData.pricingPeriods.findIndex(
        (period) =>
          period.startDate === newPeriod.startDate &&
          period.endDate === newPeriod.endDate
      );
  
      if (existingPeriodIndex !== -1) {
        // If the period already exists, update the price
        updatedPackageData.pricingPeriods[existingPeriodIndex] = newPeriod;
      } else {
        // If the period doesn't exist, add it to the array
        updatedPackageData.pricingPeriods.push(newPeriod);
      }
  
      return updatedPackageData;
    };

  const handlePackageUpdate = (event) => {
    event.preventDefault();

    const newState = data.map(obj => {

      console.log("🚀 ~ file: PackageCard.jsx:21 ~ newState ~ obj:", obj);
      // Extract startDate values from pricingPeriods array
      const startDateArray = obj.pricingPeriods.map((period) => period.startDate);

      const newPricingPeriod = {
        startDate: startDateArray[0],
        endDate: startDateArray[1],
        price: basePrice,
      };

      const updatedPackage = updatePricingPeriods(newPricingPeriod);

      console.log("🚀 ~ file: PackageCard.jsx:60 ~ newState ~ updatedPackage:", updatedPackage);


      
      if (obj.handle === editingPackage?.handle) {
        return {...obj, availableSeats: availability, basePrice: basePrice};
      }
      // 👇️ otherwise return the object as is
      return obj;
    });

    handleTableDataUpdate(newState);

  }
  
  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  }

  const handleBasePriceChange = (event) => {
    setBasePrice(event.target.value);
  }


  return (
    <Form onSubmit={handlePackageUpdate}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{editingPackage?.name}</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <Form.Group as={Row} controlId="dob">
              <Form.Label>Selected Date</Form.Label>
              <Form.Control type="date" name="selectedDate" placeholder="Selected Date" defaultValue={dateSelected.format("YYYY-MM-DD")} />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Label htmlFor="availableSeats">Availability</Form.Label>
            <Form.Control
              type="number"
              id="availableSeats"
              aria-describedby="availableSeatsBlock"
              defaultValue={availability}
              onChange={handleAvailabilityChange}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Label htmlFor="basePrice">Base Price:</Form.Label>
            <Form.Control
              type="number"
              id="basePrice"
              aria-describedby="basePriceBlock"
              defaultValue={basePrice}
              onChange={handleBasePriceChange}
            />
          </ListGroup.Item>
          <ListGroup.Item>Active Offers:
            {editingPackage?.offers?.map((offer, idx) => {
              return (
                <Form.Group key={idx} className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder={offer?.name} value={offer?.value} />
                </Form.Group>
              )
            })}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="danger" type="button" className='mx-4'>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default PackageCard;