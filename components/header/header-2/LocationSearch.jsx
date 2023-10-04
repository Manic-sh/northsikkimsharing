import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { builder } from "@builder.io/sdk";


builder.init("02508b9173c94715834f124a5247ac79");

const SearchBar = ({destinations}) => {
  
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const router = useRouter();



  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    router.push(`/tour/tour-list-v3`);
  };

  return (
    <>
      <div className="searchMenu-loc js-form-dd js-liverSearch">
        <div
          className="d-flex items-center"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <i className="text-20 icon-search text-white mr-15" />
          <div className="text-15 text-white ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Search Destinations..."
              className="text-white header-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {destinations?.map((item, idx) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${selectedItem && selectedItem?.data?.title === item?.data?.title ? "active" : ""
                    }`}
                  key={idx}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {item?.data?.title}
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

export default SearchBar;
