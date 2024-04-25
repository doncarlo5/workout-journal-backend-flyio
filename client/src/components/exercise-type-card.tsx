import { LucideInfo, LucideTimer } from "lucide-react"
import { Link } from "react-router-dom"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

function ExerciseTypeCard({ exerciseType }: { exerciseType: any }) {
  return (
    <Link to={`/profile/type/${exerciseType._id}`}>
      <Card className="h-full w-full max-w-md transform-gpu">
        <CardHeader className=" p-4">
          <CardTitle>{exerciseType.name}</CardTitle>
          <CardDescription>{exerciseType.type_session}</CardDescription>
        </CardHeader>
        <CardContent className=" p-4">
          <div className=" flex justify-between">
            <div className="flex items-baseline gap-1 ">
              <LucideTimer size={16} className="text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-gray-500">{exerciseType.timer}s</p>
              </div>
            </div>
            <div className="flex items-center gap-1 ">
              <LucideInfo size={16} className={exerciseType.advice ? "text-slate-100" : "text-slate-900"} />
            </div>
          </div>
          <div></div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ExerciseTypeCard
