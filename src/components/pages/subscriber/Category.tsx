import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Breadcrumb from "../../ui/Breadcrumb"
import Input from "../../forms/Input"
import toast from "react-hot-toast"

interface ISubscriberCategoryInput {
  name: string
  description: string
  tariffRate: number
  connectionFee: number
}

interface ISubscriberCategory {
  id: string
  name: string
  description: string
  tariffRate: number
  connectionFee: number
  subscriberCount: number
  totalRevenue: number
  createdAt: string
}

const SubscriberCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tariffRate, setTariffRate] = useState<number>(0)
  const [connectionFee, setConnectionFee] = useState<number>(0)
  const [categories, setCategories] = useState<ISubscriberCategory[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ISubscriberCategoryInput>()

  // Mock data for demonstration
  useEffect(() => {
    const mockCategories: ISubscriberCategory[] = [
      {
        id: '1',
        name: 'Domestic Basic',
        description: 'Standard household water supply',
        tariffRate: 450,
        connectionFee: 25000,
        subscriberCount: 1850,
        totalRevenue: 832500,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Domestic Premium',
        description: 'High-volume household connections',
        tariffRate: 650,
        connectionFee: 35000,
        subscriberCount: 650,
        totalRevenue: 422500,
        createdAt: '2024-01-12'
      },
      {
        id: '3',
        name: 'Commercial Standard',
        description: 'Small to medium business establishments',
        tariffRate: 850,
        connectionFee: 50000,
        subscriberCount: 420,
        totalRevenue: 357000,
        createdAt: '2024-01-10'
      },
      {
        id: '4',
        name: 'Commercial Premium',
        description: 'Large commercial and office buildings',
        tariffRate: 1200,
        connectionFee: 75000,
        subscriberCount: 180,
        totalRevenue: 216000,
        createdAt: '2024-01-08'
      },
      {
        id: '5',
        name: 'Industrial',
        description: 'Manufacturing and industrial facilities',
        tariffRate: 1800,
        connectionFee: 150000,
        subscriberCount: 85,
        totalRevenue: 153000,
        createdAt: '2024-01-05'
      }
    ]
    setCategories(mockCategories)
  }, [])

  const handleSubmitCategory: SubmitHandler<ISubscriberCategoryInput> = async (data) => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newCategory: ISubscriberCategory = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        tariffRate: data.tariffRate,
        connectionFee: data.connectionFee,
        subscriberCount: 0,
        totalRevenue: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      setCategories(prev => [...prev, newCategory])
      setCategoryName('')
      setDescription('')
      setTariffRate(0)
      setConnectionFee(0)
      setShowForm(false)
      reset()
      toast.success('Subscriber category created successfully!')
    } catch (error: any) {
      toast.error('Failed to create subscriber category')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getCategoryColor = (category: ISubscriberCategory) => {
    if (category.name.toLowerCase().includes('industrial')) return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20'
    if (category.name.toLowerCase().includes('commercial')) return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20'
    if (category.name.toLowerCase().includes('premium')) return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
    return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
  }

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Subscriber Categories" />

      {/* Header Section */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Subscriber Category Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage subscriber types, tariff rates, and connection fees
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Categories</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.reduce((sum, cat) => sum + cat.subscriberCount, 0).toLocaleString()}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Subscribers</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(categories.reduce((sum, cat) => sum + cat.totalRevenue, 0))}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(categories.reduce((sum, cat) => sum + cat.totalRevenue, 0) / categories.reduce((sum, cat) => sum + cat.subscriberCount, 0))}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Revenue/Sub</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Category Form */}
      {showForm && (
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create New Subscriber Category
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

          <form onSubmit={handleSubmit(handleSubmitCategory)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  register={register}
                  onChange={(e) => setCategoryName(e.target.value)}
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">Category name is required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <Input
                  type="text"
                  placeholder="Enter category description"
                  value={description}
                  register={register}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tariff Rate (RWF per m³)
                </label>
                <Input
                  type="number"
                  placeholder="Enter tariff rate"
                  value={tariffRate.toString()}
                  register={register}
                  onChange={(e) => setTariffRate(Number(e.target.value))}
                  name="tariffRate"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.tariffRate && <p className="mt-1 text-sm text-red-600">Tariff rate is required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Connection Fee (RWF)
                </label>
                <Input
                  type="number"
                  placeholder="Enter connection fee"
                  value={connectionFee.toString()}
                  register={register}
                  onChange={(e) => setConnectionFee(Number(e.target.value))}
                  name="connectionFee"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.connectionFee && <p className="mt-1 text-sm text-red-600">Connection fee is required</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Creating...' : 'Create Category'}
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

      {/* Categories List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Subscriber Categories
        </h2>
        
        {categories.map((category) => (
          <div key={category.id} className={`border-l-4 rounded-r-xl shadow-lg p-6 ${getCategoryColor(category)}`}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-600">
                    {category.subscriberCount.toLocaleString()} subscribers
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {category.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tariff Rate</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{formatCurrency(category.tariffRate)}/m³</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Connection Fee</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{formatCurrency(category.connectionFee)}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{formatCurrency(category.totalRevenue)}</div>
                  </div>
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

export default SubscriberCategory