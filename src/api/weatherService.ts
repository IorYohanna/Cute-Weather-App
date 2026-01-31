/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import type { WeatherData, ForecastItem } from '../types/types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const mapConditionToStyle = (condition: string) => {
  switch (condition) {
    case 'Clear': return { icon: 'solar:sun-2-linear', color: 'text-yellow-500', bg: 'bg-yellow-50' };
    case 'Rain': return { icon: 'solar:cloud-rain-linear', color: 'text-blue-400', bg: 'bg-blue-50' };
    case 'Clouds': return { icon: 'solar:cloud-linear', color: 'text-stone-400', bg: 'bg-white' };
    case 'Snow': return { icon: 'solar:snowflake-linear', color: 'text-blue-200', bg: 'bg-blue-50' };
    default: return { icon: 'solar:sun-fog-linear', color: 'text-orange-400', bg: 'bg-orange-50' };
  }
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const geoRes = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  if (geoRes.data.length === 0) throw new Error("Ville non trouvée");
  const { lat, lon, name } = geoRes.data[0];

  const [currentRes, forecastRes] = await Promise.all([
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
  ]);

  const dailyForecast: ForecastItem[] = forecastRes.data.list
    .filter((item: any) => item.dt_txt.includes("12:00:00"))
    .map((item: any) => {
      const style = mapConditionToStyle(item.weather[0].main);
      return {
        day: new Date(item.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short' }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: style.icon,
        colorClass: style.color,
        bgClass: style.bg
      };
    });

  return {
    city: name,
    temp: Math.round(currentRes.data.main.temp),
    description: currentRes.data.weather[0].description,
    humidity: currentRes.data.main.humidity,
    windSpeed: Math.round(currentRes.data.wind.speed * 3.6),
    condition: currentRes.data.weather[0].main,
    forecast: dailyForecast
  };
};