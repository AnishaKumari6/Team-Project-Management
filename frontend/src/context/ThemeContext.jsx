import { createContext, useContext, useEffect, useState } from 'react';
const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1');
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('dark', dark ? '1' : '0');
  }, [dark]);
  return <ThemeCtx.Provider value={{ dark, toggle: () => setDark(v => !v) }}>{children}</ThemeCtx.Provider>;
}
