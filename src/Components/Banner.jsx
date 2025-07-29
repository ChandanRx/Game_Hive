import React, { useEffect } from 'react';

const Banner = ({ gameBanner }) => {
  useEffect(() => {
    console.log('gameBanner', gameBanner);
  }, [gameBanner]);

  return (
    <div className="relative w-full h-[250px] md:h-[300px] lg:h-[320px] rounded-xl overflow-hidden">
      <img
        src={gameBanner.background_image}
        alt="background_image"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 p-4 bg-gradient-to-t from-slate-900 to-transparent w-full">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
          {gameBanner.name}
        </h2>
        <button className=" shadow-sm 
               bg-gray-200 text-gray-800 
               dark:bg-gray-700 dark:text-white 
               hover:bg-gray-300 dark:hover:bg-gray-600 
               disabled:opacity-50 px-3 py-1 rounded">
          Get Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
