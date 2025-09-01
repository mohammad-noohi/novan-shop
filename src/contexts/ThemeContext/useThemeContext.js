import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error("use ThemeContext outside provider");
  return context;
}

export { useThemeContext };
