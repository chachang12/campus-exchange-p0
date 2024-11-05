import React from 'react';
import './CategoriesScrollBar.css'; // Import the custom CSS file

const CategoriesScrollBar = ({ categories }) => {
  return (
    <div className="w-full overflow-x-scroll custom-scrollbar">
      <div className="flex space-x-4 p-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex-shrink-0 bg-[#1F1F1F] text-white py-2 px-4 rounded-3xl outline outline-[1px] outline-gray-500">
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScrollBar;