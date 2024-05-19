import React, { useState } from 'react';
import { BiSearch, BiCurrentLocation } from 'react-icons/bi';

const Inputs = ({ setQuery, setUnits }) => {
    const [city, setCity] = useState('');

    const handleSearchClick = () => {
        if (city !== "") setQuery({ q: city });
    };

    return (
        <div className="flex  md:flex-row justify-center my-6">
            <div className="flex  md:flex-row w-full md:w-3/4 items-center justify-center space-y-4 space-x-2 md:space-y-0 md:space-x-4">
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder="Search for city..."
                    className="text-xl font-light p-2 w-full md:max-w-xs shadow-xl focus:outline-none capitalize placeholder-lowercase"
                  
                />
                <div className="flex space-x-4">
                    <BiSearch
                        size={25}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                        onClick={handleSearchClick}
                    />
                    {/* <BiCurrentLocation
                        size={25}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                        onClick={handleLocationClick}
                    /> */}
                </div>
            </div>
            <div className="flex flex-row w-full md:w-1/4 items-center justify-center mt-4 md:mt-0 ">
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
                    className="text-xl text-white font-medium transition ease-out hover:scale-125 ml-1"
                    onClick={() => setUnits("imperial")}
                >
                    °F
                </button>
            </div>
        </div>
    );
};

export default Inputs;
