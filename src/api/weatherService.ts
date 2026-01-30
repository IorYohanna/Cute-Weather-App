import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherByCity = async (city: string) => {
  const geoRes = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );

  if (geoRes.data.length === 0) throw new Error("Ville non trouvée");
  const { lat, lon, name, country } = geoRes.data[0];

  const weatherRes = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  return {
    city: name,
    country: country,
    temp: Math.round(weatherRes.data.main.temp),
    description: weatherRes.data.weather[0].description,
    humidity: weatherRes.data.main.humidity,
    windSpeed: Math.round(weatherRes.data.wind.speed * 3.6), // m/s to km/h
    condition: weatherRes.data.weather[0].main,
  };
};