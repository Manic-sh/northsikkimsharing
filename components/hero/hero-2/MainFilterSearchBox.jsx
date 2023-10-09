import React, { useState, useEffect, useMemo } from "react";
import RoomsCount from "@/components/hotels/RoomsCount";
import LocationSearch from "./LocationSearch";
import { builder } from "@builder.io/sdk";
import CustomRadioButton from "@/components/common/CustomRadioButton";
import LinkWrapper from '@/components/common/NextLink';
import DatePickerDialog from "../DateSearch";
import 'react-calendar/dist/Calendar.css';
import Social2 from "@/components/common/social/Social2";


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
      <div className="mainSearch z-2 blur">
        <h2 className="text-40 text-white mb-20">Select your package</h2>
        
        <div className="button-grid items-center">
        <CustomRadioButton options={radioOptions} onChange={handleIsIndianChange} />
          <LocationSearch packages={filteredList} setSelectedPackage={handleSelectedPackage} isIndian={isIndian} />
          {/* End Location */}

          <div className="searchMenu-date p-10 js-form-dd js-calendar">
            <DatePickerDialog />
            {/* <DatePicker onChange={setDateOfJourney} value={dateOfJourney} clearIcon={null} closeCalendar required disabledKeyboardNavigation /> */}
          </div>
          {/* End check-in-out */}

          <RoomsCount />
          {/* End guest */}

          <div className="button-item px-0">
            <LinkWrapper
              href={{
                pathname: `/packages/package-item/${selectedPackage?.data?.handle}`,
                query: {
                  'dateOfJourney': timestampInMilliseconds,
                }
              }}
              disabled={!selectedPackage ? true : false}
              className="button -md -dark-1 bg-yellow-1 text-white mt-10 w-100 rounded-0"
            >
              View
            </LinkWrapper>
          </div>
          {/* End search button_item */}
        </div>
        <div className="social-icons">
            <div className="d-flex items-center justify-content-between">
              <Social2 />
            </div>
          </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;

