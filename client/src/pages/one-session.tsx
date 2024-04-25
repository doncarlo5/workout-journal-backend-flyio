import React, { useEffect, useState } from "react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { CalendarIcon } from "@radix-ui/react-icons"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { fr } from "date-fns/locale/fr"
import { ChevronLeft, LucideArrowBigLeftDash, LucideCheckCircle, LucidePlusCircle } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"
import { Link, useNavigate, useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import ExerciseCard from "@/components/exercise-card"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

interface FormState {
  id: string
  date_session: string
  type_session: string
  body_weight: string
  exercise_user_list: any[]
  is_done: boolean
  comment?: string
}

const OneSession = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<any>({})
  const [formState, setFormState] = useState<FormState>({
    id: "",
    date_session: "",
    type_session: "",
    body_weight: "",
    exercise_user_list: [],
    is_done: false,
    comment: "",
  })

  const { sessionId } = useParams()
  const navigate = useNavigate()

  // const toggleIsEditable = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsEditable((current) => !current)
  // }

  const fetchOneSession = async () => {
    try {
      const response = await myApi.get(`/api/sessions/${sessionId}`)
      setFormState({
        id: response.data._id,
        date_session: response.data.date_session,
        type_session: response.data.type_session,
        body_weight: response.data.body_weight,
        exercise_user_list: response.data.exercise_user_list,
        is_done: response.data.is_done,
        comment: response.data.comment,
      })
      console.log("👋 FetchOneSession body weight", response.data.body_weight)
      const newSession = response.data
      setSession(newSession)
      setIsLoading(false)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  useEffect(() => {
    fetchOneSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("👋 handleSubmit")
    try {
      const response = await myApi.put(`/api/sessions/${sessionId}`, {
        date_session: formState.date_session,
        type_session: formState.type_session,
        body_weight: formState.body_weight,
        exercise_user_list: formState.exercise_user_list,
        is_done: formState.is_done,
        comment: formState.comment,
      })
      console.log("👋 response", response)
      fetchOneSession()
      navigate("/history/")
      // setIsEditable(false)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  const handleSelectDate: SelectSingleEventHandler = async (date: Date | undefined) => {
    setFormState({ ...formState, date_session: date?.toString() || "" })
    try {
      await myApi.put(`/api/sessions/${sessionId}`, {
        date_session: date,
      })
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
    setIsCalendarOpen(false)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/api/sessions/${id}`)
      console.log(response)
      fetchOneSession()
      navigate("/history/")
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const handleCheckboxChange: (isChecked: CheckedState) => void = (isChecked) => {
    setFormState({ ...formState, is_done: Boolean(isChecked) })
  }

  const handleSelectWeight = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      console.log("target", target.value)
      const { value } = target
      setFormState({ ...formState, body_weight: value })
    }
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setFormState({ ...formState, comment: value })
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-sm space-y-6 p-4">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/history">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Ta séance </h1>
            <h1 className="ml-5 text-3xl font-bold">{session?.type_session}</h1>
          </div>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 pb-14">
            <div className="space-y-2">
              <Label htmlFor="session_date">Date</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !formState.date_session && "text-muted-foreground"
                    )}
                  >
                    {formState.date_session ? (
                      format(formState.date_session, "PPP", { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={fr}
                    id="session_date"
                    mode="single"
                    selected={formState.date_session ? new Date(formState.date_session) : undefined}
                    onSelect={handleSelectDate}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2"></div>

            <div className="space-y-2">
              <Label htmlFor="body_weight">{`Poids du corps (en kg)`}</Label>
              <Input
                id="body_weight"
                placeholder={`${formState.body_weight}`}
                value={formState.body_weight}
                onChange={handleSelectWeight}
                required
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                // disabled={!isEditable}
              />
            </div>

            <div className="grid grid-flow-col grid-rows-3"></div>

            <div className=" col-span-2 ">
              <div className="space-y-4">
                <div className=" rounded-lg border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 dark:shadow-sm">
                  <div className="mb-4 flex flex-col gap-4">
                    {isLoading ? (
                      <div className="col-span-full flex items-center justify-center">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      formState.exercise_user_list.map((exercise: any) => (
                        <ExerciseCard exercise={exercise} key={exercise._id} />
                      ))
                    )}
                  </div>
                  <div className="px-4">
                    <Link to={`/history/session/${sessionId}/do-exercise`}>
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
            <div className="col-span-2 resize space-y-2">
              <Label htmlFor="comment" className={formState.is_done ? "text-slate-300" : ""}>
                Notes
              </Label>
              <Textarea
                id="comment"
                placeholder=""
                value={formState.comment}
                onChange={handleCommentChange}
                maxLength={200}
                disabled={formState.is_done}
              />
            </div>

            <div className="col-span-2 flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <Checkbox
                defaultChecked={formState.is_done}
                checked={formState.is_done}
                onCheckedChange={handleCheckboxChange}
                id="is_done"
              />
              <Label
                htmlFor="is_done"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {formState.is_done ? "Séance terminée" : "Séance en cours..."}
              </Label>
            </div>
            {formState.is_done ? (
              <Button className="col-span-2 w-full" type="submit">
                <LucideCheckCircle className="mr-2 size-5" />
                Valider la séance
              </Button>
            ) : (
              <Button className="col-span-2 w-full" type="submit">
                <LucideArrowBigLeftDash className="mr-2 size-5" />
                Finir plus tard...
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="col-span-2 mb-5 w-full">
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className=" w-10/12">
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer cette séance ?</AlertDialogTitle>
                  <AlertDialogDescription>Les exercices seront également supprimés.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => handleDelete(formState.id)}>
                    Confirmer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
    </>
  )
}

export default OneSession
