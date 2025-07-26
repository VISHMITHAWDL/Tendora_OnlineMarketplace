import React from 'react';

/**
 * Rating component to display star ratings.
 * @param {Object} props
 * @param {number} props.value - The rating value (e.g., 4.5)
 * @param {number} [props.max=5] - The maximum number of stars
 * @param {string} [props.size='1.5rem'] - The size of the stars
 */
const Rating = ({ value = 0, max = 5, size = '1.5rem' }) => {
  // Helper to render stars
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (value >= i) {
      // Full star
      stars.push(
        <span key={i} style={{ color: '#FFD700', fontSize: size }}>&#9733;</span>
      );
    }else {
      // Empty star
      stars.push(
        <span key={i} style={{ color: '#e4e5e9', fontSize: size }}>&#9733;</span>
      );
    }
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {stars}
      <span style={{ marginLeft: 8, color: '#555', fontSize: '1rem' }}>{value.toFixed(1)}</span>
    </div>
  );
};

export default Rating;