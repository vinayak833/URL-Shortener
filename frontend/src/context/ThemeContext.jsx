// context/ThemeContext.jsx - Visual theme engine
import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'cosmic',
    name: 'Cosmic Obsidian',
    icon: '🌌',
    description: 'Deep indigo & midnight violet',
    colorHex: '#6366f1'
  },
  {
    id: 'emerald',
    name: 'Cyber Emerald',
    icon: '💚',
    description: 'Sleek jade & neon emerald',
    colorHex: '#10b981'
  },
  {
    id: 'solar',
    name: 'Solar Sunset',
    icon: '🔥',
    description: 'Warm amber & sunset orange',
    colorHex: '#f59e0b'
  },
  {
    id: 'nordic',
    name: 'Nordic Frost',
    icon: '🧊',
    description: 'Crisp cyan & arctic navy',
    colorHex: '#06b6d4'
  },
  {
    id: 'synthwave',
    name: 'Synthwave Fuchsia',
    icon: '🪻',
    description: 'Vibrant fuchsia & neon magenta',
    colorHex: '#d946ef'
  }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('sniplink_theme') || 'cosmic';
  });

  const setTheme = (themeId) => {
    setThemeState(themeId);
    localStorage.setItem('sniplink_theme', themeId);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES, currentThemeObj }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
