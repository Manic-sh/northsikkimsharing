import React, { useState } from "react";
import moment from "moment";
import EditingOffCanvas from  './EditingCanvas';
import InputValues from './InputLabels';

function DynamicDateTable({ startDate, endDate, data, handleTableDataUpdate }) {
  const [show, setShow] = useState(false);
  const [handle, setHandle] = useState();
  const [selectedDate, setSelectedDate] = useState();  
  const [editingPackage, setEditingPackage] = useState({}); 

  const toggleShow = () => setShow((s) => !s); 
  const handleClose = () => setShow(false);


  const onEdit = ({ handle, basePrice }) => {
    setInEditMode({
      status: true,
      rowKey: handle,
    });
    setBasePrice(basePrice);
    console.log(basePrice);
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    // reset the unit price state value
    setUnitPrice(null);
  };
  const onSave = ({ handle, newUnitPrice }) => {
    updateInventory({ handle, newUnitPrice });
  };

  const updateInventory = ({ handle, newUnitPrice }) => {
    // fetch(`${INVENTORY_API_URL}/${id}`, {
    //     method: "PATCH",
    //     body: JSON.stringify({
    //         unit_price: newUnitPrice
    //     }),
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => {
    //         // reset inEditMode and unit price state values
    //         onCancel();
    //         // fetch the updated data
    //         fetchInventory();
    //     })
  };

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
    return dateHeaders.map((date, index) => <th key={index}>{date}</th>);
  };

  const setSelectedPackage = (packageItem, selectedDate) => {
    setSelectedDate(selectedDate);
    setEditingPackage(packageItem);
  }

  const renderRows = () => {
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        <td key={row.handle}>{row.name}</td>
        {/* Render cells for each date in the dateHeaders */}
        {generateDateHeaders().map((date, colIndex) => (
          <td key={colIndex} className="text-center">
              <InputValues packageItem={row} showEditingCanvas={toggleShow} setSelectedPackage={setSelectedPackage} selectedDate={date} />
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
      <EditingOffCanvas show={show} handleClose={handleClose} data={data} editingPackage={editingPackage} selectedDate={selectedDate} handleTableDataUpdate={handleTableDataUpdate}  placement='end' />
    </div>
  );
}

export default DynamicDateTable;
