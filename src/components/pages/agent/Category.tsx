import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Breadcrumb from "../../ui/Breadcrumb"
import Input from "../../forms/Input"
import toast from "react-hot-toast"

interface ICategoryInput {
  name: string
  description: string
  color: string
}

interface ICategory {
  id: string
  name: string
  description: string
  color: string
  agentCount: number
  subscriberCount: number
  createdAt: string
}

const Category: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('#3B82F6')
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICategoryInput>()

  const colorOptions = [
    { value: '#3B82F6', name: 'Blue' },
    { value: '#10B981', name: 'Green' },
    { value: '#F59E0B', name: 'Yellow' },
    { value: '#EF4444', name: 'Red' },
    { value: '#8B5CF6', name: 'Purple' },
    { value: '#F97316', name: 'Orange' },
    { value: '#06B6D4', name: 'Cyan' },
    { value: '#84CC16', name: 'Lime' }
  ]

  // Mock data for demonstration
  useEffect(() => {
    const mockCategories: ICategory[] = [
      {
        id: '1',
        name: 'Residential',
        description: 'Household water connections and services',
        color: '#3B82F6',
        agentCount: 35,
        subscriberCount: 2500,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Commercial',
        description: 'Business and commercial establishments',
        color: '#10B981',
        agentCount: 20,
        subscriberCount: 850,
        createdAt: '2024-01-10'
      },
      {
        id: '3',
        name: 'Industrial',
        description: 'Large-scale industrial water supply',
        color: '#F59E0B',
        agentCount: 15,
        subscriberCount: 120,
        createdAt: '2024-01-08'
      },
      {
        id: '4',
        name: 'Public Services',
        description: 'Schools, hospitals, and government buildings',
        color: '#8B5CF6',
        agentCount: 12,
        subscriberCount: 300,
        createdAt: '2024-01-05'
      }
    ]
    setCategories(mockCategories)
  }, [])

  const handleSubmitCategory: SubmitHandler<ICategoryInput> = async (data) => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newCategory: ICategory = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        color: selectedColor,
        agentCount: 0,
        subscriberCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      setCategories(prev => [...prev, newCategory])
      setCategoryName('')
      setDescription('')
      setSelectedColor('#3B82F6')
      setShowForm(false)
      reset()
      toast.success('Category created successfully!')
    } catch (error: any) {
      toast.error('Failed to create category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Agent Categories" />

      {/* Header Section */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Agent Category Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize agents and subscribers by service categories
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.reduce((sum, cat) => sum + cat.agentCount, 0)}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Agents</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.reduce((sum, cat) => sum + cat.subscriberCount, 0)}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Subscribers</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(categories.reduce((sum, cat) => sum + cat.subscriberCount, 0) / categories.reduce((sum, cat) => sum + cat.agentCount, 0))}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Avg per Agent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Category Form */}
      {showForm && (
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create New Category
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Category Color
              </label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-gray-900 dark:border-white scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.value && (
                      <svg className="w-6 h-6 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
            <div className="h-2" style={{ backgroundColor: category.color }}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {category.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.agentCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Agents
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.subscriberCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Subscribers
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category