// components/Categories.jsx
import React, { useState } from 'react';

// Example categories data with images
const exampleCategories = [
  { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/150?text=Electronics' },
  { id: 2, name: 'Fitness',    image: 'https://via.placeholder.com/150?text=Fitness' },
  { id: 3, name: 'Gaming',     image: 'https://via.placeholder.com/150?text=Gaming' },
  { id: 4, name: 'Accessories',image: 'https://via.placeholder.com/150?text=Accessories' },
  { id: 5, name: 'Cameras',     image: 'https://via.placeholder.com/150?text=Cameras' },
  { id: 6, name: 'Wearables',   image: 'https://via.placeholder.com/150?text=Wearables' },
];

const Categories = ({ categories = exampleCategories, onSelect }) => {
  const [activeId, setActiveId] = useState(null);

  const handleClick = (cat) => {
    setActiveId(cat.id);
    if (onSelect) onSelect(cat);
  };

  return (
    <div
      className="w-full mx-auto p-6"
      style={{ backgroundColor: '#171717' }}
    >
      <h3
        className="text-3xl font-bold mb-4 items-center text-center"
        style={{ color: '#EDEDED' }}
      >
        Browse by Category
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(cat => {
          const isActive = cat.id === activeId;
          return (
            <div
              key={cat.id}
              onClick={() => handleClick(cat)}
              className="cursor-pointer p-4 rounded-xl transition-transform duration-200 flex flex-col items-center"
              style={{
                backgroundColor: isActive ? '#DA0037' : '#444444',
                color: '#EDEDED',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-24 object-cover rounded-md mb-3"
              />
              <p className="text-center font-medium">{cat.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
