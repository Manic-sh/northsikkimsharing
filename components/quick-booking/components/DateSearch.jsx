import React, { useState } from "react";
//import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePicker from 'react-date-picker';

const DateSearch = () => {
  // const [dates, setDates] = useState([
  //   new DateObject({ year: 2023, month: 1, day: 22 }),
  //   "December 09 2020",
  //   1597994736000, //unix time in milliseconds (August 21 2020)
  // ]);
  const [date, setDates] = useState(new Date());



  return (
    <div className="custom_datepicker">
      {/* <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={setDates}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD"
      /> */}
      <DatePicker onChange={setDates} value={date} closeCalendar />
    </div>
  );
};

export default DateSearch;
