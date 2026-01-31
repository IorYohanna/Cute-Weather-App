export interface ForecastItem {
  day: string;
  temp: number;
  icon: string;
  colorClass: string;
  bgClass: string;
  condition: string;
}

export interface WeatherStat {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  condition: string;
  forecast: ForecastItem[];
}