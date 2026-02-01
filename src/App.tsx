import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { WeatherIllustration } from "./components/weatherIllustration";
import { StatCard } from "./components/StatCard";
import { fetchWeatherByCity } from "./api/weatherService";
import type { WeatherData } from "./types/types";

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFetch = async (city: string) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch("Antananarivo");
  }, []);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) handleFetch(search);
  };

  return (
    <div
      className={`w-150 h-225 shadow-2xl overflow-hidden flex flex-col justify-between font-serif relative transition-colors duration-700 
      ${isDarkMode ? "bg-[#1A1C1E] text-white" : "bg-[#FDF8F3] text-[#333]"}`}
    >
      <div className="absolute top-0 w-full h-12 flex justify-end items-center px-6 gap-4 z-50">
        <button
          onClick={() => window.electronAPI?.minimizeApp()}
          className="hover:opacity-50 transition-opacity"
        >
          <Icon icon="solar:minimize-square-linear" width="18" />
        </button>
        <button
           onClick={() => window.electronAPI?.closeApp()}
          className="hover:text-rose-400 transition-colors"
        >
          <Icon icon="solar:close-circle-linear" width="18" />
        </button>
      </div>

      <header className="relative z-20 px-10 pt-16 flex justify-between items-start">
        <div className="flex items-start">
          <span className="text-8xl font-light tracking-tighter italic">
            {weather?.temp || "0"}
          </span>
          <span className="text-4xl mt-4">°</span>
        </div>

        <div className="flex flex-col items-end gap-6 mt-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-500 border
              ${isDarkMode ? "bg-slate-700 border-slate-600 justify-end" : "bg-orange-100 border-orange-200 justify-start"}`}
          >
            <div
              className={`w-4 h-4 rounded-full shadow-sm flex items-center justify-center transition-transform
              ${isDarkMode ? "bg-blue-400" : "bg-orange-400"}`}
            >
              <Icon
                icon={isDarkMode ? "solar:moon-bold" : "solar:sun-bold"}
                className="text-white"
                width="10"
              />
            </div>
          </button>

          <form onSubmit={onSearchSubmit} className="relative group">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className={`w-24 bg-transparent border-b text-xs py-1 outline-none text-right focus:w-36 transition-all italic placeholder:opacity-30
                ${isDarkMode ? "border-white/10" : "border-black/10"}`}
            />
            <button
              type="submit"
              className="absolute -left-4 top-1.5 opacity-0 group-focus-within:opacity-40 transition-opacity"
            >
              <Icon icon="solar:magnifer-linear" width="12" />
            </button>
          </form>
        </div>
      </header>

      <main className="relative flex-1 flex flex-col items-center justify-center">
        <div className="absolute right-8 top-1/4 h-40 flex items-center pointer-events-none">
          <span
            className={`rotate-90 text-[10px] tracking-[0.6em] uppercase opacity-40 font-sans origin-center whitespace-nowrap
              ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {weather?.description || "Loading"}
          </span>
        </div>

        {loading ? (
          <Icon
            icon="solar:refresh-linear"
            className="animate-spin opacity-20"
            width="48"
          />
        ) : error ? (
          <div className="text-center italic opacity-40">City not found</div>
        ) : (
          <>
            <WeatherIllustration
              condition={weather?.description || "Clear"}
              isDarkMode={isDarkMode}
            />
            <div className="text-center mt-8 z-10">
              <h2 className="text-4xl tracking-[0.2em] uppercase font-medium">
                {weather?.city || "---"}
              </h2>
              <p className="text-xs opacity-40 mt-2 font-sans uppercase tracking-widest">
                {new Date().toLocaleDateString("en-GB", {
                  weekday: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </>
        )}
      </main>

      <footer
        className={`relative z-10 p-10 backdrop-blur-md transition-colors duration-700
        ${isDarkMode ? "bg-black/20" : "bg-white/20"}`}
      >
        <div
          className={`grid grid-cols-3 gap-6 mb-12 border-t pt-8
          ${isDarkMode ? "border-white/5" : "border-black/5"}`}
        >
          <StatCard
            label="Humidity"
            value={`${weather?.humidity || 0}%`}
            icon="solar:waterdrops-linear"
            isDarkMode={isDarkMode}
          />
          <StatCard
            label="Wind"
            value={`${weather?.windSpeed || 0} km/h`}
            icon="solar:wind-linear"
            isDarkMode={isDarkMode}
          />
          <StatCard
            label="Condition"
            value={weather?.description?.split(" ")[0] || "---"}
            icon="solar:cloud-sun-linear"
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="flex justify-between items-center px-2">
          {weather?.forecast.map((day, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 group cursor-default"
            >
              <span className="text-[10px] font-medium uppercase tracking-widest opacity-40">
                {day.day}
              </span>
              <div
                className={`w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <Icon
                  icon={day.icon}
                  width="22"
                  className={isDarkMode ? "text-white/60" : "text-black/60"}
                />
              </div>
              <span className="text-xs font-bold italic">{day.temp}°</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default WeatherApp;
