import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import myApi from "@/lib/api-handler"

function BodyWeightChart() {
  const [session, setSession] = useState([] as any[])

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/api/sessions?limit=1000&sort=date_session")
      console.log("👋 response data", response.data)
      setSession(response.data)
      console.log("👋 session", session)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const formatXAxis = (tickFormat: string) => {
    const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy")
    return formattedDate
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])
  return (
    <>
      <h1 className="mb-5 mt-5 text-3xl font-bold">Poids du corps</h1>

      <ResponsiveContainer width="100%" height="70%">
        <AreaChart
          width={500}
          height={300}
          data={session}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="date_session" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B99C70" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#B99C70" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date_session" tickFormatter={(tick) => formatXAxis(tick)} />
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
            dataKey="body_weight"
            stroke="#B99C70"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#date_session)"
            activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default BodyWeightChart
