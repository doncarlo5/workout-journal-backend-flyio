import React, { useState } from "react"
import { LucideFilePlus2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import myApi from "../lib/api-handler"
import IconChest from "./chest-icon"
import IconLegs from "./legs-icon"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Input } from "./ui/input"

function NewSessionButton({ Children }: { Children: any }) {
  const [weight, setWeight] = React.useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [typeSession, setTypeSession] = useState("")

  const navigate = useNavigate()

  // Fetch the last exercise user to get the last weight

  React.useEffect(() => {
    fetchLastSessionUser()
  }, [])

  const fetchLastSessionUser = async () => {
    try {
      const response = await myApi.get(`/api/sessions?limit=1&sort=-createdAt`)
      if (response.data && response.data.length > 0) {
        setWeight(response.data[0].body_weight)
      } else {
        setShowDialog(true)
      }
    } catch (error) {
      console.error("Error fetching last session:", error)
    }
  }

  const handleCreateSession = async (e: React.FormEvent, userChoice: string) => {
    e.preventDefault()
    try {
      setTypeSession(userChoice)
      const response = await myApi.post("/api/sessions", {
        date_session: new Date(),
        type_session: userChoice,
        body_weight: weight,
        exercise_user_list: [],
        is_done: false,
        comment: "",
      })
      console.log("typeSession", typeSession)
      console.log("response is:", response)
      const newSessionId = response.data._id
      navigate(`/history/session/${newSessionId}`)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger className=" select-none" asChild>
        {Children}
      </DrawerTrigger>
      <DrawerContent className=" select-none">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className=" text-left">
            <DrawerTitle>Nouvelle séance</DrawerTitle>
            <DrawerDescription>
              <Link className=" flex items-center" to="/profile/type/new-type">
                Tu peux également créer <span className="ml-1 underline">un exercice type.</span>{" "}
                <LucideFilePlus2 className=" ml-1" size={16} />{" "}
              </Link>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between space-x-2">
              <Button
                onClick={(e) => handleCreateSession(e, "Upper A")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md"
              >
                <p className="mb-1 mt-4 text-lg">Upper A</p>
                <IconChest className="mt-3" />
                <span className="sr-only">Upper A</span>
              </Button>
              <Button
                onClick={(e) => handleCreateSession(e, "Lower")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md"
              >
                <p className="mb-1 mt-4 text-lg">Lower</p>
                <IconLegs className="mt-3" />
                <span className="sr-only">Lower</span>
              </Button>
              <Button
                onClick={(e) => handleCreateSession(e, "Upper B")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md"
              >
                <p className="mb-1 mt-4 text-lg">Upper B</p>
                <IconChest className="mt-3" />
                <span className="sr-only">Upper B</span>
              </Button>
            </div>
            <div className="mt-3 h-2"></div>
          </div>
        </div>
      </DrawerContent>
      {showDialog && (
        <div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className=" mb-5">Veuillez renseigner votre poids {`(en kg)`}</DialogTitle>
              <DialogDescription>
                <Input
                  className=" w-1/4"
                  type="number"
                  id="body_weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Valider</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      )}
    </Drawer>
  )
}

export default NewSessionButton
