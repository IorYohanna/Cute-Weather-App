import { Icon } from "@iconify/react";

export const StatCard = ({
  label,
  value,
  icon,
  isDarkMode,
}: {
  label: string;
  value: string;
  icon: string;
  isDarkMode: boolean;
}) => (
  <div className="flex flex-col items-center justify-center transition-colors duration-500">
    <div className="flex items-center gap-1.5 mb-1.5">
      <Icon
        icon={icon}
        width="14"
        className={`opacity-50 ${isDarkMode ? "text-white" : "text-black"}`}
      />
      <span
        className={`text-[9px] uppercase tracking-[0.2em] font-sans font-medium opacity-40 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {label}
      </span>
    </div>

    <span
      className={`text-base font-medium tracking-tight ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {value}
    </span>
  </div>
);
