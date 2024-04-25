import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.tsx"
import { Toaster } from "./components/ui/toaster"

import "./index.css"

import { BrowserRouter } from "react-router-dom"

import AuthContextWrapper from "./context/context-wrapper.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <App />
        <Toaster />
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
)
