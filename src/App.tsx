import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { WeatherHero } from "./components/WeatherHero";
import { StatCard } from "./components/StatCard";
import { fetchWeatherByCity } from "./api/weatherService";
import type { ForecastItem } from "./types/types";

const FORECAST_DATA: ForecastItem[] = [
  {
    day: "Tue",
    temp: 19,
    icon: "solar:sun-fog-linear",
    colorClass: "text-orange-400",
    bgClass: "bg-orange-50",
  },
  {
    day: "Wed",
    temp: 16,
    icon: "solar:cloud-rain-linear",
    colorClass: "text-blue-400",
    bgClass: "bg-blue-50",
  },
  {
    day: "Thu",
    temp: 21,
    icon: "solar:sun-2-linear",
    colorClass: "text-yellow-500",
    bgClass: "bg-yellow-50",
  },
  {
    day: "Fri",
    temp: 18,
    icon: "solar:cloud-linear",
    colorClass: "text-stone-400",
    bgClass: "bg-white",
  },
  {
    day: "Sat",
    temp: 15,
    icon: "solar:moon-stars-linear",
    colorClass: "text-indigo-400",
    bgClass: "bg-indigo-50",
  },
];

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("Kyoto");

  const handleFetch = async (city: string) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(true)
      console.log
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch("Kyoto");
  }, []);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) handleFetch(search);
  };

  return (
    <div className="min-h-screen bg-stone-200 flex justify-center items-center font-['Quicksand'] p-4">
      <div className="relative w-full max-w-200 aspect-square bg-[#FFFBF7] rounded-4xl shadow-2xl overflow-hidden flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900">
        <div className="noise-bg" />

        <div className="absolute top-[-10%] left-[-10%] w-2/3 h-2/3 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-2/3 h-2/3 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

        <header className="relative z-10 px-10 pt-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-stone-700">
              {weather?.city || "---"}
            </h2>
            <span className="text-sm font-medium text-stone-400">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>

          <form onSubmit={onSearchSubmit} className="relative">
            <Icon
              icon="solar:magnifer-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              width="20"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="pl-10 pr-4 py-3 bg-white/50 border border-stone-200 rounded-2xl text-sm w-64 focus:bg-white focus:border-rose-200 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
            />
          </form>
        </header>

        <main className="relative z-10 flex-1 flex flex-col justify-center items-center">
          {loading ? (
            <Icon
              icon="solar:refresh-linear"
              className="animate-spin text-stone-300"
              width="64"
            />
          ) : error ? (
            <div className="text-center animate-bounce">
              <Icon
                icon="solar:sad-square-linear"
                className="text-rose-300 mx-auto"
                width="64"
              />
              <p className="mt-4 font-bold text-stone-400 uppercase tracking-widest text-xs">
                City not found
              </p>
            </div>
          ) : (
            <>
              <WeatherHero condition={weather?.condition} />

              <div className="text-center flex flex-col items-center">
                <div className="flex items-start">
                  <span className="text-8xl font-bold text-stone-700 ml-4">
                    {weather?.temp}
                  </span>
                  <span className="text-4xl text-stone-400 mt-2">°</span>
                </div>
                <div className="mt-2 px-4 py-1.5 bg-white/40 border border-white/50 rounded-full backdrop-blur-md flex items-center gap-2 text-stone-500">
                  <Icon icon="solar:clouds-linear" className="text-stone-400" />
                  <span className="font-medium capitalize">
                    {weather?.description} & Cute
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            <div className="relative">
              <div className="absolute -top-4 left-2 w-1.5 h-6 bg-stone-300/50 rounded-full blur-[1px] steam-1" />
              <div className="absolute -top-3 left-5 w-1.5 h-6 bg-stone-300/50 rounded-full blur-[1px] steam-2" />
              <Icon
                icon="solar:tea-cup-linear"
                width="48"
                className="text-stone-400"
              />
            </div>
          </div>
        </main>

        <footer className="relative z-10 p-10 bg-white/30 backdrop-blur-xl border-t border-white/40">
          <div className="grid grid-cols-3 gap-6 mb-10">
            <StatCard
              label="Humidity"
              value={`${weather?.humidity || 0}%`}
              icon="solar:waterdrops-linear"
              colorClass="text-blue-400"
              bgClass="bg-blue-50"
            />
            <StatCard
              label="Wind"
              value={`${weather?.windSpeed || 0} km/h`}
              icon="solar:wind-linear"
              colorClass="text-teal-400"
              bgClass="bg-teal-50"
            />
            <StatCard
              label="Condition"
              value={weather?.condition || "---"}
              icon="solar:sun-linear"
              colorClass="text-amber-400"
              bgClass="bg-amber-50"
            />
          </div>

          <div className="flex justify-between items-center px-2">
            {FORECAST_DATA.map((day, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 cursor-pointer hover:-translate-y-1 transition-transform group"
              >
                <span className="text-xs font-semibold text-stone-500">
                  {day.day}
                </span>
                <div
                  className={`w-10 h-10 rounded-full ${day.bgClass} flex items-center justify-center border border-stone-100 ${day.colorClass} group-hover:shadow-md transition-all`}
                >
                  <Icon icon={day.icon} width="20" />
                </div>
                <span className="text-sm font-bold text-stone-600">
                  {day.temp}°
                </span>
              </div>
            ))}
          </div>
        </footer>

        <div
          className="absolute bottom-64 left-10 opacity-30 hover:opacity-80 transition-opacity cursor-help"
          title="Zzz..."
        >
          <Icon
            icon="solar:cat-linear"
            width="32"
            className="text-stone-500 animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
