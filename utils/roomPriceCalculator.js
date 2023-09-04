// utils/roomPriceCalculator.js

// Calculate the total price based on the base price and number of rooms
const MAX_ADULTS_PER_ROOM = 3; 

export function calculateTotalPrice(basePrice, numRooms, adults) {
  const pricePerRoom = parseFloat(basePrice);
  const numberOfRooms = parseInt(numRooms);
  const noOfAdults = parseInt(adults);

  const roomsNeeded = Math.ceil(noOfAdults / MAX_ADULTS_PER_ROOM);

  if (isNaN(pricePerRoom) || isNaN(numberOfRooms)) {
    throw new Error("Base price and number of rooms must be valid numbers.");
  }

  
  let totalPrice = pricePerRoom * noOfAdults;

  // Check if extra rooms are needed and add the cost
  if (roomsNeeded < numRooms) {
    const extraRooms = numRooms - roomsNeeded ;
    totalPrice += extraRooms * 1000;
  }
  return totalPrice;
}
