import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark" | "sunset"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.classList.remove("light", "dark", "sunset")
        document.documentElement.classList.add(theme)
      },
    }),
    {
      name: "theme-storage",
    }
  )
)
