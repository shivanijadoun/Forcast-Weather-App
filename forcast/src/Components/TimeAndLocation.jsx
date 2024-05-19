import React from 'react';

const TimeAndLocation = ({ weather }) => {
    if (!weather) {
        return null; 
    }

    const { formattedLocalTime, name, country } = weather;

    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <p className='text-white text-xl font-extralight'>
                    {formattedLocalTime}
                </p>
            </div>
            <div className='flex items-center justify-center my-3'>
                <p className='text-white text-3xl font-medium'>
                    {`${name}, ${country}`}
                </p>
            </div>
        </div>
    );
};

export default TimeAndLocation;
