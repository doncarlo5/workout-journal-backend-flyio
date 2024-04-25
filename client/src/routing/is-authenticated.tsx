import useAuth from "@/context/use-auth"
import { Navigate, Outlet } from "react-router-dom"

type IsAuthenticatedProps = {
  redirect: string
}

const IsAuthenticated = ({ redirect }: IsAuthenticatedProps) => {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <p>Loading</p>
  }

  if (!isLoggedIn) {
    return <Navigate to={redirect} />
  }

  return <Outlet />
}

export default IsAuthenticated
