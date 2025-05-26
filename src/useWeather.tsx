import { useState } from 'react';

export const useWeather = (apiKey: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);

  const fetchWeather = async (city: string) => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`City not found (${response.status})`);
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError({ message: (err as Error).message });
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error, fetchWeather };
};
