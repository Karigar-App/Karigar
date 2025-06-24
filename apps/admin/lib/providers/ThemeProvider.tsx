"use client"

// Utils
import { ETheme } from "@/utils";

// Next Themes
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Hooks
import { useEffect, useState } from "react"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // States
  const [currentTheme, setCurrentTheme] = useState<ETheme>(ETheme.SYSTEM);

  // Handlers
  const handleThemeSwitch = (theme: ETheme) => {
    setCurrentTheme(theme);
    localStorage.setItem("karigar-admin-theme", theme);
  };

  const handleSystemThemeChange = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
   // TO BE CONTUNED....
  }

  // UseEffects
  useEffect(() => {
    const storedTheme = localStorage.getItem("karigar-admin-theme");
    if (storedTheme) {
      setCurrentTheme(storedTheme as ETheme);
    }
  }, [])

  useEffect(() => {
    if (currentTheme === ETheme.SYSTEM) { handleSystemThemeChange(); }
  }, [])
  console.log("Current Theme:", currentTheme);
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={currentTheme}
      enableSystem
      disableTransitionOnChange={false}
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
}
