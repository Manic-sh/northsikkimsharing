import { useState, useEffect } from "react";
import { builder } from "@builder.io/sdk";

builder.init("02508b9173c94715834f124a5247ac79");

const LocationSearch = ({ packages, setSelectedPackage, isIndian }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    setSearchValue("");
  }, [isIndian]);


  const handleOptionClick = (item) => {
    setSearchValue(item?.data?.pakageName);
    setSelectedItem(item);
    setSelectedPackage(item);
  };


  return (
    <>     
     <div className={`searchMenu-loc d-flex align-items-center  js-form-dd js-liverSearch border border-white ${searchValue === "" ? 'border border-white' : 'border border-white'}`}>
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
          className="w-100"
        >
          <div className=" d-flex text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Select package..."
              className="js-search js-dd-focus text-white w-100"
              value={searchValue}
              readOnly
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-300 package-items-dropdown">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15">
            <ul className="y-gap-5 js-results">
              {packages?.map((item, idx) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${selectedItem && selectedItem.id === idx ? "active" : ""
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
    </>
  );
};

export default LocationSearch;
