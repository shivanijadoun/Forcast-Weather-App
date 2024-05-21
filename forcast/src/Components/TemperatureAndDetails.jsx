import React from 'react';
import { FaThermometerEmpty } from 'react-icons/fa';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const TemperatureAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
}) => {
  const verticaldetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()}Km/h`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div className="p-4">
      <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
        <p>{details}</p>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-between text-white py-3'>
        <img src={icon} alt="" className="w-20" />
        <p className='text-5xl my-7 md:my-0'>{`${Math.round(temp.toFixed())}°`}</p>
        <div className='flex flex-col space-y-3 items-start'>
          {verticaldetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className='flex font-light text-sm items-center justify-center'>
              <Icon size={18} className='mr-1' />
              {`${title}:`}
              <span className='font-medium ml-1'>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-white py-3 text-sm'>
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className='flex flex-col items-center'>
            <Icon size={18} className='mb-1' />
            <p className='text-sm'>{title}</p>
            <p className='font-medium'>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemperatureAndDetails;
