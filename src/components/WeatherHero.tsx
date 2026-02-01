import { Icon } from "@iconify/react";

export const WeatherHero = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <div className="absolute inset-0 m-auto w-40 h-40 bg-[#D9CFC0] rounded-full opacity-50 border border-[#3D3935]/10 shadow-inner" />

    <div className="relative z-10 w-24 h-32 border-2 border-[#3D3935] bg-[#E8E2D6] shadow-[8px_8px_0px_0px_rgba(61,57,53,1)] flex flex-col p-2">
      <div className="w-full h-1/2 border-b border-[#3D3935] flex items-center justify-center overflow-hidden">
        <Icon
          icon="solar:cloud-sun-linear"
          className="text-[#3D3935]"
          width="32"
        />
      </div>
      <div className="w-full h-1/2 flex flex-col justify-around py-2">
        <div className="h-1 w-full bg-[#3D3935]/20" />
        <div className="h-1 w-2/3 bg-[#3D3935]/20" />
        <div className="h-1 w-full bg-[#3D3935]/20" />
      </div>
    </div>

    <Icon
      icon="ph:leaf-fill"
      className="absolute top-4 right-4 text-[#3D3935] animate-float opacity-60"
      width="24"
    />
    <Icon
      icon="ph:leaf-fill"
      className="absolute bottom-8 left-2 text-[#3D3935] animate-float steam-delay opacity-40 -rotate-90"
      width="18"
    />
  </div>
);
