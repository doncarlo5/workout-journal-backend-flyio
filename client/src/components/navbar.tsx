import useAuth from "@/context/use-auth"
import {
  LucideBadgePlus,
  LucideCircleUser,
  LucideHistory,
  LucideHome,
  LucideLineChart,
  LucideRocket,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { ModeToggle } from "./mode-toggle"
import NewSessionButton from "./new-session-button"

function Navbar() {
  const { isLoggedIn } = useAuth()
  const activeLink = "text-teal-500"
  const inactiveLink = ""

  return (
    <header className=" ">
      <div className="">
        {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile  */}

        <section
          id="bottom-navigation"
          className="fixed inset-x-1 bottom-1 z-10 m-auto block max-w-2xl rounded-xl border-t border-gray-200 bg-white bg-opacity-30  shadow backdrop-blur-lg backdrop-filter dark:border-none"
        >
          <div id="tabs" className="flex justify-between">
            <ModeToggle />

            {!isLoggedIn ? (
              <>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/welcome"
                >
                  <LucideHome className="mb-1 inline-block" size={24} />
                  <span className="tab tab-whishlist block text-xs">Home</span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/signup"
                >
                  <LucideRocket className="mb-1 inline-block" size={24} />
                  <span className="tab tab-whishlist block text-xs">Se connecter</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/profile"
                >
                  <LucideCircleUser className="mb-1 inline-block" size={24} />
                  <span className="tab tab-whishlist block text-xs">Profile</span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/stats"
                >
                  <LucideLineChart className="mb-1 inline-block" size={24} />
                  <span className="tab tab-whishlist block text-xs">Stats</span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/history"
                >
                  <LucideHistory className="mb-1 inline-block" size={24} />
                  <span className="tab tab-whishlist block text-xs">Historique</span>
                </NavLink>
                <NewSessionButton
                  Children={
                    <div className="inline-block w-full cursor-pointer justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500">
                      <LucideBadgePlus className="mb-1 inline-block" size={24} />
                      <span className="tab tab-account block text-xs">New</span>
                    </div>
                  }
                />
              </>
            )}
          </div>
        </section>
      </div>
      {/* <Link className="w-full text-3xl font-bold " to="/">
        <FlagIcon className="" />
        <span className="hidden text-xl font-bold ">Workout Journal</span>
      </Link> */}
      {/* <div className=" flex">
        {!isLoggedIn ? (
          <nav>
            <Link className=" rounded-lg bg-gray-100 py-3 text-sm font-medium dark:bg-gray-800" to="/signup">
              S'inscrire
            </Link>
            <Link className=" rounded-lg bg-gray-100 py-3 text-sm font-medium dark:bg-gray-800" to="/login">
              Se connecter
            </Link>
            <ModeToggle />
          </nav>
        ) : (
          <nav>
            <NewSessionButton />
            <Link
              className=" rounded-lg bg-gray-100 py-3 text-sm font-medium transition-shadow hover:shadow-sm dark:bg-gray-800"
              to="/exercises"
            >
              Mes exercices
            </Link>
            <Link
              className=" rounded-lg bg-gray-100 py-3 text-sm font-medium transition-shadow hover:shadow-sm dark:bg-gray-800"
              to="/sessions"
            >
              Mes séances
            </Link>
            <Link
              className=" rounded-lg bg-gray-100 py-3 text-sm font-medium transition-shadow hover:shadow-sm dark:bg-gray-800"
              to="/types"
            >
              Types
            </Link>
            <Link
              className=" rounded-lg bg-gray-100 py-3 text-sm font-medium transition-shadow hover:shadow-sm dark:bg-gray-800"
              to="/charts"
            >
              Charts
            </Link>
            <Link
              className=" rounded-lg bg-gray-100 py-3 text-sm font-medium transition-shadow hover:shadow-sm dark:bg-gray-800"
              to="/settings"
            >
              Options
            </Link>
            <Link
              to="/welcome"
              className=" rounded-lg bg-gray-100 py-3 text-sm font-medium text-black transition-shadow hover:shadow-sm dark:bg-gray-800"
              onClick={handleLogout}
            >
              ⍈
            </Link>
            <ModeToggle />
          </nav>
        )}
      </div> */}
    </header>
  )
}

// function FlagIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 512 512"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path
//         fill="currentColor"
//         d="m77.492 18.457l-17.726 3.127L69.09 74.47a1630.67 1630.67 0 0 0-15.8 2.54l-6.503-36.89l-17.726 3.124l6.49 36.795a1877.847 1877.847 0 0 0-17.196 3.112l3.292 17.696c5.728-1.066 11.397-2.09 17.028-3.084l7.056 40.02l17.727-3.124l-7.04-39.93c5.304-.88 10.57-1.725 15.798-2.54l9.777 55.45l17.727-3.126l-9.697-54.99a1415.91 1415.91 0 0 1 25.18-3.38c15.54 46.39 34.697 99.995 66.936 134.448C190.86 250.992 192 268 214.56 310C192 348 176 412 167.21 471l-48 6v15H192c16-48 64-144 64-144s48 96 64 144h72.79v-15l-48-6C336 412 320 348 294 310c26-42 24.175-59.585 35.83-89.377c32.25-34.452 51.42-88.075 66.967-134.478c8.314 1.04 16.697 2.16 25.18 3.38l-9.696 54.99l17.728 3.124l9.777-55.45c5.23.815 10.494 1.66 15.8 2.54l-7.042 39.93l17.727 3.125l7.056-40.02c5.63.993 11.3 2.017 17.028 3.083l3.292-17.696c-5.78-1.075-11.507-2.11-17.195-3.113l6.49-36.796l-17.727-3.125l-6.504 36.89a1564.46 1564.46 0 0 0-15.8-2.54l9.324-52.886l-17.726-3.127l-9.406 53.35C365.982 63.31 310.982 59.04 256 59.04c-54.98 0-109.983 4.27-169.102 12.767zM256 76.98c35.53 0 71.07 1.83 107.822 5.463c-14.082 34.858-38.454 73.504-63.203 101.967C290.293 199.27 274.35 209 256 209s-34.294-9.73-44.62-24.59c-24.748-28.463-49.12-67.11-63.202-101.967c36.75-3.633 72.29-5.463 107.822-5.463M256 97c-20.835 0-39 20.24-39 47s18.165 47 39 47s39-20.24 39-47s-18.165-47-39-47"
//       />
//     </svg>
//   )
// }

export { Navbar }
