import { useEffect, useState } from "react"

import myApi from "@/lib/api-handler"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExerciseComponent from "@/components/exercise-component"
import { Navbar } from "@/components/navbar"
import SessionComponent from "@/components/session-component"

export function HistoryPage() {
  const [session, setSession] = useState([] as any[])

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/api/sessions?limit=1000&sort=-date_session")
      setSession(response.data)
      console.log("session", session)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])

  return (
    <div className=" mx-auto">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 text-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Historique</h1>
        </div>
        <Tabs defaultValue="session" className=" w-80 pb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="session">Séances</TabsTrigger>
            <TabsTrigger value="exercise">Exercices</TabsTrigger>
          </TabsList>
          <TabsContent asChild className=" " value="session">
            <SessionComponent />
          </TabsContent>
          <TabsContent asChild className="" value="exercise">
            <ExerciseComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default HistoryPage
