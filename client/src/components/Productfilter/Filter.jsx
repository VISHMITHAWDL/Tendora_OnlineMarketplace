import React, { useState } from 'react';

const Filter = ({ types = [], onChange }) => {
  const [selected, setSelected] = useState([]);

  const handleCheckbox = (type) => {
    let updated;
    if (selected.some(t => (t.id || t.type_id) === (type.id || type.type_id))) {
      updated = selected.filter(t => (t.id || t.type_id) !== (type.id || type.type_id));
    } else {
      updated = [...selected, type];
    }
    setSelected(updated);
    onChange && onChange(updated);
  };

  return (
    <div>
      <h2>Filter Products</h2>
      <ul>
        {types.map((type) => {
          const typeKey = type.id || type.type_id;
          return (
            <li key={typeKey}>
              <input
                type="checkbox"
                id={`filter-${typeKey}`}
                checked={selected.some(t => (t.id || t.type_id) === typeKey)}
                onChange={() => handleCheckbox(type)}
              />
              <label htmlFor={`filter-${typeKey}`}>{type.name}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;



