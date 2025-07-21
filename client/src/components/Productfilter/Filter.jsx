import React from 'react'

const Filter = ({ types }) => {
  return (
        <div>
        <h2>Filter Products</h2>
        <ul>
            {types.map((type) => (
                <li key={type.id}>
                    <input type="checkbox" id={`filter-${type.id}`} />
                    <label htmlFor={`filter-${type.id}`}>{type.name}</label>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Filter



