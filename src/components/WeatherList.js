import React from 'react';

const WeatherList = ({ selected }) => (
  <div data-testid="my-weather-list">
    {selected && selected.map((city) =>
      <div key={`${city.lat}-${city.lon}`}>{city.name}</div>
    )}
  </div>
);

export default WeatherList;