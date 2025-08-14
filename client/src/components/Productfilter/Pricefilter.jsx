import React, { useState, useCallback, useRef, useEffect } from 'react';

const Pricefilter = ({
  min = 0,
  max = 1000,
  step = 1,
  defaultValue = [min, max],
  currency = '$',
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  
  // Update value when defaultValue changes from parent (when products change)
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSliderChange = useCallback((newValue) => {
    setValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value) || min, value[1]);
    const next = [newMin, value[1]];
    handleSliderChange(next);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value) || max, value[0]);
    const next = [value[0], newMax];
    handleSliderChange(next);
  };

  const getPercentage = (val) => ((val - min) / (max - min)) * 100;

  const handleMouseDown = (index) => () => {
    setIsDragging(true);
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseMove = (moveEvent) => {
      const rect = slider.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100));
      const newValue = min + (percentage / 100) * (max - min);
      const roundedValue = Math.round(newValue / step) * step;

      const newValues = [...value];
      newValues[index] = Math.max(min, Math.min(max, roundedValue));
      
      if (index === 0) {
        newValues[0] = Math.min(newValues[0], newValues[1]);
      } else {
        newValues[1] = Math.max(newValues[0], newValues[1]);
      }
      
      handleSliderChange(newValues);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border border-gray-200/70 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Price Range
        </h3>
        <div className="px-3 py-1 bg-red-50 rounded-full border border-red-200">
          <span className="text-sm font-medium text-red-600">
            {currency}{value[0].toLocaleString()} - {currency}{value[1].toLocaleString()}
          </span>
        </div>
      </div>

      {/* Custom Range Slider */}
      <div className="mb-8">
        <div
          ref={sliderRef}
          className="relative h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full cursor-pointer shadow-inner"
        >
          {/* Active range */}
          <div
            className="absolute h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-sm"
            style={{
              left: `${getPercentage(value[0])}%`,
              width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
            }}
          />
          
          {/* Min thumb */}
          <div
            className={`absolute w-6 h-6 bg-white border-2 border-red-500 rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
              isDragging ? 'scale-125 shadow-xl' : ''
            }`}
            style={{ left: `${getPercentage(value[0])}%`, top: '50%' }}
            onMouseDown={handleMouseDown(0)}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-600 opacity-0 hover:opacity-20 transition-opacity" />
          </div>
          
          {/* Max thumb */}
          <div
            className={`absolute w-6 h-6 bg-white border-2 border-red-500 rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
              isDragging ? 'scale-125 shadow-xl' : ''
            }`}
            style={{ left: `${getPercentage(value[1])}%`, top: '50%' }}
            onMouseDown={handleMouseDown(1)}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-600 opacity-0 hover:opacity-20 transition-opacity" />
          </div>
        </div>
        
        {/* Range labels */}
        <div className="flex justify-between mt-2 text-sm text-slate-500">
          <span>{currency}{min.toLocaleString()}</span>
          <span>{currency}{max.toLocaleString()}</span>
        </div>
      </div>

      {/* Input fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Minimum</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">{currency}</span>
            </div>
            <input
              type="number"
              value={value[0]}
              min={min}
              max={value[1]}
              step={step}
              onChange={handleMinChange}
              className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-gray-400"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Maximum</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">{currency}</span>
            </div>
            <input
              type="number"
              value={value[1]}
              min={value[0]}
              max={max}
              step={step}
              onChange={handleMaxChange}
              className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-gray-400"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Pricefilter;
