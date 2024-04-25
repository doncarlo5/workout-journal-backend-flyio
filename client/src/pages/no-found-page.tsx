import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">404 - Page non trouvée</h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              Oops! La page recherchée n'existe pas.
            </p>
          </div>
          <div className="flex gap-4">
            <Link className="w-[150px]" to="/">
              <Button className="w-full">Accueil</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
