import React, { useState, useEffect } from "react";
import GuestSearch from "./components/GuestSearch";
//import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePicker from 'react-date-picker';
import { builder } from "@builder.io/sdk";

builder.init("02508b9173c94715834f124a5247ac79");
// creating functional component ans getting props from app.js and destucturing them
const StepPackage = ({ nextStep, selectedPackage, values }) => {
  //creating error state for validation
  const [packageData, setPackageData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isIndian, setIsIndian] = useState(true);
  const [dateOfJourney, setdateOfJourney] = useState(new Date());
  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 1,
    Rooms: 1,
  });
  const handleCounterChange = (guestCounts) => {
    setGuestCounts(guestCounts);
    console.log("🚀 ~ file: StepPackage.jsx:24 ~ handleCounterChange ~ guestCounts:", guestCounts);    
  };

  const [error, setError] = useState(false);

  const handleOptionClick = (item) => {
    setSearchValue(item?.data?.pakageName);
    setSelectedPackage(item);
  };

  const handleIsIndianChange = () => {
    setIsIndian(!isIndian);
  };

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
  console.log("Package:", packageData);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    
    // checking if value of first name and last name is empty show error else take to step 2
    console.log("Selected Package", selectedPackage);
    console.log("Is Indian", isIndian);
    console.log("Date of jurney", dateOfJourney);
    console.log("Guest count", guestCounts);
    nextStep();
  };

  return (
    <>
      <div className="mainSearch -w-900 z-2 bg-white pr-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 shadow-1 mt-40">
        <div className="button-grid items-center">
          <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
            <div
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              data-bs-offset="0,22"
            >
              <h4 className="text-15 fw-500 ls-2 lh-16">Packages</h4>
              <div className=" d-flex text-15 text-light-1 ls-2 lh-16">
                <input
                  autoComplete="off"
                  type="search"
                  placeholder="Select package..."
                  className="js-search js-dd-focus"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="d-flex justify-content-end nationality-switch">
              <div className="form-check form-switch">
                <input
                  className="form-check-input nationality-switch-input"
                  onChange={handleIsIndianChange}
                  type="checkbox"
                  role="switch"
                  checked={isIndian}
                />
              </div>
            </div> */}
            <div className="shadow-2 dropdown-menu min-width-400">
              <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
                <ul className="y-gap-5 js-results">
                  {packageData?.map((item, idx) => (
                    <li
                      className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                        selectedPackage && selectedPackage.id === idx ? "active" : ""
                      }`}
                      key={idx}
                      role="button"
                      onClick={() => handleOptionClick(item)}
                    >
                      <div className="d-flex">
                        <div className="icon-location-2 text-light-1 text-20 pt-4" />
                        <div className="ml-10">
                          <div className="text-15 lh-12 fw-500 js-search-option-target">
                            {item?.data?.pakageName}
                          </div>
                          <div className="text-14 lh-12 text-light-1 mt-5">
                            {item?.data?.places}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Date of Journey</h4>
              <div className="custom_datepicker">
                <DatePicker onChange={setdateOfJourney} value={dateOfJourney} closeCalendar />
              </div>
            </div>
          </div>
          {/* End check-in-out */}

          <GuestSearch  handleCounterChange={handleCounterChange} />
          {/* End guest */}

          <div className="button-item">
            <button
              className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
              onClick={submitFormData}
            >
              Continue
              <i className="icon-arrow-right text-20 ml-10" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepPackage;
