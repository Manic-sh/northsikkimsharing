import React, { useState, useEffect } from "react";
import DatePicker from 'react-date-picker';
import RoomsCount from "@/components/hotels/RoomsCount";
import LocationSearch from "./LocationSearch";
import { builder } from "@builder.io/sdk";
import Link from "next/link";
import 'react-calendar/dist/Calendar.css';

builder.init("02508b9173c94715834f124a5247ac79");

const MainFilterSearchBox = () => {
  const [packageData, setPackageData] = useState();
  const [dateOfJourney, setDateOfJourney] = useState(new Date());
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [roomCounts, setRoomCounts] = useState([]);

  const jdate = new Date(dateOfJourney);

  const handleSelectedPackage = (item) => {
    if (!item) {
      console.log("Select Package...")
    }
    setSelectedPackage(item);
  }
  useEffect(() => {
    async function fetchContent() {
      const data = await builder.getAll("package", {
        fields: "data",
        includeRefs: true, // Currently this only gets one level of nested references
        cachebust: true,
      });
      setPackageData(data);
    }
    fetchContent();
  }, []);

  return (
    <>
      <div className="mainSearch -w-1000 z-2 bg-white pr-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 shadow-1 mt-40">
        <div className="button-grid items-center">
          <LocationSearch packages={packageData} setSelectedPackage={handleSelectedPackage} />
          {/* End Location */}

          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Date of Journey</h4>
              <div className="custom_datepicker">
                <DatePicker onChange={setDateOfJourney} value={dateOfJourney} clearIcon={null} closeCalendar required />
              </div>
            </div>
          </div>
          {/* End check-in-out */}

          <RoomsCount />
          {/* End guest */}

          <div className="button-item">
            {selectedPackage ?
              <Link
                href={{
                  pathname: `/hotel/hotel-single-v2/${selectedPackage?.data?.handle}`,
                  query: {
                    'dateOfJourney': jdate.toDateString(),
                    'roomsCount': JSON.stringify(roomCounts),
                  }
                }}
                className="button -md -dark-1 bg-blue-1 text-white mt-24"
              >
                View
                <div className="icon-arrow-top-right ml-15"></div>
              </Link>
              :
              <></>
            }
          </div>
          {/* End search button_item */}
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
