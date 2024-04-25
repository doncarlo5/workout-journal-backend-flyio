import { useEffect, useState } from "react"
import { LucidePlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Button } from "@/components/ui/button"

import ExerciseTypeCard from "./exercise-type-card"

export function TypeComponent() {
  const [exerciseType, setExerciseType] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTypes = async () => {
    try {
      const response = await myApi.get("/api/exercise-type?limit=1000&sort=-updatedAt")
      console.log("👋 response data", response.data)
      setExerciseType(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  return (
    <>
      {!isLoading && exerciseType.length !== 0 && (
        <main className="mt-2 flex flex-1 flex-col items-center justify-center">
          <div className="space-y-2 text-center">
            <h1 className="mb-5 mt-5 text-xl font-bold">Mes types d'exercices</h1>
          </div>
          <div>
            <div className=" col-span-2 ">
              <div className="space-y-4">
                <div className=" rounded-lg border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 dark:shadow-sm">
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    {isLoading ? (
                      <div className="col-span-full flex items-center justify-center">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      exerciseType.map((exerciseType: any) => (
                        <ExerciseTypeCard exerciseType={exerciseType} key={exerciseType._id} />
                      ))
                    )}
                  </div>
                  <div className="px-4">
                    <Link to={`/profile/type/new-type`}>
                      <Button className=" w-full">
                        {" "}
                        <LucidePlusCircle className=" mr-2 size-5" />
                        Ajouter un exercice{" "}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      {!isLoading && exerciseType.length === 0 && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                Aucun type d'exercice.
                <Link className="w-[150px]" to="/profile/types/new-type">
                  <Button className=" w-full">Nouveau type</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default TypeComponent
