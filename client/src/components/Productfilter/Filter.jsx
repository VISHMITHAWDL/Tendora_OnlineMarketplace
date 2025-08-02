import React from 'react';

const CategoryTypeFilter = ({ categoryTypes, selectedTypeId, onSelectType }) => {
  return (
    <div className="space-y-2">
      <label className="font-semibold mb-2 block">Category Type</label>
      <div className="grid grid-cols-2 gap-2">
        <label className={`flex items-center p-2 rounded-lg cursor-pointer border transition duration-200 ${selectedTypeId === '' ? 'bg-blue-100 border-[#DA0037]' : 'bg-white border-gray-300 hover:border-[#da2800b8]'}`}
        >
          <input
            type="checkbox"
            checked={selectedTypeId === ''}
            onChange={() => onSelectType('')}
            className="accent-[#da2800b8] mr-2"
          />
          <span className="font-medium">All</span>
        </label>
        {categoryTypes.map(type => (
          <label
            key={type.id}
            className={`flex items-center p-2 rounded-lg cursor-pointer border transition duration-200 ${selectedTypeId === type.id ? 'bg-blue-100 border-[#DA0037]' : 'bg-white border-gray-300 hover:border-[#da2800b8]'}`}
          >
            <input
              type="checkbox"
              checked={selectedTypeId === type.id}
              onChange={() => onSelectType(type.id)}
              className="accent-[#da2800b8] mr-2"
            />
            <span className="font-medium">{type.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryTypeFilter;