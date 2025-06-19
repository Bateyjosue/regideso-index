import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

interface ILeakReportInput {
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
}

interface ILeakReport {
  id: string
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  reportedBy: string
  reportedAt: string
  status: 'pending' | 'assigned' | 'in-progress' | 'resolved'
  photos?: string[]
}

const AgentLeakReporting = () => {
  const [loading, setLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [recentLeaks, setRecentLeaks] = useState<ILeakReport[]>([
    {
      id: '1',
      location: 'Avenue de la Paix, Sector 5',
      severity: 'high',
      description: 'Major pipe burst causing water loss',
      reportedBy: 'AG001',
      reportedAt: '2024-12-01 14:30',
      status: 'in-progress'
    },
    {
      id: '2',
      location: 'Nyamirambo Avenue, House #45',
      severity: 'medium',
      description: 'Small leak at connection point',
      reportedBy: 'AG001',
      reportedAt: '2024-12-01 10:15',
      status: 'resolved'
    }
  ])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ILeakReportInput>()

  const handleReportLeak: SubmitHandler<ILeakReportInput> = async (data) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newLeak: ILeakReport = {
        id: Date.now().toString(),
        location: data.location,
        severity: data.severity,
        description: data.description,
        reportedBy: 'AG001', // Mock agent ID
        reportedAt: new Date().toISOString(),
        status: 'pending'
      }
      
      setRecentLeaks(prev => [newLeak, ...prev])
      reset()
      setSelectedLocation(null)
      toast.success('Leak reported successfully!')
    } catch (error) {
      toast.error('Failed to report leak')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectLocation = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng })
    setShowMap(false)
    // Set a mock location string
    setValue('location', `Location at coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`)
  }

  const { setValue } = useForm()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'assigned': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Report New Leak */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Report New Leak</h2>
        
        <form onSubmit={handleSubmit(handleReportLeak)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                {...register('location', { required: true })}
                placeholder="Enter exact location (street, house number, landmarks)"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            {errors.location && <p className="mt-1 text-sm text-red-600">Location is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Severity Level *
            </label>
            <select
              {...register('severity', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="low">Low - Minor drip or seepage</option>
              <option value="medium">Medium - Steady leak</option>
              <option value="high">High - Major leak affecting service</option>
              <option value="critical">Critical - Emergency situation</option>
            </select>
            {errors.severity && <p className="mt-1 text-sm text-red-600">Severity is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: true })}
              rows={4}
              placeholder="Describe the leak in detail (size, water flow, potential causes, impact on service)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Click to upload photos or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG up to 10MB each
              </p>
              <input type="file" multiple className="hidden" />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Reporting...' : 'Report Leak'}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-boxdark rounded-xl p-6 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Location</h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-80 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Interactive map would be displayed here
                </p>
                <button
                  onClick={() => handleSelectLocation(-1.9441, 30.0619)} // Kigali coordinates
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Select Current Location
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowMap(false)}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Leak Reports */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Leak Reports</h2>
        <div className="space-y-4">
          {recentLeaks.map((leak) => (
            <div key={leak.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{leak.location}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{leak.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${getSeverityColor(leak.severity)}`}>
                    {leak.severity}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(leak.status)}`}>
                    {leak.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <span>Reported: {new Date(leak.reportedAt).toLocaleString()}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    View
                  </button>
                  {leak.status === 'pending' && (
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AgentLeakReporting