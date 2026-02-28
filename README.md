# Weather App (^^)

A minimal, elegant desktop weather app built with **React**, **TypeScript**, and **Electron**. Features a stunning day/night theme toggle with smooth visual transitions — from warm orange sunlight to cool moonlit blues.

---

## Screenshots

| ☀️ Day Mode | 🌙 Night Mode |
|:-----------:|:-------------:|
| <img width="600" height="896" alt="image" src="https://github.com/user-attachments/assets/b9ed7aba-93e1-49e4-98d7-9234d784a9e1" /> | <img width="604" height="899" alt="image" src="https://github.com/user-attachments/assets/e95fbef2-52d0-478b-b1e6-c8a810e15138" />
 
 

---

## Features

- **Day / Night theme toggle** — switch between a warm light mode and a deep dark mode, each with a distinctive sun or moon orb
- **Live weather data** — current temperature, humidity, wind speed, and sky condition
- **5-day forecast** — quick glance at the upcoming week with weather icons and temperatures
- **City search** — look up any city by name
- **Vertical condition label** — subtle rotated "CLEAR SKY" text for a refined aesthetic touch
- **Cross-platform** — runs as a native desktop app via Electron

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 |
| Language | TypeScript |
| Desktop Shell | Electron |
| Weather API | OpenWeatherMap |

---

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your API key**

Create a `.env` file at the root:
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

**4. Run in development**
```bash
npm run dev
```

**5. Build the desktop app**
```bash
npm run build
npm run electron:build
```

---

## Design

The app features two carefully crafted themes:

- **Day** — warm cream background, glowing orange sun orb with radial ambient light, dark serif typography
- **Night** — deep navy background, frosted glass moon orb with soft blue glow, light italic typography

The toggle in the top-right corner smoothly switches between both modes.

---

##  Notes

- Default city on launch is **Tokyo** — configurable in `src/config.ts`
- Forecast icons are emoji-based for lightweight rendering
- The app window is borderless for a clean desktop aesthetic

---
