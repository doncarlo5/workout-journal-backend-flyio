import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"

import useAuth from "../context/use-auth"

export function HomePage() {
  const { user } = useAuth()

  console.log(user)
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
              Bon retour {user?.firstName}!
            </h1>
          </div>
          <div className="text-center">
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              Jette un oeil à tes exercices réalisés ou lance une nouvelle séance.
            </p>
          </div>
          <div className="mt-5 flex gap-4">
            <Link className="w-[150px]" to="/history">
              <Button variant="secondary" className="w-full">
                Exercices réalisés
              </Button>
            </Link>
          </div>
          <div className="flex gap-4">
            <Button className="group w-[150px]">
              <NewSessionButton
                Children={
                  <div className=" cursor-pointer justify-center text-center focus:text-teal-500 group-hover:text-teal-500">
                    <span className="">Nouvelle séance</span>
                  </div>
                }
              ></NewSessionButton>{" "}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
