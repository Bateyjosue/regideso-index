import { useState } from 'react'
import Breadcrumb from '../../ui/Breadcrumb'
import { useAuth } from '../../../hooks/useAuth'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'activity'>('profile')
  const [loading, setLoading] = useState(false)

  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: user?.email || 'admin@regideso.com',
    phone: '+250788123456',
    department: 'Water Management',
    position: 'System Administrator',
    location: 'Kigali, Rwanda',
    bio: 'Experienced water management professional with over 10 years in the industry.',
    avatar: ''
  })

  // Preferences state
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'Africa/Kigali',
    dateFormat: 'DD/MM/YYYY',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    dashboard: {
      autoRefresh: true,
      refreshInterval: 30,
      defaultView: 'overview'
    }
  })

  // Security state
  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: true,
    lastPasswordChange: '2024-11-15',
    loginSessions: [
      {
        id: 1,
        device: 'Chrome on Windows',
        location: 'Kigali, Rwanda',
        lastActive: '2024-12-01 14:30',
        current: true
      },
      {
        id: 2,
        device: 'Safari on iPhone',
        location: 'Kigali, Rwanda',
        lastActive: '2024-11-30 09:15',
        current: false
      }
    ]
  })

  // Activity data
  const [activityData] = useState([
    {
      id: 1,
      action: 'Generated Water Consumption Report',
      timestamp: '2024-12-01 14:25',
      type: 'report',
      details: 'Monthly report for November 2024'
    },
    {
      id: 2,
      action: 'Updated System Settings',
      timestamp: '2024-12-01 10:15',
      type: 'settings',
      details: 'Modified notification preferences'
    },
    {
      id: 3,
      action: 'Added New Agent',
      timestamp: '2024-11-30 16:45',
      type: 'user',
      details: 'Jean Mukamana - Field Agent'
    },
    {
      id: 4,
      action: 'Exported Analytics Data',
      timestamp: '2024-11-30 11:20',
      type: 'export',
      details: 'Revenue analysis for Q4 2024'
    },
    {
      id: 5,
      action: 'Login from New Device',
      timestamp: '2024-11-29 08:30',
      type: 'security',
      details: 'Safari on iPhone from Kigali'
    }
  ])

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSavePreferences = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Preferences saved successfully!')
    } catch (error) {
      toast.error('Failed to save preferences')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = () => {
    toast.info('Password change functionality coming soon!')
  }

  const handleRevokeSession = (sessionId: number) => {
    toast.success('Session revoked successfully!')
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report': return '📊'
      case 'settings': return '⚙️'
      case 'user': return '👤'
      case 'export': return '📤'
      case 'security': return '🔒'
      default: return '📝'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'report': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'settings': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      case 'user': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'export': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {profileData.firstName} {profileData.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{profileData.position}</p>
          <p className="text-gray-600 dark:text-gray-400">{profileData.department}</p>
          <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-600 dark:text-gray-400 text-sm">{profileData.location}</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Department
          </label>
          <input
            type="text"
            value={profileData.department}
            onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Position
          </label>
          <input
            type="text"
            value={profileData.position}
            onChange={(e) => setProfileData(prev => ({ ...prev, position: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          rows={4}
          value={profileData.bio}
          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Appearance */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="Africa/Kigali">Africa/Kigali (CAT)</option>
              <option value="UTC">UTC</option>
              <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Format
            </label>
            <select
              value={preferences.dateFormat}
              onChange={(e) => setPreferences(prev => ({ ...prev, dateFormat: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'push', label: 'Push Notifications', description: 'Receive browser push notifications' },
            { key: 'sms', label: 'SMS Notifications', description: 'Receive notifications via SMS' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.notifications[item.key as keyof typeof preferences.notifications]}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, [item.key]: e.target.checked }
                }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dashboard Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Auto Refresh</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically refresh dashboard data</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.dashboard.autoRefresh}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                dashboard: { ...prev.dashboard, autoRefresh: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="300"
                value={preferences.dashboard.refreshInterval}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  dashboard: { ...prev.dashboard, refreshInterval: Number(e.target.value) }
                }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default View
              </label>
              <select
                value={preferences.dashboard.defaultView}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  dashboard: { ...prev.dashboard, defaultView: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="overview">Overview</option>
                <option value="analytics">Analytics</option>
                <option value="reports">Reports</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSavePreferences}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Password</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last changed: {new Date(securityData.lastPasswordChange).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={handleChangePassword}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm rounded-full ${
              securityData.twoFactorEnabled 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {securityData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={() => setSecurityData(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                securityData.twoFactorEnabled
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {securityData.twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
        <div className="space-y-4">
          {securityData.loginSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-4l-3 3-3-3H5a2 2 0 01-2-2V5zm5.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{session.device}</h4>
                    {session.current && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Last active: {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleRevokeSession(session.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderActivityTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          Export Activity Log
        </button>
      </div>

      <div className="space-y-4">
        {activityData.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                  {activity.action}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-500 flex-shrink-0 ml-4">
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {activity.details}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          Load More Activity
        </button>
      </div>
    </div>
  )

  const getTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab()
      case 'preferences': return renderPreferencesTab()
      case 'security': return renderSecurityTab()
      case 'activity': return renderActivityTab()
      default: return renderProfileTab()
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Profile Settings" />

      {/* Header */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'profile', label: 'Profile', icon: '👤' },
              { key: 'preferences', label: 'Preferences', icon: '⚙️' },
              { key: 'security', label: 'Security', icon: '🔒' },
              { key: 'activity', label: 'Activity', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {getTabContent()}
        </div>
      </div>
    </div>
  )
}

export default Profile