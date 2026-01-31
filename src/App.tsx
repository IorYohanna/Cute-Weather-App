import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { WeatherHero } from "./components/WeatherHero";
import { StatCard } from "./components/StatCard";
import { fetchWeatherByCity } from "./api/weatherService";
import type { WeatherData } from "./types/types";

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
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
      setError(true);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { handleFetch("Kyoto"); }, []);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) handleFetch(search);
  };

  return (
    <div className="min-h-screen bg-stone-200 flex justify-center items-center font-['Quicksand'] p-4">
      <div className="relative w-full max-w-200 min-h-225 bg-[#FFFBF7] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col justify-between selection:bg-rose-200">
        <div className="noise-bg" />

        <div className="absolute top-[-10%] left-[-10%] w-2/3 h-1/2 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-2/3 h-1/2 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

        <header className="relative z-10 px-10 pt-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-stone-700">{weather?.city || "---"}</h2>
            <span className="text-sm font-medium text-stone-400">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>

          <form onSubmit={onSearchSubmit} className="relative">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" width="20" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="pl-10 pr-4 py-3 bg-white/50 border border-stone-200 rounded-2xl text-sm w-64 focus:bg-white transition-all outline-none"
            />
          </form>
        </header>

        <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-10">
          {loading ? (
            <Icon icon="solar:refresh-linear" className="animate-spin text-stone-200" width="64" />
          ) : error ? (
            <div className="text-center">
              <Icon icon="solar:sad-square-linear" className="text-rose-200 mx-auto" width="64" />
              <p className="mt-4 font-bold text-stone-400 uppercase tracking-widest text-xs">City not found</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <WeatherHero />
              <div className="text-center flex flex-col items-center">
                <div className="flex items-start">
                  <span className="text-9xl font-bold text-stone-700">{weather?.temp}</span>
                  <span className="text-5xl text-stone-300 mt-4">°</span>
                </div>
                <div className="mt-4 px-6 py-2 bg-white/40 border border-white/50 rounded-full backdrop-blur-md flex items-center gap-2 text-stone-500 shadow-sm">
                  <Icon icon="solar:clouds-linear" className="text-stone-400" />
                  <span className="font-bold text-xs uppercase tracking-widest">{weather?.description}</span>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="relative z-10 p-10 bg-white/40 backdrop-blur-xl border-t border-white/40">
          <div className="grid grid-cols-3 gap-6 mb-12">
            <StatCard label="Humidity" value={`${weather?.humidity || 0}%`} icon="solar:waterdrops-linear" colorClass="text-blue-400" bgClass="bg-blue-50" />
            <StatCard label="Wind" value={`${weather?.windSpeed || 0} km/h`} icon="solar:wind-linear" colorClass="text-teal-400" bgClass="bg-teal-50" />
            <StatCard label="UV Index" value="Low" icon="solar:sun-linear" colorClass="text-amber-400" bgClass="bg-amber-50" />
          </div>

          <div className="flex justify-between items-center px-2">
            {weather?.forecast.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 group cursor-default">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{day.day}</span>
                <div className={`w-12 h-12 rounded-full ${day.bgClass} flex items-center justify-center border border-stone-100 ${day.colorClass} shadow-sm group-hover:scale-110 transition-all`}>
                  <Icon icon={day.icon} width="24" />
                </div>
                <span className="text-sm font-bold text-stone-600">{day.temp}°</span>
              </div>
            ))}
          </div>
        </footer>

        <div className="absolute bottom-95 left-10 opacity-20 hover:opacity-100 transition-opacity">
          <Icon icon="solar:cloud-linear" width="32" className="text-stone-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;