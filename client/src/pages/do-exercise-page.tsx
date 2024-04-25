import { useEffect, useState } from "react"
import { ChevronLeft, LucideInfo } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import CountDownTimer from "@/components/countdown-timer"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const DoExercisePage = () => {
  const [oneExerciseType, setOneExerciseType] = useState(null as any)
  const [lastExercise, setLastExercise] = useState(null as any)
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])
  const [session, setSession] = useState<any>({})

  const [formState, setFormState] = useState({
    rep1: lastExercise?.rep[0] || "",
    rep2: lastExercise?.rep[1] || "",
    rep3: lastExercise?.rep[2] || "",
    weight1: lastExercise?.weight[0] || "",
    weight2: lastExercise?.weight[1] || "",
    weight3: lastExercise?.weight[2] || "",
    comment: lastExercise?.comment || "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    setFormState({
      rep1: lastExercise?.rep[0] || "",
      weight1: lastExercise?.weight[0] || "",
      rep2: lastExercise?.rep[1] || "",
      weight2: lastExercise?.weight[1] || "",
      rep3: lastExercise?.rep[2] || "",
      weight3: lastExercise?.weight[2] || "",
      comment: "",
    })
  }, [lastExercise])

  const onExerciseTypeChange = async (value: any) => {
    setOneExerciseType(value)
    const response = await myApi.get(`/api/exercise-user?limit=1&sort=-createdAt&type=${value._id}`)
    setLastExercise(response.data[0])

    console.log("lastExercise is:", response.data[0])
  }

  const fetchOneSession = async () => {
    try {
      const response = await myApi.get(`/api/sessions/${sessionId}`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const fetchAllExerciseTypes = async (sessionData: any) => {
    try {
      const response = await myApi.get(`/api/exercise-type?type_session=${sessionData.type_session}&limit=1000`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    const init = async () => {
      const sessionData = await fetchOneSession()
      setSession(sessionData)
      console.log("👋 sessionData", sessionData)
      const exerciseTypeData = await fetchAllExerciseTypes(sessionData)
      setAllExerciseTypes(exerciseTypeData)
    }
    init()
  }, [])

  console.log("👋 allExerciseTypes", allExerciseTypes)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("event.target", event.target.value)
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })
  }

  let { sessionId } = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.post("/api/exercise-user", {
        type: oneExerciseType._id,
        rep: [formState.rep1, formState.rep2, formState.rep3],
        weight: [formState.weight1, formState.weight2, formState.weight3],
        comment: formState.comment,
        session: sessionId,
      })

      const updatedSession = {
        exercise_user_list: [...session.exercise_user_list, response.data.id],
      }

      const responseSession = await myApi.put(`/api/sessions/${sessionId}`, updatedSession)
      console.log(responseSession)

      navigate(`/history/session/${sessionId}`)
    } catch (error: any) {
      console.log(error)
    }
  }

  // function formatTime(seconds: number): string {
  //   const minutes = Math.floor(seconds / 60)
  //   const remainingSeconds = seconds % 60

  //   if (minutes === 0 && remainingSeconds === 0) {
  //     return ""
  //   } else if (minutes === 0) {
  //     return `${remainingSeconds} sec`
  //   } else {
  //     const minutesString = minutes > 0 ? `${minutes} min` : ""
  //     const secondsString = remainingSeconds > 0 ? ` ${remainingSeconds} sec` : ""
  //     return `${minutesString}${secondsString}`
  //   }
  // }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6 px-4 pb-14">
        <div className="flex items-center space-y-2 text-left">
          <Link to={`/history/session/${sessionId}`}>
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">{session.type_session}</h1>
            <h1 className="ml-5 text-3xl font-bold">{oneExerciseType?.name}</h1>
          </div>
        </div>

        <Select onValueChange={onExerciseTypeChange}>
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
        {oneExerciseType && <CountDownTimer exerciseTypeTimer={oneExerciseType.timer} />}
        {oneExerciseType?.advice && (
          <div className=" flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <LucideInfo className="mr-1 size-4" /> <div>{oneExerciseType?.advice}</div>
          </div>
        )}
        {oneExerciseType ? (
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rep1">Rep 1</Label>
                <Input
                  id="rep1"
                  placeholder={lastExercise?.rep[0] || "Exemple: 5"}
                  value={formState.rep1}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight1">Poids 1 {`(kg)`}</Label>
                <Input
                  id="weight1"
                  placeholder={lastExercise?.weight[0] || "Exemple: 20"}
                  value={formState.weight1}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repRange1">Rep Range 1</Label>
                <Badge className=" min-h-9 min-w-28 select-none justify-center text-lg font-light " variant="secondary">
                  {oneExerciseType?.repRange1}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rep2">Rep 2</Label>
                <Input
                  id="rep2"
                  placeholder={lastExercise?.rep[1] || "Exemple: 7"}
                  value={formState.rep2}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight2">Poids 2 {`(kg)`}</Label>
                <Input
                  id="weight2"
                  placeholder={lastExercise?.weight[1] || "Exemple: 18"}
                  value={formState.weight2}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repRange1">Rep Range 2</Label>
                <Badge className=" min-h-9 min-w-28 select-none justify-center text-lg font-light " variant="secondary">
                  {oneExerciseType?.repRange2}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repRange2">Rep 3</Label>
                <Input
                  id="rep3"
                  placeholder={lastExercise?.rep[2] || "Exemple: 10"}
                  value={formState.rep3}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight3">Poids 3 {`(kg)`}</Label>
                <Input
                  id="weight3"
                  placeholder={lastExercise?.weight[2] || "Exemple: 16"}
                  value={formState.weight3}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repRange1">Rep Range 3</Label>
                <Badge className=" min-h-9 min-w-28 select-none justify-center text-lg font-light " variant="secondary">
                  {oneExerciseType?.repRange3}
                </Badge>
              </div>
              <div className="col-span-3 space-y-2">
                <Label htmlFor="comment">Notes</Label>
                <Textarea
                  id="comment"
                  placeholder={lastExercise?.comment ? `Note précédente: ${lastExercise?.comment}` : "Pas de notes."}
                  value={formState.comment}
                  onChange={handleChange}
                  maxLength={200}
                />
              </div>
              <Button className="col-span-3 mb-5 w-full" type="submit">
                Valider
              </Button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default DoExercisePage
