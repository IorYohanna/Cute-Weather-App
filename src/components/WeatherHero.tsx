import { Icon } from '@iconify/react';

export const WeatherHero = () => (
  <div className="relative w-64 h-64 mb-6 animate-float cursor-default group">
    <div className="absolute inset-0 m-auto w-40 h-40 bg-linear-to-tr from-amber-200 to-orange-100 rounded-full shadow-[0_0_60px_-10px_rgba(251,191,36,0.3)] flex flex-col items-center justify-center border border-orange-100/50">
      <div className="relative mt-2 flex gap-4">
        <div className="w-3 h-3 bg-stone-700 rounded-full animate-blink"></div>
        <div className="w-3 h-3 bg-stone-700 rounded-full animate-blink"></div>
      </div>
      <div className="absolute top-[48%] w-full px-7 flex justify-between opacity-40">
        <div className="w-4 h-2 bg-rose-400 rounded-full blur-[2px]"></div>
        <div className="w-4 h-2 bg-rose-400 rounded-full blur-[2px]"></div>
      </div>
      <div className="w-4 h-2 mt-1 border-b-[3px] border-stone-700 rounded-full"></div>
    </div>

    <div className="absolute bottom-10 -left-4 bg-white/90 backdrop-blur-sm w-24 h-12 rounded-full shadow-sm animate-drift delay-500"></div>
    <div className="absolute bottom-16 -right-6 bg-white/80 backdrop-blur-sm w-20 h-10 rounded-full shadow-sm animate-drift delay-1000"></div>
    
    <Icon icon="solar:star-fall-linear" className="absolute top-0 right-10 text-amber-400 animate-pulse" width="24" />
  </div>
);