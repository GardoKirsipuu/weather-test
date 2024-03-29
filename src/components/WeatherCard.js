import { useEffect, useState } from "react";

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setWeather({temperature: data.main.temp});
      });
  }, [city.name]);

  return (
    <div>
      <h3>{city.name}</h3>
      <p>{weather ? weather.temperature : '-/-'}</p>
    </div>
  );
};

export default WeatherCard;