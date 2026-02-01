export const WeatherIllustration = ({ condition, isDarkMode }: { condition: string, isDarkMode: boolean }) => {
  const showNightTheme = isDarkMode || condition.toLowerCase().includes('night');

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      <div className={`absolute w-64 h-64 rounded-full blur-[70px] opacity-50 animate-pulse transition-colors duration-1000
        ${showNightTheme ? 'bg-blue-900' : 'bg-orange-400'}`} 
      />
      
      <div className={`relative w-60 h-60 rounded-full shadow-2xl overflow-hidden transition-all duration-1000
        ${showNightTheme 
          ? 'bg-linear-to-b from-slate-200 to-slate-500' 
          : 'bg-linear-to-b from-orange-300 to-orange-500'}`}>
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className={`absolute w-[120%] h-px top-1/2 transition-colors
        ${showNightTheme ? 'bg-white/5' : 'bg-black/5'}`} />
    </div>
  );
};