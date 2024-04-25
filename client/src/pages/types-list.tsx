import { useEffect, useState } from "react"
import { PlusSquare } from "lucide-react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"
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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Navbar } from "@/components/navbar"

export function TypesList() {
  const [type, setType] = useState([] as any[])

  const fetchTypes = async () => {
    try {
      const response = await myApi.get("/api/exercise-type?limit=1000&sort=-updatedAt")
      console.log("👋 response data", response.data)
      setType(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/api/exercise-type/${id}`)
      console.log(response)
      fetchTypes()
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {type.length !== 0 && (
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="flex items-center gap-3 text-center">
            <h1 className="mb-5 mt-5 text-3xl font-bold">Mes types d'exercices</h1>
            <Button className=" border-none px-2 shadow-none hover:border-solid  " asChild variant="outline">
              <Link to="/types/new-type">
                <PlusSquare />
              </Link>
            </Button>
          </div>
          <div>
            <Table>
              <TableCaption>
                Total de {type.length > 0 && `${type.length}`} exercices.
                <Button
                  className="m-0 ml-1 p-0 text-sm font-normal text-gray-500 dark:text-gray-400"
                  asChild
                  variant="link"
                >
                  <Link to="/types/new-type">Nouvel exercice</Link>
                </Button>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Conseil</TableHead>
                  <TableHead>{`Timer (en s)`}</TableHead>
                  <TableHead>Rep Range 1</TableHead>
                  <TableHead>Rep Range 2</TableHead>
                  <TableHead>Rep Range 3</TableHead>
                  <TableHead>Type de séance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {type.map((type) => (
                  <TableRow key={type._id}>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost">✕</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Es-tu sûr de vouloir supprimer ton exercice ?</AlertDialogTitle>
                            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Conserver</AlertDialogCancel>
                            <AlertDialogAction asChild onClick={() => handleDelete(type._id)}>
                              <Button variant="destructive">Confirmer</Button>
                            </AlertDialogAction>{" "}
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell>
                      <Link to={`/types/${type._id}`} key={type._id}>
                        <Button variant="ghost">✍️</Button>
                      </Link>
                    </TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>{type.advice}</TableCell>
                    <TableCell>{type.timer}</TableCell>
                    <TableCell>{type.repRange1}</TableCell>
                    <TableCell>{type.repRange2}</TableCell>
                    <TableCell>{type.repRange3}</TableCell>
                    <TableCell>{type.type_session}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      )}
      {type.length === 0 && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                Tu n'as pas encore de type exercice.
                <Link className="w-[150px]" to="/types/new-type">
                  <Button className=" w-full">Nouveau type</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default TypesList
