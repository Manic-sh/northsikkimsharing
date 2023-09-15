import React, { useState, useEffect, useMemo } from "react";
import DatePicker from 'react-date-picker';
import RoomsCount from "@/components/hotels/RoomsCount";
import LocationSearch from "./LocationSearch";
import { builder } from "@builder.io/sdk";
import CustomRadioButton from "@/components/common/CustomRadioButton";
import LinkWrapper from '@/components/common/NextLink';

import 'react-calendar/dist/Calendar.css';

builder.init("02508b9173c94715834f124a5247ac79");

const MainFilterSearchBox = () => {
  const [packageData, setPackageData] = useState();
  const [dateOfJourney, setDateOfJourney] = useState(new Date());
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isIndian, setIsIndian] = useState(true);
  const radioOptions = [
    { name: 'radio', checked: isIndian === true, class: 'front-end box', label: 'Indian', value: 'indian' },
    { name: 'radio', checked: isIndian === false, class: 'back-end box', label: 'Foreigner', value: 'foreigner' },
  ];

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

  function getFilteredPckg() {
    if (!isIndian) {
      const filterPackage = packageData.filter(pckg => (
        pckg.data?.forForeigeners[0]?.isAvailable
      ));
      return filterPackage;
    }
    return packageData?.filter(pckg => (
      !pckg.data?.forForeigeners[0]?.isAvailable
    ));
  }
  var filteredList = useMemo(getFilteredPckg, [isIndian, packageData]);

  const handleIsIndianChange = (value) => {
    if (value === 'indian') {
      setIsIndian(true);
    } else {
      setIsIndian(false);
    }
    setSelectedPackage(null);
  };

  const jdate = new Date(dateOfJourney);
  const timestampInMilliseconds = jdate.getTime();

  return (
    <>
      <div className="mainSearch -w-1000 z-2 bg-white lg:pb-20 shadow-1 mt-20">
        <div>
          <CustomRadioButton options={radioOptions} onChange={handleIsIndianChange} />
        </div>
        <div className="mainSearch-form">
          <h1 className="z-2 text-42 lg:text-40 md:text-26 text-black xl:pt-0 pb-20">

            Choose Your Package
          </h1>
          <div className="button-grid items-center">
            <LocationSearch packages={filteredList} setSelectedPackage={handleSelectedPackage} isIndian={isIndian} />
            {/* End Location */}
            <h4 className="text-15 fw-500 ls-2 lh-16 text-black mb-10">
                  <i class="icomoon icon-calendar text-20 text-light-1 mr-5"></i>Date of Journey</h4>
            <div className="searchMenu-date px-30 py-5 lg:px-0 js-form-dd js-calendar mb-20">
              <div>
                <div className="custom_datepicker pl-20 ml-5">
                  <DatePicker onChange={setDateOfJourney} value={dateOfJourney} clearIcon={null} closeCalendar required disabledKeyboardNavigation />
                </div>
              </div>
            </div>
            {/* End check-in-out */}

            <RoomsCount />
            {/* End guest */}

            <div className="button-item py-20">
              <LinkWrapper
                href={{
                  pathname: `/hotel/hotel-single-v2/${selectedPackage?.data?.handle}`,
                  query: {
                    'dateOfJourney': timestampInMilliseconds,
                  }
                }}
                disabled={!selectedPackage ? true : false}
                className="button -md -dark-1 bg-blue-1 text-white mt-24 w-100"
              >
                View
              </LinkWrapper>
            </div>
            {/* End search button_item */}
          </div>
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
