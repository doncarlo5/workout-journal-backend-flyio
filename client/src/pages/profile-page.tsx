import { useState } from "react"
import useAuth from "@/context/use-auth"
import { LucideLogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"
import TypeComponent from "@/components/type-component"

import myApi from "../lib/api-handler"

const ProfilePage = () => {
  const { toast } = useToast()
  const { user, handleLogout } = useAuth()

  const [formState, setFormState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  })
  const [error, setError] = useState("")

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.patch("/api/auth/settings", formState)
      toast({
        title: "Profil mis à jour!",
      })

      console.log(response)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Une erreur est survenue! ❌",
      })
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <div className=" mx-auto">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 text-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Profile</h1>
        </div>
        <Tabs defaultValue="exercise-type" className=" w-80 pb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="exercise-type">Mes types d'ex.</TabsTrigger>
          </TabsList>
          <TabsContent asChild className="" value="info">
            <div className=" flex flex-1 flex-col items-center justify-center">
              <div className="space-y-2 text-center">
                <h1 className="mb-5 mt-5 text-xl font-bold">Modifier son profil</h1>
              </div>
              <div className=" ">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          placeholder="Prénom"
                          value={formState.firstName}
                          onChange={handleChange}
                          required
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          placeholder="Nom"
                          value={formState.lastName}
                          onChange={handleChange}
                          required
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        type="email"
                      />
                    </div>
                    <Button
                      className="mt-4 w-full"
                      type="submit"
                      onClick={() => {
                        toast({
                          description: "Ton profil a bien été mis à jour! ✅",
                        })
                      }}
                    >
                      Mettre à jour
                    </Button>
                  </div>
                </form>
                <div className=" flex justify-center">
                  <Button onClick={handleLogout} variant={"outline"} className=" m-8 flex  ">
                    <LucideLogOut className=" " size={16} />
                  </Button>
                </div>
                {error && <p>{error}</p>}
              </div>
            </div>
          </TabsContent>
          <TabsContent asChild className="" value="exercise-type">
            <TypeComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default ProfilePage
