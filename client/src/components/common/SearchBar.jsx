import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ 
  products = [], 
  placeholder = "Search products...", 
  onSearchResults,
  onClearSearch,
  className = "",
  showDropdown = true,
  maxResults = 5 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const searchRef = useRef(null);
  const searchTimeout = useRef(null);
  const navigate = useNavigate();

  // Search function that filters products based on name, description, and brand
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      if (onSearchResults) onSearchResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    
    const filteredProducts = products.filter(product => {
      const searchFields = [
        product.name?.toLowerCase() || '',
        product.description?.toLowerCase() || '',
        product.brand?.toLowerCase() || '',
        product.slug?.toLowerCase() || ''
      ];
      
      return searchFields.some(field => 
        field.includes(lowercaseQuery)
      );
    });

    // Sort results by relevance (name matches first, then description)
    const sortedResults = filteredProducts.sort((a, b) => {
      const aNameMatch = a.name?.toLowerCase().includes(lowercaseQuery);
      const bNameMatch = b.name?.toLowerCase().includes(lowercaseQuery);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // If both or neither match name, sort by name alphabetically
      return (a.name || '').localeCompare(b.name || '');
    });

    const limitedResults = sortedResults.slice(0, maxResults);
    setSearchResults(limitedResults);
    setShowSearchResults(showDropdown && limitedResults.length > 0);
    
    if (onSearchResults) onSearchResults(sortedResults);
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    // Debounce search to avoid excessive filtering
    searchTimeout.current = setTimeout(() => {
      performSearch(query);
    }, 300);
  };

  // Handle search on Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        performSearch(searchQuery);
        setShowSearchResults(false);
        // You can navigate to a search results page if needed
        // navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    } else if (e.key === 'Escape') {
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (product) => {
    setSearchQuery('');
    setShowSearchResults(false);
    // Navigate to product detail page
    navigate(`/product/${product.slug || product.id}`);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    if (onSearchResults) onSearchResults([]);
    if (onClearSearch) onClearSearch();
  };

  // Handle clicks outside search component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
        if (onClearSearch) onClearSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [onClearSearch]);

  // Highlight matching text in search results
  const highlightMatch = (text, query) => {
    if (!text || !query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-[#c92c2c] text-white px-1 rounded">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchQuery && searchResults.length > 0) {
              setShowSearchResults(true);
            }
          }}
              className="w-full bg-gray-100 text-gray-800 border-2 border-gray-300 placeholder-gray-400 px-4 py-2 pl-10 pr-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300"
        />
        
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 hover:text-[#DA0037] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showSearchResults && searchResults.length > 0 && showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#444444] rounded-md shadow-lg border border-[#666666] z-50 max-h-80 overflow-y-auto">
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => handleResultClick(product)}
              className="px-4 py-3 hover:bg-[#555555] cursor-pointer border-b border-[#666666] last:border-b-0 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
                    }}
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-grow min-w-0">
                  <p className="text-[#EDEDED] text-sm font-medium truncate">
                    {highlightMatch(product.name, searchQuery)}
                  </p>
                    <p className="text-gray-600 text-xs truncate">
                    {product.brand && (
                      <span className="text-[#DA0037]">{product.brand}</span>
                    )}
                    {product.brand && ' • '}
                    {highlightMatch(
                      product.description?.substring(0, 60) + 
                      (product.description?.length > 60 ? '...' : ''), 
                      searchQuery
                    )}
                  </p>
                  {product.rating && (
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-gray-400 text-xs ml-1">{product.rating}</span>
                    </div>
                  )}
                </div>
                
                {/* Price */}
                <div className="flex-shrink-0">
                    <p className="text-red-600 text-sm font-semibold">
                    ${product.price?.toFixed(2)}
                  </p>
                  {product.newArrival && (
                      <span className="text-xs bg-gradient-to-r from-red-600 to-red-500 text-white px-1 py-0.5 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Show all results option */}
          {products.filter(p => {
            const query = searchQuery.toLowerCase();
            return [p.name, p.description, p.brand, p.slug]
              .some(field => field?.toLowerCase().includes(query));
          }).length > maxResults && (
            <div
              onClick={() => {
                performSearch(searchQuery);
                setShowSearchResults(false);
              }}
              className="px-4 py-3 hover:bg-[#555555] cursor-pointer text-center text-[#DA0037] text-sm font-medium border-t border-[#666666] transition-colors"
            >
              View all {products.filter(p => {
                const query = searchQuery.toLowerCase();
                return [p.name, p.description, p.brand, p.slug]
                  .some(field => field?.toLowerCase().includes(query));
              }).length} results for "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* No results message */}
      {showSearchResults && searchResults.length === 0 && searchQuery.trim() && showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#444444] rounded-md shadow-lg border border-[#666666] z-50">
          <div className="px-4 py-3 text-center text-gray-400 text-sm">
            No products found for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
