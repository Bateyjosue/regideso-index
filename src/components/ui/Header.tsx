import { Link } from "react-router-dom"
import DropdownNotification from "./DropdownNotification"
import DropdownUser from "./DropdowUser"
import DarkModeToggle from "./DarkModeToggle"
import { IProfile } from "../../data/types"

interface HeaderProps {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
  profile: IProfile
}

const Header = ({ sidebarOpen, setSidebarOpen, profile }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white/80 backdrop-blur-md border-b border-gray-200 drop-shadow-sm dark:bg-boxdark/80 dark:border-strokedark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              setSidebarOpen(!sidebarOpen)
            }}
            className="z-99999 block rounded-lg border border-stroke bg-white/90 backdrop-blur-sm p-2 shadow-sm hover:shadow-md transition-all duration-200 dark:border-strokedark dark:bg-boxdark/90 lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">REGIDESO</span>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block flex-1 max-w-md mx-8">
          <form className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search subscribers, agents, locations..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 2xsm:gap-4">
          {/* System Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              All Systems Operational
            </span>
          </div>

          <ul className="flex items-center gap-2 2xsm:gap-3">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Notification Menu */}
            <DropdownNotification />

            {/* Quick Actions */}
            <li className="relative">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-gray-50 hover:bg-gray-100 transition-colors dark:border-strokedark dark:bg-meta-4 dark:hover:bg-meta-4/80">
                <svg
                  className="fill-current duration-300 ease-in-out"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 0.5625C4.3125 0.5625 0.5625 4.3125 0.5625 9C0.5625 13.6875 4.3125 17.4375 9 17.4375C13.6875 17.4375 17.4375 13.6875 17.4375 9C17.4375 4.3125 13.6875 0.5625 9 0.5625ZM9 15.75C5.25 15.75 2.25 12.75 2.25 9C2.25 5.25 5.25 2.25 9 2.25C12.75 2.25 15.75 5.25 15.75 9C15.75 12.75 12.75 15.75 9 15.75Z"
                    fill=""
                  />
                  <path
                    d="M9 4.5C8.5875 4.5 8.25 4.8375 8.25 5.25V9.75C8.25 10.1625 8.5875 10.5 9 10.5C9.4125 10.5 9.75 10.1625 9.75 9.75V5.25C9.75 4.8375 9.4125 4.5 9 4.5Z"
                    fill=""
                  />
                  <path
                    d="M9 12C8.5875 12 8.25 12.3375 8.25 12.75C8.25 13.1625 8.5875 13.5 9 13.5C9.4125 13.5 9.75 13.1625 9.75 12.75C9.75 12.3375 9.4125 12 9 12Z"
                    fill=""
                  />
                </svg>
              </button>
            </li>
          </ul>

          {/* User Profile */}
          <DropdownUser fullName={profile.fullName} role={profile.role} />
        </div>
      </div>
    </header>
  )
}

export default Header