import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div
      className="inline-block w-full cursor-pointer justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <>
          <Moon className="mb-1 inline-block transition-all dark:rotate-0 dark:scale-100" size={24} />
          <span className="tab tab-home block text-xs ">Dark</span>
        </>
      ) : (
        <>
          <Sun className="mb-1 inline-block " size={24} />
          <span className="tab tab-home block text-xs ">Light</span>
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
