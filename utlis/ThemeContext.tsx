import React, { createContext, useState, useContext } from 'react';
import { Themes } from '../constants/Colors';

const ThemeContext = createContext({
  theme: Themes.light,
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false); 

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? Themes.dark : Themes.light,
        toggleTheme,
        isDark,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
