import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Breadcrumb from "../../ui/Breadcrumb"
import Input from "../../forms/Input"
import toast from "react-hot-toast"

interface ILevelInput {
  name: string
  description: string
  permissions: string[]
}

interface ILevel {
  id: string
  name: string
  description: string
  permissions: string[]
  agentCount: number
  createdAt: string
}

const Level: React.FC = () => {
  const [levelName, setLevelName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [levels, setLevels] = useState<ILevel[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ILevelInput>()

  const availablePermissions = [
    { id: 'read_meters', name: 'Read Water Meters', description: 'Access to read and record meter readings' },
    { id: 'manage_subscribers', name: 'Manage Subscribers', description: 'Add, edit, and manage subscriber information' },
    { id: 'handle_complaints', name: 'Handle Complaints', description: 'Process and resolve customer complaints' },
    { id: 'emergency_response', name: 'Emergency Response', description: 'Respond to water emergencies and leaks' },
    { id: 'quality_testing', name: 'Quality Testing', description: 'Perform water quality tests and inspections' },
    { id: 'maintenance', name: 'Maintenance', description: 'Perform routine maintenance tasks' },
    { id: 'reporting', name: 'Generate Reports', description: 'Create and submit operational reports' },
    { id: 'supervisor', name: 'Supervisor Access', description: 'Supervise other agents and approve actions' }
  ]

  // Mock data for demonstration
  useEffect(() => {
    const mockLevels: ILevel[] = [
      {
        id: '1',
        name: 'Field Agent',
        description: 'Basic field operations and meter reading',
        permissions: ['read_meters', 'handle_complaints'],
        agentCount: 45,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Senior Agent',
        description: 'Advanced field operations with emergency response',
        permissions: ['read_meters', 'handle_complaints', 'emergency_response', 'quality_testing'],
        agentCount: 28,
        createdAt: '2024-01-10'
      },
      {
        id: '3',
        name: 'Supervisor',
        description: 'Team supervision and advanced permissions',
        permissions: ['read_meters', 'manage_subscribers', 'handle_complaints', 'emergency_response', 'quality_testing', 'maintenance', 'reporting', 'supervisor'],
        agentCount: 12,
        createdAt: '2024-01-05'
      }
    ]
    setLevels(mockLevels)
  }, [])

  const handleSubmitLevel: SubmitHandler<ILevelInput> = async (data) => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newLevel: ILevel = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        permissions: selectedPermissions,
        agentCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      setLevels(prev => [...prev, newLevel])
      setLevelName('')
      setDescription('')
      setSelectedPermissions([])
      setShowForm(false)
      reset()
      toast.success('Agent level created successfully!')
    } catch (error: any) {
      toast.error('Failed to create agent level')
    } finally {
      setLoading(false)
    }
  }

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    )
  }

  const getLevelColor = (level: ILevel) => {
    if (level.permissions.includes('supervisor')) return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20'
    if (level.permissions.length >= 5) return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
    return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
  }

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Agent Levels" />

      {/* Header Section */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Agent Level Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Define agent roles, permissions, and access levels
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Level
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{levels.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Levels</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{levels.reduce((sum, level) => sum + level.agentCount, 0)}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Agents</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{levels.filter(l => l.permissions.includes('supervisor')).length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Supervisor Levels</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{availablePermissions.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Permissions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Level Form */}
      {showForm && (
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create New Agent Level
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(handleSubmitLevel)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter level name"
                  value={levelName}
                  register={register}
                  onChange={(e) => setLevelName(e.target.value)}
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">Level name is required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <Input
                  type="text"
                  placeholder="Enter level description"
                  value={description}
                  register={register}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Permissions
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPermissions.includes(permission.id)
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                    }`}
                    onClick={() => handlePermissionToggle(permission.id)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {permission.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Creating...' : 'Create Level'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Levels List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Existing Agent Levels
        </h2>
        
        {levels.map((level) => (
          <div key={level.id} className={`border-l-4 rounded-r-xl shadow-lg p-6 ${getLevelColor(level)}`}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {level.name}
                  </h3>
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    {level.agentCount} agents
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {level.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {level.permissions.map((permissionId) => {
                    const permission = availablePermissions.find(p => p.id === permissionId)
                    return (
                      <span
                        key={permissionId}
                        className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-600"
                      >
                        {permission?.name}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Level