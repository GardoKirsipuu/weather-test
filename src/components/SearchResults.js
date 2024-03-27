import React from 'react';

const SearchResults = ({ searchResults, selectCity }) => (
  <div data-testid="search-results">
    {searchResults.map((city) =>
      <div
        key={`${city.lat}-${city.lon}`}
        onClick={() => selectCity(city)}
      >{city.name}, {city.lat}, {city.lon}
      </div>
    )}
  </div>
);

export default SearchResults;