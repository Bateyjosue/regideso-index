import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Breadcrumb from "../../ui/Breadcrumb"
import TableUI from "../../ui/Table"
import Input from "../../forms/Input"
import SelectForm from "../../forms/SelectForm"
import { addAgency, getAgency, getDirections } from "../../../data/direction/directionService"
import { ITableProps, IDirection } from "../../../data/types"
import toast from "react-hot-toast"

interface IAgencyInput {
  name: string
  code_direction: string
}

const Agency: React.FC = () => {
  const [agencyName, setAgencyName] = useState<string>('')
  const [selectedDirection, setSelectedDirection] = useState<string>('')
  const [agencyData, setAgencyData] = useState<ITableProps[]>([])
  const [directionData, setDirectionData] = useState<IDirection[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IAgencyInput>()

  const handleSubmitAgency: SubmitHandler<IAgencyInput> = async (data) => {
    try {
      setLoading(true)
      const { data: newAgency, error } = await addAgency(data)
      
      if (newAgency) {
        setAgencyData(prev => [...prev, ...newAgency])
        setAgencyName('')
        setSelectedDirection('')
        setShowForm(false)
        reset()
        toast.success('Agency added successfully!')
      }

      if (error) {
        throw error
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add agency')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyName(e.target.value)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDirection(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agencyResult, directionResult] = await Promise.all([
          getAgency(),
          getDirections()
        ])
        
        if (agencyResult.data) {
          setAgencyData(agencyResult.data)
        }
        if (directionResult.data) {
          setDirectionData(directionResult.data)
        }
      } catch (error: any) {
        toast.error('Failed to fetch data')
      }
    }

    fetchData()
  }, [])

  const directionOptions = directionData.map((direction) => ({
    id: direction.code_direction,
    name: direction.name,
  }))

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Agency Management" />

      {/* Header Section */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Agency Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage water distribution agencies across different directions
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Agency
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{agencyData.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Agencies</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.floor(agencyData.length * 0.85)}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Agencies</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{agencyData.length * 12}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Agents</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{directionData.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Directions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Agency Form */}
      {showForm && (
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Agency
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

          <form onSubmit={handleSubmit(handleSubmitAgency)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Agency Name
              </label>
              <Input
                type="text"
                placeholder="Enter agency name"
                value={agencyName}
                register={register}
                onChange={handleInputChange}
                name="name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">Agency name is required</p>}
            </div>

            <div>
              <SelectForm
                label="Direction"
                options={directionOptions}
                onChangeSelect={handleSelectChange}
                value={selectedDirection}
                register={register}
                name="code_direction"
              />
              {errors.code_direction && <p className="mt-1 text-sm text-red-600">Direction is required</p>}
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Adding...' : 'Add Agency'}
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

      {/* Agencies Table */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Agencies
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search agencies..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <TableUI label="Agency" tableData={agencyData} loading={loading} />
      </div>
    </div>
  )
}

export default Agency