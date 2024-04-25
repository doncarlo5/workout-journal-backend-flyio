import { LucideMessageSquareText } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

function ExerciseCard({ exercise }: { exercise: any }) {
  return (
    <Link to={`/history/exercise/${exercise._id}`}>
      <Card className="w-full max-w-sm">
        <CardHeader className="px-4 pb-0 pt-4">
          <CardTitle className="text-lg">{exercise.type.name}</CardTitle>
        </CardHeader>
        <CardContent className="ml-3 mt-2 px-4 pb-4">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex w-28 items-baseline gap-1 text-2xl font-bold">
              {exercise.rep[0]}
              <span className="text-xs font-normal text-gray-700"> REPS</span>
            </div>
            <div className="flex w-40 items-baseline gap-1 text-2xl font-bold">
              {exercise.weight[0]}
              <span className="text-xs font-normal text-gray-700"> KG</span>
            </div>
            <div className="flex w-40 items-center text-sm font-medium">
              <Badge className=" min-h-9 min-w-28 select-none justify-center text-lg font-light " variant="secondary">
                {exercise.type.repRange1}
              </Badge>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div className="flex w-28 items-baseline gap-1 text-2xl font-bold">
              {exercise.rep[1]}
              <span className="text-xs font-normal text-gray-700"> REPS</span>
            </div>
            <div className="flex w-40 items-baseline gap-1 text-2xl font-bold">
              {exercise.weight[1]}
              <span className="text-xs font-normal text-gray-700"> KG</span>
            </div>
            <div className="flex w-40 items-center text-sm font-medium">
              <Badge className=" min-h-9 min-w-28 select-none justify-center text-lg font-light " variant="secondary">
                {exercise.type.repRange2}
              </Badge>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div className="flex w-28 items-baseline gap-1 text-2xl font-bold">
              {exercise.rep[2]}
              <span className="text-xs font-normal text-gray-700"> REPS</span>
            </div>
            <div className="flex w-40 items-baseline gap-1 text-2xl font-bold">
              {exercise.weight[2]}
              <span className="text-xs font-normal text-gray-700"> KG</span>
            </div>
            <div className="flex w-40 items-center text-sm font-medium">
              <Badge className=" min-h-9 min-w-28 select-none justify-center text-lg font-light " variant="secondary">
                {exercise.type.repRange3}
              </Badge>
            </div>
          </div>
        </CardContent>
        {exercise.comment && (
          <CardContent className="border-t border-dotted px-4 pb-4 pt-3">
            <div className="flex items-center gap-2">
              <LucideMessageSquareText size={18} color="#64748B" />
              <CardDescription>{exercise.comment}</CardDescription>
            </div>
          </CardContent>
        )}
      </Card>

      {/* <Card className="transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="  flex flex-row justify-between px-4 py-2 ">
          <CardTitle className="flex items-center  ">{exercise.type.name}</CardTitle>
          {exercise.comment && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex transition hover:scale-110">
                    <ChatBubbleIcon className="" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{exercise.comment}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardHeader>
        <CardContent className=" m-1 p-1">
          <div className="relative overflow-x-auto">
            <table className="w-full rounded-md text-left">
              <tbody className=" ">
                <tr className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td className="border-r border-black border-r-slate-400 bg-clip-text px-3 py-2 ">
                    <span className="text-2xl font-bold">{exercise.rep[0]}</span>{" "}
                    <span className="text-sm text-gray-700">REPS</span>{" "}
                  </td>
                  <td className=" px-3 py-2">
                    <span className=" text-2xl font-bold">{exercise.weight[0]}</span>{" "}
                    <span className="text-sm text-gray-700">KG</span>
                  </td>
                  <td className=" rounded-xl bg-gray-300 px-3 py-2 text-center font-light tracking-tighter text-gray-700">
                    {exercise.type.repRange1}
                  </td>
                </tr>

                <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td className="border-r border-black border-r-slate-400 bg-clip-text px-3 py-2 ">
                    <span className="text-2xl font-bold">{exercise.rep[1]}</span>{" "}
                    <span className="text-sm text-gray-700">REPS</span>{" "}
                  </td>
                  <td className=" px-3 py-2">
                    <span className=" text-2xl font-bold">{exercise.weight[1]}</span>{" "}
                    <span className="text-sm text-gray-700">KG</span>
                  </td>
                  <td className="px-3 py-2 font-light tracking-tighter text-gray-700">
                    {"("}
                    {exercise.type.repRange2}
                    {")"}
                  </td>
                </tr>

                <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td className="border-r border-black border-r-slate-400 bg-clip-text px-3 py-2 ">
                    <span className="text-2xl font-bold">{exercise.rep[2]}</span>{" "}
                    <span className="text-sm text-gray-700">REPS</span>{" "}
                  </td>
                  <td className=" px-3 py-2">
                    <span className=" text-2xl font-bold">{exercise.weight[2]}</span>{" "}
                    <span className="text-sm text-gray-700">KG</span>
                  </td>
                  <td className="px-3 py-2 font-light tracking-tighter text-gray-700">
                    {"("}
                    {exercise.type.repRange3}
                    {")"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card> */}
    </Link>
  )
}

export default ExerciseCard
