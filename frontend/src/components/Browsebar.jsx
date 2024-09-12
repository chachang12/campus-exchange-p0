import React from 'react';
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";

const Browsebar = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center border-2 border-gray-300 rounded-md p-2 w-4/12 mb-4">
        <CiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for products"
          className="flex-grow outline-none"
        />
      </div>
      <div className='flex flex-row items-center'>
        <span className='mr-1'>
            Filter
        </span>
        <CiFilter />
      </div>
    </div>
  );
};

export default Browsebar;