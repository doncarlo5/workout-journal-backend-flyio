import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

import LoginComponent from "../components/login-component"
import SignupComponent from "../components/signup-component"

const SignupPage = () => {
  return (
    <div className=" mx-auto">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 text-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Profile</h1>
        </div>
        <Tabs
          defaultValue="signup"
          className="container flex flex-col items-center justify-center gap-4 px-10  md:px-6"
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-2 rounded-xl ">
            <TabsTrigger value="signup">S'inscrire</TabsTrigger>
            <TabsTrigger value="signin">Se connecter</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <SignupComponent />
          </TabsContent>
          <TabsContent value="signin">
            <LoginComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default SignupPage
