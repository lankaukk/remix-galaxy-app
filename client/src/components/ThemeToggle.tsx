import { Moon, Sun, Sunset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme}>
      <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme !== 'light' && 'hidden'}`} />
      <Sunset className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme !== 'sunset' && 'hidden'}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme !== 'dark' && 'hidden'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}