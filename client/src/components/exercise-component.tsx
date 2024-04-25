import { useEffect, useState } from "react"
import { format } from "date-fns"
import { LucideArrowRight, LucideLoader2, LucideMessageSquareText } from "lucide-react"
import { useNavigate } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ExerciseComponent() {
  const [exercise, setExercise] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchUserExercises = async () => {
    try {
      const response = await myApi.get("/api/exercise-user?limit=1000&sort=-updatedAt")
      setExercise(response.data)
      console.log("👋 response", response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchUserExercises()
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return ""
    }
    return format(dateString, "dd/MM/yyyy")
  }

  const handleLink = (id: string) => {
    navigate(`/history/exercise/${id}`)
  }

  return (
    <main className="mt-5 flex flex-col items-center justify-center">
      {!isLoading && exercise.length !== 0 && (
        <div>
          <Table className=" size-px">
            <TableCaption>Tes exercices</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Série</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise.map((exercise) => (
                <TableRow
                  className=" group cursor-pointer "
                  onClick={() => handleLink(exercise._id)}
                  key={exercise._id}
                >
                  <TableCell>
                    <div>
                      {" "}
                      {exercise.comment ? (
                        <LucideMessageSquareText size={16} />
                      ) : (
                        <LucideMessageSquareText className=" text-slate-200" size={16} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(exercise.session.date_session)}</TableCell>
                  <TableCell>{exercise.type?.name}</TableCell>
                  <TableCell>
                    {exercise.rep[0]}x{exercise.weight[0]}
                    <br />
                    {exercise.rep[1]}x{exercise.weight[1]}
                    <br />
                    {exercise.rep[2]}x{exercise.weight[2]}
                  </TableCell>
                  <TableCell className="items-center justify-center">
                    <LucideArrowRight className="  text-slate-300 group-hover:text-slate-900" size={18} />{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {!isLoading && exercise.length === 0 && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">Aucun exercice.</p>
            </div>
            <div className="flex flex-col gap-4 "></div>
          </div>
        </main>
      )}
      {isLoading && (
        <div className="container flex flex-col items-center justify-center p-20">
          <div className="">
            <LucideLoader2 className=" animate-spin " size={32} />
          </div>
        </div>
      )}
    </main>
  )
}

export default ExerciseComponent
