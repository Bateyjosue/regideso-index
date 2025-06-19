import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

interface DropdownUserProps {
  fullName: string
  role: string
}

export default function DropdownUser({ fullName, role }: DropdownUserProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  const handleOpenDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="relative">
      <button
        onClick={handleOpenDropdown}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
      >
        {/* Profile Info */}
        <div className="hidden text-right lg:block">
          <span className="block text-sm font-semibold text-gray-900 dark:text-white">
            {fullName}
          </span>
          <span className="block text-xs text-gray-600 dark:text-gray-400 capitalize">
            {role}
          </span>
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
            {getInitials(fullName)}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setDropdownOpen(false)}
          ></div>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-boxdark rounded-xl shadow-xl border border-gray-200 dark:border-strokedark z-20 overflow-hidden">
            {/* Profile Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  {getInitials(fullName)}
                </div>
                <div>
                  <div className="font-semibold">{fullName}</div>
                  <div className="text-sm opacity-90 capitalize">{role}</div>
                  <div className="text-xs opacity-75 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">My Profile</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">View and edit profile</div>
                </div>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Settings</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Preferences & security</div>
                </div>
              </Link>

              <Link
                to="/analytics"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">View insights</div>
                </div>
              </Link>

              <Link
                to="/reports"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Reports</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Generate reports</div>
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Logout */}
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Sign Out</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">End your session</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}