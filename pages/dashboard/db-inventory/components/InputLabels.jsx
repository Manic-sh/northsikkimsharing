import React, { useState, useEffect } from "react";

const InputValues = ({
  packageItem,
  selectedDate,
  updateDataCallback, // Add this prop for updating data
}) => {
  const [datePrice, setDatePrice] = useState(packageItem?.basePrice || null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (packageItem?.pricingPeriods && selectedDate) {
      const matchingPeriod = packageItem.pricingPeriods.find((period) =>
        isWithinRange(selectedDate, period.startDate, period.endDate)
      );
      if (matchingPeriod) {
        setDatePrice(matchingPeriod.price);
      } else {
        setDatePrice(packageItem.basePrice);
      }
    }
  }, [packageItem, selectedDate]);

  const isWithinRange = (date, start, end) => {
    const selected = new Date(date);
    const rangeStart = new Date(start);
    const rangeEnd = new Date(end);
    return selected >= rangeStart && selected <= rangeEnd;
  };

  const handleToggleEditing = () => {
    if (isEditing) {
      // Save changes or perform any update logic here
      console.log("Save changes");
      updateDataCallback(packageItem.handle, selectedDate, datePrice); // Update data here
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    // Update the edited price in real-time
    setDatePrice(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // When Enter key is pressed, handle saving
      handleToggleEditing();
    }
  };
  
  return (
    <div onClick={handleToggleEditing}>
      <span>{packageItem?.availableSeats || "-"}</span>
      <br />
      {isEditing ? (
        <input
          type="number"
          value={datePrice !== null ? datePrice : ""}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()} // Prevent the click from propagating to the div
          onBlur={handleToggleEditing}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <span>{datePrice !== null ? datePrice : "-"}</span>
      )}
    </div>
  );
};

export default InputValues;
