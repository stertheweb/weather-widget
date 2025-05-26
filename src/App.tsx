import { useState } from 'react';
import { useWeather } from './useWeather';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [city, setCity] = useState('');
  const [toggle, setToggle] = useState(false);
  const { weatherData, loading, error, fetchWeather } = useWeather(apiKey);

  return (
    <>
      <h1>Weather Widget</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather(city);
        }}
      >
        <input
          type="text"
          value={city}
          placeholder="Enter City"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Fetch Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {weatherData && (
        <>
          <h2>{weatherData.name}</h2>
          <p>
            Temperature:{' '}
            {toggle
              ? `${Math.round(((weatherData.main.temp - 32) * 5) / 9)}°C`
              : `${Math.round(weatherData.main.temp)}°F`}
          </p>
          <p>Description: {weatherData.weather[0]?.description}</p>
          <button onClick={() => setToggle((prev) => !prev)}>
            {toggle ? 'Show Fahrenheit' : 'Show Celsius'}
          </button>
        </>
      )}
    </>
  );
}

export default App;
