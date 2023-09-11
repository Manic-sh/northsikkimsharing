import React, { useState, useEffect } from "react";
import { builder } from "@builder.io/sdk";
import DynamicDateTable from "./DynamicDatesTable";
import { packageData } from "@/data/packages";

builder.init("02508b9173c94715834f124a5247ac79");

const RatesTable = () => {
  const [tableData, setTableData] = useState(packageData);
  const [isLoading, setIsLoading] = useState(true); // Initialize as true to show loading initially

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await builder.getAll("pricing", {
          fields: "data",
          includeRefs: true,
          cachebust: true,
        });
        setTableData([...data]); // Create a new array to update state

        setIsLoading(false); // Set isLoading to false when data is fetched
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set isLoading to false even in case of an error
      }
    }
    fetchContent();
  }, []);

  const startDate = '2023-09-01';
  const endDate = '2023-09-10';

  const handleTableDataUpdate = (data) => {
    console.log("Updated data:", data);
    setTableData(data);
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div> // Display loading indicator while fetching data
      ) : (
        <DynamicDateTable startDate={startDate} endDate={endDate} data={tableData} handleTableDataUpdate={handleTableDataUpdate} />
      )}
    </>
  );
};

export default RatesTable;




// data?.forEach(element => {
//     console.log(element);
//     element?.pricingPeriods?.forEach(period =>{
//         console.log("Start Date", new Date(period.startDate).toISOString().slice(0, 10));
//         console.log("End Date", new Date(period.endDate).toISOString().slice(0, 10));
//         console.log("Price", period?.price)
//     })
// });