import useAuth from "@/context/use-auth"
import { Navigate, Outlet } from "react-router-dom"

const IsNotAuthenticated = () => {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <p>Loading</p>
  }
  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default IsNotAuthenticated
