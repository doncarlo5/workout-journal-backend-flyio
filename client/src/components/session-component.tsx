import { useEffect, useState } from "react"
import { LucideArrowRight, LucideLoader2, LucideMessageSquareText } from "lucide-react"
import { useNavigate } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SessionComponent() {
  const [session, setSession] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/api/sessions?limit=1000&sort=-date_session")
      setSession(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleLink = (id: string) => {
    navigate(`/history/session/${id}`)
  }

  return (
    <>
      {" "}
      {!isLoading && session.length !== 0 && (
        <main className="mt-5 flex flex-col items-center justify-center">
          <div>
            <Table>
              <TableCaption>Liste de tes séances passées</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Nbr d'ex.</TableHead>
                  <TableHead>Kg</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {session.map((oneSession) => (
                  <TableRow
                    className=" group cursor-pointer"
                    onClick={() => handleLink(oneSession._id)}
                    key={oneSession._id}
                  >
                    <TableCell>
                      <div
                        className={`me-2 h-2.5 w-2.5 rounded-full ${oneSession.is_done ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {" "}
                        {oneSession.comment ? (
                          <LucideMessageSquareText size={16} />
                        ) : (
                          <LucideMessageSquareText className=" text-slate-200" size={16} />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(oneSession.date_session)}</TableCell>
                    <TableCell>{oneSession.type_session}</TableCell>
                    <TableCell className=" text-center">{oneSession.exercise_user_list.length}</TableCell>
                    <TableCell className=" text-center">{oneSession.body_weight}</TableCell>
                    <TableCell className="w-10 items-center justify-center">
                      <LucideArrowRight className="  text-slate-300 group-hover:text-slate-900" size={18} />{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      )}
      {!isLoading && session.length === 0 && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">Aucune séance.</p>
            </div>
            <div className="flex flex-col gap-4 "></div>
          </div>
        </main>
      )}
      {isLoading && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center p-20">
            <div className="">
              <LucideLoader2 className=" animate-spin " size={32} />
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default SessionComponent
