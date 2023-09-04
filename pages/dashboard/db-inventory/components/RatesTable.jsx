import { useState } from "react";
import DynamicDateTable from "./DynamicDatesTable";

import { packageData } from "@/data/packages";


const RatesTable = () => {
    const [tableData, setTableData] = useState(packageData);
    
    const startDate = '2023-09-01';
    const endDate = '2023-09-10';

    const handleTableDataUpdate = (data) => {

        console.log("🚀 ~ file: RatesTable.jsx:15 ~ handleTableDataUpdate ~ data:", data);

        setTableData(data);
    }

    return (
        <>
            <DynamicDateTable startDate={startDate} endDate={endDate} data={tableData} handleTableDataUpdate={handleTableDataUpdate} />
        </>
    );
};

export default RatesTable;
