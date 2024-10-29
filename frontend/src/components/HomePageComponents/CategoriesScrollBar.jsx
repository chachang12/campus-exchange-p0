import React from 'react';
import './CategoriesScrollBar.css'; // Import the custom CSS file

const CategoriesScrollBar = ({ categories }) => {
  return (
    <div className="w-full overflow-x-scroll custom-scrollbar">
      <div className="flex space-x-4 p-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex-shrink-0 text-white py-2 px-4 rounded-3xl outline outline-1 outline-white">
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScrollBar;