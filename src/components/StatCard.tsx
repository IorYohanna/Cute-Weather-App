import { Icon } from '@iconify/react';
import type { WeatherStat } from '../types/types';

export const StatCard = ({ label, value, icon, colorClass, bgClass }: WeatherStat) => (
  <div className="group bg-white/60 p-4 rounded-2xl border border-white shadow-sm hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center justify-center gap-2">
    <div className={`p-2 ${bgClass} ${colorClass} rounded-full`}>
      <Icon icon={icon} width="24" />
    </div>
    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{label}</span>
    <span className="text-lg font-bold text-stone-600">{value}</span>
  </div>
);