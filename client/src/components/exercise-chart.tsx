import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import myApi from "@/lib/api-handler"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

function ExerciseChart() {
  const [exercise, setExercise] = useState([] as any[])
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])

  const fetchAllExerciseTypes = async () => {
    try {
      const response = await myApi.get(`/api/exercise-type?limit=1000`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    const init = async () => {
      const exerciseTypeData = await fetchAllExerciseTypes()
      setAllExerciseTypes(exerciseTypeData)
    }
    init()
  }, [])

  const AllExercisesTypeChange = async (value: any) => {
    const response = await myApi.get(`/api/exercise-user?limit=1000&sort=-createdAt&type=${value._id}`)
    setExercise(response.data)

    // loop through the response data to access date_session from each object index - session - date_session

    function DateSession() {
      response.data.map((exercise: any) => {
        console.log("exercise", exercise)
        console.log("date session", exercise.session.session_date)
        return exercise.session.session_date
      })
    }
    DateSession()

    console.log("specific exercise", response.data)

    return response.data
  }

  const formatXAxis = (tickFormat: string) => {
    const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy")
    return formattedDate
  }

  return (
    <>
      <h1 className="mb-5 mt-5 text-3xl font-bold">Exercice</h1>

      <Select onValueChange={AllExercisesTypeChange}>
        <SelectTrigger className="w-full data-[placeholder]:italic data-[placeholder]:text-gray-700">
          <SelectValue className=" " placeholder="Sélectionne un exercice..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {allExerciseTypes.map((type) => (
              <SelectItem key={type._id} value={type}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <ResponsiveContainer width="100%" height="70%">
        <AreaChart
          width={500}
          height={300}
          data={exercise}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="datahere" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B99C70" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#B99C70" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="datahere" tickFormatter={(tick) => formatXAxis(tick)} />
          <YAxis name="Kg" domain={["auto", "auto"]}>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "100%",
                fill: "#666666",
              }}
              position="left"
              value={"Kg"}
            />
          </YAxis>
          <Tooltip
            labelFormatter={(value) => {
              return `Date: ${format(new Date(value), "dd/MM/yyyy")}`
            }}
            animationEasing={"ease-out"}
          />

          <Area
            name="Poids"
            dot={false}
            type="monotone"
            dataKey="datahere"
            stroke="#B99C70"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#datahere)"
            activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default ExerciseChart
