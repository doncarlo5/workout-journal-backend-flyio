import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BodyWeightChart from "@/components/body-weight-chart"
import ExerciseChart from "@/components/exercise-chart"
import { Navbar } from "@/components/navbar"

function StatsPage() {
  return (
    <div className=" m-auto">
      <div className="">
        <Navbar />

        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="space-y-2 text-center">
            <h1 className="mb-5 mt-5 text-3xl font-bold">Statistiques</h1>
          </div>

          <Tabs defaultValue="weight_body" className="size-80">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weight_body">Poids du corps</TabsTrigger>
              <TabsTrigger value="exercise">Exercices</TabsTrigger>
            </TabsList>
            <TabsContent asChild className=" h-64" value="weight_body">
              <BodyWeightChart />
            </TabsContent>
            <TabsContent asChild className=" h-64" value="exercise">
              <ExerciseChart />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default StatsPage
