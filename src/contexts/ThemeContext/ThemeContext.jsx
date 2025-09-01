import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  useEffect(() => {
    if (theme == "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme == "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme => {
      if (theme === "light") {
        localStorage.setItem("theme", "dark");
        return "dark";
      }

      if (theme === "dark") {
        localStorage.setItem("theme", "light");
        return "light";
      }
    });
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
