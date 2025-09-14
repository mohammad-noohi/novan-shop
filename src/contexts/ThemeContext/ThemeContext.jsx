import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || null);

  useEffect(() => {
    let appliedTheme = theme;

    if (!appliedTheme) {
      appliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(appliedTheme);
    }

    if (appliedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", appliedTheme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => {
      if (prev === "light") {
        localStorage.setItem("theme", "dark");
        return "dark";
      }

      if (prev === "dark") {
        localStorage.setItem("theme", "light");
        return "light";
      }
    });
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
