import React, { useState } from "react"
const InputValues = ({packageItem, setSelectedPackage, selectedDate, ...props}) => {
    const [datePrice, setDatePrice] = useState(packageItem?.basePrice);

    const inputRef = React.useRef(null);
    const handleShowEditingCanvas = () => {
        setSelectedPackage(packageItem, selectedDate);
        props.showEditingCanvas(true);
    } 

    const handleBasePriceInput = () => {
      if(packageItem?.pricingPeriods.length > 0){
        const item = packageItem?.pricingPeriods?.find(periods => {
          console.log(periods.startDate);
          console.log(selectedDate);
          return periods.startDate == selectedDate;
        });
        console.log(item);
      }
    }
    return (
      <div ref={inputRef} onClick={handleShowEditingCanvas}>
            <span>{packageItem?.availableSeats || "-"}</span>
            <br />
            <span>{ packageItem?.basePrice }</span>
      </div>
    )
  }
     
export default InputValues;