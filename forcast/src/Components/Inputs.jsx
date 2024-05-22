import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="flex flex-row md:flex-row justify-center my-6">
      <div className="flex flex-row md:flex-col w-3/4 md:w-3/4 items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:max-w-xs">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search for city..."
            className="text-xl font-light p-2 w-full shadow-2xl focus:outline-none capitalize placeholder-lowercase pl-10"
          />
          <BiSearch
            size={25}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer transition ease-out hover:scale-125"
            onClick={handleSearchClick}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center mt-4 md:mt-0  w-1/4 md:w-1/4">
        <button
          name="metric"
          className="text-xl text-white font-medium transition ease-out hover:scale-125 mr-1"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-medium transition ease-out hover:scale-125 ml-1 shadow-2xl"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
