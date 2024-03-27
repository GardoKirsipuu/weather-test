import { useState } from 'react';
import './App.css';
import SearchResults from './components/SearchResults';
import WeatherList from './components/WeatherList';
import Search from './components/Search';

import { createMockServer } from './createMockServer';

if (process.env.NODE_ENV === 'development'){
  createMockServer();
};

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);

  const selectCity = (city) => {
    setSelected([city, ...selected]);
  }

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <Search setSearchResults={setSearchResults} />

      <SearchResults searchResults={searchResults} selectCity={selectCity} />

      <WeatherList selected={selected} />
    </div>
  );
};

export default App;
