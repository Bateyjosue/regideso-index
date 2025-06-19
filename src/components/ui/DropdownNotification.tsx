import { useState } from 'react'
import { Link } from 'react-router-dom'

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'High Pressure Alert',
      message: 'Pressure exceeding safe limits in Kigali Central district',
      time: '2 minutes ago',
      read: false,
      icon: '⚠️',
      color: 'text-red-600'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Subscriber',
      message: '15 new connections added in Butare region',
      time: '1 hour ago',
      read: false,
      icon: '👥',
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'success',
      title: 'Leak Repaired',
      message: 'Avenue de la Paix leak successfully fixed by Team Alpha',
      time: '3 hours ago',
      read: true,
      icon: '✅',
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Maintenance Scheduled',
      message: 'Routine maintenance planned for tomorrow 6:00 AM',
      time: '5 hours ago',
      read: true,
      icon: '🔧',
      color: 'text-yellow-600'
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <li className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-gray-50 hover:bg-gray-100 transition-colors dark:border-strokedark dark:bg-meta-4 dark:hover:bg-meta-4/80"
      >
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 z-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{unreadCount}</span>
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          </span>
        )}

        <svg
          className="fill-current duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
            fill=""
          />
        </svg>
      </button>

      {dropdownOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setDropdownOpen(false)}
          ></div>
          
          {/* Dropdown */}
          <div className="absolute -right-16 sm:right-0 mt-2.5 flex h-90 w-80 flex-col rounded-xl border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark z-20">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h5>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-900 dark:text-red-200">
                    {unreadCount} new
                  </span>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <ul className="flex h-auto flex-col overflow-y-auto">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <Link
                    className={`flex gap-3 border-b border-stroke px-4 py-3 hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4 transition-colors ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                    to="#"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg`}>
                        {notification.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm font-medium ${notification.color} mb-1`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3">
              <Link
                to="/notifications"
                className="block w-full text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                View All Notifications
              </Link>
            </div>
          </div>
        </>
      )}
    </li>
  )
}

export default DropdownNotification