import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark" | "sunset"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  cycleTheme: () => void
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
      cycleTheme: () => {
        set((state) => {
          const themes: Theme[] = ["light", "sunset", "dark"]
          const currentIndex = themes.indexOf(state.theme)
          const nextTheme = themes[(currentIndex + 1) % themes.length]
          document.documentElement.classList.remove("light", "dark", "sunset")
          document.documentElement.classList.add(nextTheme)
          return { theme: nextTheme }
        })
      },
    }),
    {
      name: "theme-storage",
    }
  )
)