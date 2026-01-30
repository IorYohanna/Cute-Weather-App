export interface WeatherStat {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}

export interface ForecastItem {
  day: string;
  temp: number;
  icon: string;
  colorClass: string;
  bgClass: string;
}