// utils/totalPriceCalculator.js
import { calculateTotalPrice } from './roomPriceCalculator';

export const getTotalPrice = (noOfRoom, basePrice, noOfAdults) => {
  // Using forEach to calculate total Adults and Children
  return calculateTotalPrice(basePrice, noOfRoom, noOfAdults);
};
