import { useState, useEffect, createContext, useContext } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

/** document 대신 래퍼에만 dark/light를 씌워 서비스 라우트의 body 스타일을 건드리지 않습니다. */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("gamja-landing-theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("gamja-landing-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={`landing-theme min-h-screen ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
