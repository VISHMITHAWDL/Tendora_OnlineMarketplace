import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcum = ({ additionalCrumbs, type_id, productName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map for category display names
  const categoryMap = {
    womenfashion: 'Women Fashion',
    menfashion: 'Men Fashion',
    kidssection: 'Kid Section',
  };

  // If type_id and productName are provided, use them for breadcrumb
  if (type_id && productName) {
    return (
      <nav className="flex py-3 px-5 my-3" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-[#DA0037] transition-colors">Home</Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <Link to={`/${type_id}`} className="text-sm font-medium text-gray-700 hover:text-[#DA0037] transition-colors">{categoryMap[type_id] || type_id}</Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <span className="text-sm font-semibold text-[#DA0037]" aria-current="page">{productName}</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Skip breadcrumb on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="flex py-3 px-5 my-3" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-[#DA0037] transition-colors">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          let formattedName = categoryMap[name] || name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          if (isLast && additionalCrumbs && additionalCrumbs[index]) {
            formattedName = additionalCrumbs[index];
          }

          return (
            <React.Fragment key={routeTo}>
              <li aria-hidden="true" className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                {isLast ? (
                  <span className="text-sm font-semibold text-[#DA0037]" aria-current="page">{formattedName}</span>
                ) : (
                  <Link to={routeTo} className="text-sm font-medium text-gray-700 hover:text-[#DA0037] transition-colors">{formattedName}</Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcum;
