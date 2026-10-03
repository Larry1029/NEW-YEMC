import { useState, useEffect } from "react";
export function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme") || "dark";
    setTheme(savedTheme);
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-theme", newTheme);
  };
  return { theme, toggleTheme, isDark: theme === "dark" };
}
