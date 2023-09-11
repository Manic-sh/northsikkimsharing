import React, { useState } from "react";
import moment from "moment";
import EditingOffCanvas from "./EditingCanvas";
import InputValues from "./InputLabels";

function DynamicDateTable({ startDate, endDate, data, handleTableDataUpdate }) {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [editingPackage, setEditingPackage] = useState({});

  const toggleShow = () => setShow((s) => !s);
  const handleClose = () => setShow(false);

  const generateDateHeaders = () => {
    const dateHeaders = [];
    let currentDate = moment(startDate);

    while (currentDate <= moment(endDate)) {
      dateHeaders.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.clone().add(1, "day");
    }
    return dateHeaders;
  };

  const renderHeaderCells = () => {
    const dateHeaders = generateDateHeaders();
    return dateHeaders?.map((date, index) => <th key={index}>{date}</th>);
  };

  const setSelectedPackage = (packageItem, selectedDate) => {
    setSelectedDate(selectedDate);
    setEditingPackage(packageItem);
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

  const updateDataCallback = (packageHandle, selectedDate, newPrice) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    // Find the package with the specified handle in your data
    const updatedData = data.map((packageItem) => {
      if (packageItem?.data?.package?.value?.data?.handle === packageHandle) {
        // Convert selectedDate to a Date object if it's not already
        const selectedDateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
        
        // Find the pricing period for the selected date
        const updatedPricingPeriods = packageItem?.data?.prices.map((period) => {
          if (selectedDateObj >= new Date(period.startDate) && selectedDateObj <= new Date(period.endDate)) {
            // Calculate the mid-date of the matching period
            const midDate = new Date(selectedDateObj);
            midDate.setHours(12, 0, 0, 0); // Set time to noon for consistency
  
            // Split the matching period into two periods
            const period1 = {
              endDate: midDate.getTime() - oneDayInMilliseconds, // Timestamp in milliseconds
              startDate: new Date(period.startDate).getTime(), // Timestamp in milliseconds
              price: period.price,
            };
  
            const period2 = {
              endDate: new Date(period.endDate).getTime(), // Timestamp in milliseconds
              startDate: midDate.getTime() + oneDayInMilliseconds, // Timestamp in milliseconds
              price: period.price, // Update the price
            };
  
            const newPeriod = {
              endDate: selectedDateObj.getTime(), // Timestamp in milliseconds
              startDate: selectedDateObj.getTime(), // Timestamp in milliseconds
              price: newPrice,
            };
  
            // Remove the original period and add the new two periods
            return [period1, period2, newPeriod];
          }
          return period;
        }).flat(); // Flatten the array of periods
  
        // Check if the selected date didn't match any existing period, and add a new period
        if (!updatedPricingPeriods.some((period) => period.startDate <= selectedDateObj && selectedDateObj <= period.endDate)) {
          const newPeriod = {
            endDate: selectedDateObj.getTime(), // Timestamp in milliseconds
            startDate: selectedDateObj.getTime(), // Timestamp in milliseconds
            price: newPrice,
          };
  
          updatedPricingPeriods.push(newPeriod);
        }
  
        // Update the package with the new pricing periods
        return {
          ...packageItem,
          pricingPeriods: updatedPricingPeriods,
        };
      }
      return packageItem;
    });
    
    // Update the state with the modified data
    handleTableDataUpdate(updatedData);
  };
  
  
  
  const renderRows = () => {
    return data?.map((row, rowIndex) => (
      <tr key={rowIndex}>
        <td key={row?.data?.package?.value?.data?.handle}>{row?.data?.package?.value?.data?.pakageName}</td>
        {/* Render cells for each date in the dateHeaders */}
        {generateDateHeaders()?.map((date, colIndex) => (
          <td key={colIndex} className="text-center">
            <InputValues
              packageItem={row}
              selectedDate={date}
              updateDataCallback={updateDataCallback}
            />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="overflow-scroll scroll-bar-1 pt-30">
      <table className="table-2 col-12">
        <thead>
          <tr>
            <th>Package Name</th>
            {renderHeaderCells()}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      <EditingOffCanvas
        show={show}
        handleClose={handleClose}
        data={data}
        editingPackage={editingPackage}
        selectedDate={selectedDate}
        handleTableDataUpdate={handleTableDataUpdate}
        placement="end"
      />
    </div>
  );
}

export default DynamicDateTable;
