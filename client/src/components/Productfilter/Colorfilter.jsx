
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const ColorFilter = ({ 
  colors = [
    { name: 'Red', value: '#ef4444', hex: '#ef4444' },
    { name: 'Blue', value: '#3b82f6', hex: '#3b82f6' },
    { name: 'Green', value: '#10b981', hex: '#10b981' },
    { name: 'Purple', value: '#8b5cf6', hex: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899', hex: '#ec4899' },
    { name: 'Yellow', value: '#f59e0b', hex: '#f59e0b' },
    { name: 'Orange', value: '#f97316', hex: '#f97316' },
    { name: 'Teal', value: '#14b8a6', hex: '#14b8a6' },
    { name: 'Indigo', value: '#6366f1', hex: '#6366f1' },
    { name: 'Rose', value: '#f43f5e', hex: '#f43f5e' },
    { name: 'Black', value: '#1f2937', hex: '#1f2937' },
    { name: 'White', value: '#ffffff', hex: '#ffffff' },
    { name: 'Gray', value: '#6b7280', hex: '#6b7280' },
    { name: 'Brown', value: '#92400e', hex: '#92400e' },
    { name: 'Navy', value: '#1e3a8a', hex: '#1e3a8a' },
  ],
  onChange,
  multiple = true,
  layout = 'grid' // 'grid' or 'list'
}) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [hoveredColor, setHoveredColor] = useState(null);

  const handleColorSelect = (color) => {
    let newSelected;
    
    if (multiple) {
      if (selectedColors.some(c => c.value === color.value)) {
        newSelected = selectedColors.filter(c => c.value !== color.value);
      } else {
        newSelected = [...selectedColors, color];
      }
    } else {
      newSelected = selectedColors.some(c => c.value === color.value) ? [] : [color];
    }
    
    setSelectedColors(newSelected);
    onChange?.(newSelected);
  };

  const clearAll = () => {
    setSelectedColors([]);
    onChange?.([]);
  };

  const isSelected = (color) => selectedColors.some(c => c.value === color.value);

  const ColorSwatch = ({ color, size = 'normal' }) => {
    const selected = isSelected(color);
    const isWhite = color.value === '#ffffff';
    
    const sizeClasses = {
      small: 'w-8 h-8',
      normal: 'w-12 h-12',
      large: 'w-16 h-16'
    };

    return (
      <div
        className={`relative group cursor-pointer transition-all duration-300 ${
          size === 'normal' ? 'hover:scale-110' : 'hover:scale-105'
        }`}
        onClick={() => handleColorSelect(color)}
        onMouseEnter={() => setHoveredColor(color)}
        onMouseLeave={() => setHoveredColor(null)}
      >
        <div
          className={`${sizeClasses[size]} rounded-full border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
            selected 
              ? 'border-slate-800 ring-4 ring-blue-500/30' 
              : isWhite 
                ? 'border-slate-300 hover:border-slate-400' 
                : 'border-white/50 hover:border-white'
          }`}
          style={{ backgroundColor: color.value }}
        >
          {/* Checkmark for selected colors */}
          {selected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`rounded-full ${
                isWhite || color.value === '#f59e0b' || color.value === '#fbbf24' 
                  ? 'bg-slate-800' 
                  : 'bg-white'
              } p-1 shadow-lg`}>
                <Check 
                  size={size === 'large' ? 16 : size === 'small' ? 10 : 12} 
                  className={`${
                    isWhite || color.value === '#f59e0b' || color.value === '#fbbf24'
                      ? 'text-white' 
                      : 'text-slate-800'
                  }`} 
                />
              </div>
            </div>
          )}
          
          {/* Hover glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{ 
              background: `radial-gradient(circle, ${color.value}40, transparent 70%)`,
              transform: 'scale(1.5)'
            }}
          />
        </div>
        
        {/* Tooltip */}
        {hoveredColor?.value === color.value && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-slate-800 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
              {color.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg border border-slate-200/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Filter by Color
        </h3>
        {selectedColors.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200"
          >
            <X size={14} />
            Clear ({selectedColors.length})
          </button>
        )}
      </div>

      {/* Selected colors preview */}
      {selectedColors.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
          <p className="text-sm font-medium text-slate-700 mb-3">Selected Colors:</p>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color, index) => (
              <div key={index} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <ColorSwatch color={color} size="small" />
                <span className="text-sm font-medium text-slate-700">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Color grid/list */}
      {layout === 'grid' ? (
        <div className="grid grid-cols-6 md:grid-cols-8 gap-4">
          {colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <ColorSwatch color={color} />
              <span className="text-xs text-slate-600 text-center font-medium">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected(color)
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
              onClick={() => handleColorSelect(color)}
            >
              <ColorSwatch color={color} />
              <div className="flex-1">
                <p className="font-medium text-slate-800">{color.name}</p>
                <p className="text-sm text-slate-500 uppercase">{color.hex}</p>
              </div>
              {isSelected(color) && (
                <Check size={20} className="text-blue-600" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer info */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-500 text-center">
          {multiple ? 'Select multiple colors' : 'Select one color'} • {colors.length} colors available
        </p>
      </div>
    </div>
  );
};
export default ColorFilter;