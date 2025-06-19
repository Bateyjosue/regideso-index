import { useState, useEffect } from 'react'

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode

  useEffect(() => {
    // Check if user has a preference stored, otherwise default to dark
    const savedMode = localStorage.getItem('darkMode')
    const isDark = savedMode ? JSON.parse(savedMode) : true
    
    setDarkMode(isDark)
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <li>
      <button
        onClick={toggleDarkMode}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-gray-50 hover:bg-gray-100 transition-all duration-200 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-meta-4/80"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg
            className="fill-current text-yellow-500"
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
              d="M9 3.375C8.5875 3.375 8.25 3.7125 8.25 4.125V4.5C8.25 4.9125 8.5875 5.25 9 5.25C9.4125 5.25 9.75 4.9125 9.75 4.5V4.125C9.75 3.7125 9.4125 3.375 9 3.375Z"
              fill=""
            />
            <path
              d="M9 12.75C8.5875 12.75 8.25 13.0875 8.25 13.5V13.875C8.25 14.2875 8.5875 14.625 9 14.625C9.4125 14.625 9.75 14.2875 9.75 13.875V13.5C9.75 13.0875 9.4125 12.75 9 12.75Z"
              fill=""
            />
            <path
              d="M13.875 8.25H13.5C13.0875 8.25 12.75 8.5875 12.75 9C12.75 9.4125 13.0875 9.75 13.5 9.75H13.875C14.2875 9.75 14.625 9.4125 14.625 9C14.625 8.5875 14.2875 8.25 13.875 8.25Z"
              fill=""
            />
            <path
              d="M4.5 8.25H4.125C3.7125 8.25 3.375 8.5875 3.375 9C3.375 9.4125 3.7125 9.75 4.125 9.75H4.5C4.9125 9.75 5.25 9.4125 5.25 9C5.25 8.5875 4.9125 8.25 4.5 8.25Z"
              fill=""
            />
          </svg>
        ) : (
          <svg
            className="fill-current text-gray-700"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 9.5625C15.75 13.6875 12.4375 17 8.3125 17C4.1875 17 0.875 13.6875 0.875 9.5625C0.875 5.4375 4.1875 2.125 8.3125 2.125C8.875 2.125 9.4375 2.1875 9.9375 2.3125C9.5 3.0625 9.25 3.9375 9.25 4.875C9.25 7.5 11.375 9.625 14 9.625C14.9375 9.625 15.8125 9.375 16.5625 8.9375C16.6875 9.4375 16.75 10 15.75 9.5625Z"
              fill=""
            />
          </svg>
        )}
      </button>
    </li>
  )
}

export default DarkModeToggle