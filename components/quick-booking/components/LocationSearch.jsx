import { useState } from "react";
import { builder } from "@builder.io/sdk";

builder.init("02508b9173c94715834f124a5247ac79");

const LocationSearch = ({ packages }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isIndian, setIsIndian] = useState(true);
  // const locationSearchContent = [
  //   {
  //     id: 1,
  //     name: "1 Night 2 Days",
  //     address: "Lachung, Yumtahng & Zero Points",
  //   },
  //   {
  //     id: 2,
  //     name: "2 Night 3 Days",
  //     address: "Lachung, Yumtahng & Zero Points",
  //   },
  //   {
  //     id: 3,
  //     name: "1 Night Gurudongmer",
  //     address: "Gurudongmer",
  //   },
  //   {
  //     id: 4,
  //     name: "1 Night transport only",
  //     address: "Lachung",
  //   },
  //   {
  //     id: 5,
  //     name: "2 Night 3 days transport only",
  //     address: "Lachung, Yumtahng & Zero Points",
  //   },
  //   {
  //     id: 6,
  //     name: "1 Day trip",
  //     address: "Lachung, Yumtahng & Zero Points",
  //   },
  // ];

  const handleOptionClick = (item) => {
    setSearchValue(item?.data?.pakageName);
    setSelectedItem(item);
  };

  const handleIsIndianChange = () => {
    setIsIndian(!isIndian);
  };

  return (
    <>
      <div className="searchMenu-loc px-30 d-flex justify-content-between lg:py-20 lg:px-0 js-form-dd js-liverSearch">
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
        <div className="d-flex justify-content-end nationality-switch">
              <div className="form-check form-switch">
                <input
                  className="form-check-input nationality-switch-input"
                  onChange={handleIsIndianChange}
                  type="checkbox"
                  role="switch"
                  checked={isIndian}
                />
              </div>
        </div>
        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {packages?.map((item, idx) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === idx ? "active" : ""
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
                        {item?.data?.description}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSearch;
