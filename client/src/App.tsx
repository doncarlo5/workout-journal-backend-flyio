// import SessionPage from "./pages/session-page"
import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import DoExercisePage from "./pages/do-exercise-page"
import ErrorBoundary from "./pages/error-boundary"
import { HistoryPage } from "./pages/history-page"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import NewType from "./pages/new-type"
import NotFoundPage from "./pages/no-found-page"
import OneExercise from "./pages/one-exercise"
import OneSession from "./pages/one-session"
import OneType from "./pages/one-type"
import ProfilePage from "./pages/profile-page"
import SignupPage from "./pages/signup-page"
import StatsPage from "./pages/stats-page"
import TypesList from "./pages/types-list"
import WelcomePage from "./pages/welcome-page"
import IsAuthenticated from "./routing/is-authenticated"
import IsNotAuthenticated from "./routing/is-not-authenticated"

function App() {
  return (
    <div className="">
      <ErrorBoundary>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Routes>
            <Route element={<IsNotAuthenticated />}>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<IsAuthenticated redirect={"/welcome"} />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route element={<IsAuthenticated redirect={"/"} />}>
              <Route path="/history" element={<HistoryPage />} />
              {/* <Route path="/sessions" element={<SessionsList />} /> */}
              <Route path="/history/exercise/:exerciseId" element={<OneExercise />} />
              <Route path="/history/session/:sessionId" element={<OneSession />} />
              <Route path="/history/session/:sessionId/do-exercise" element={<DoExercisePage />} />
              {/* <Route path="/exercises" element={<ExercicesList />} /> */}
              <Route path="/profile/type" element={<TypesList />} />
              <Route path="/profile/type/:typeId" element={<OneType />} />
              <Route path="/profile/type/new-type" element={<NewType />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
