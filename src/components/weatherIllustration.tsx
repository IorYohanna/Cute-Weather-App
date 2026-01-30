import { Icon } from '@iconify/react';

export const WeatherIllustration = ({ condition }: { condition: string }) => {
  const isRainy = ['Rain', 'Drizzle', 'Thunderstorm'].includes(condition);
  const isCloudy = condition === 'Clouds';
  const isSnowy = condition === 'Snow';

  return (
    <div className="relative w-64 h-64 mb-6 animate-float flex items-center justify-center">
      {/* Soleil (Caché si pluie ou neige) */}
      {!isRainy && !isSnowy && (
        <div className="absolute w-40 h-40 bg-amber-200 border-4 border-stone-800 rounded-full shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] flex flex-col items-center justify-center overflow-hidden">
          <div className="flex gap-4 mb-2">
            <div className="w-3 h-3 bg-stone-800 rounded-full animate-blink" />
            <div className="w-3 h-3 bg-stone-800 rounded-full animate-blink" />
          </div>
          <div className="w-6 h-3 border-b-4 border-stone-800 rounded-full" />
        </div>
      )}

      {/* Nuage 2D */}
      {(isCloudy || isRainy) && (
        <div className={`absolute bottom-12 -left-4 w-32 h-16 border-4 border-stone-800 rounded-full animate-drift shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] ${isRainy ? 'bg-blue-100' : 'bg-white'}`} />
      )}

      {/* Effets (Pluie / Neige) */}
      {isRainy && (
        <div className="absolute inset-0 flex justify-around items-end pb-12 px-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-6 bg-blue-400 border-2 border-stone-800 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      )}
      
      {isSnowy && <Icon icon="solar:snowflake-bold" className="text-blue-200 animate-spin" width="64" />}
    </div>
  );
};