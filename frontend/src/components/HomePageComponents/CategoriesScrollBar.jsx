import React from 'react';
import './CategoriesScrollBar.css'; // Import the custom CSS file

const CategoriesScrollBar = ({ categories, selectedCategories, setSelectedCategories }) => {
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="w-full overflow-x-scroll custom-scrollbar">
      <div className="flex space-x-4 p-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`flex-shrink-0 py-2 px-4 rounded-3xl outline outline-1 outline-gray-500 ${
              selectedCategories.includes(category) ? 'bg-white text-black' : 'bg-[#1F1F1F] text-white'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScrollBar;