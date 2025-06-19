import { SubmitHandler, useForm } from "react-hook-form";
import SelectForm from "../forms/SelectForm";
import Breadcrumb from "./Breadcrumb";
import TableUI from "./Table";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "../forms/Input";
import { addAgency, addAvenue, addDirection, getAgency, getAvenue, getDirections } from "../../data/direction/directionService";
import { IAvenue, IDirection } from '../../data/types/';
import toast from "react-hot-toast";

interface IDirectionInput {
  name: string;
}

interface IAgencyInput {
  name: string;
  code_direction: string;
}

interface IAvenueInput {
  name: string;
  code_agency: string;
}

const Direction = () => {
  const [activeTab, setActiveTab] = useState<'direction' | 'agency' | 'avenue'>('direction');
  const [directionName, setDirectionName] = useState<string>('');
  const [agencyName, setAgencyName] = useState<string>('');
  const [agencySelect, setAgencySelect] = useState<string>('');
  const [avenueName, setAvenueName] = useState<string>('');
  const [avenueSelect, setAvenueSelect] = useState<string>('');
  const [directionData, setDirectionData] = useState<IDirection[]>([]);
  const [agencyData, setAgencyData] = useState<IAvenue[]>([]);
  const [avenueData, setAvenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IDirectionInput>();
  const { register: registerAgency, handleSubmit: submitAgency, formState: { errors: errorsAgency }, reset: resetAgency } = useForm<IAgencyInput>();
  const { register: registerAvenue, handleSubmit: submitAvenue, formState: { errors: errorsAvenue }, reset: resetAvenue } = useForm<IAvenueInput>();

  const handleSubmitDirection: SubmitHandler<IDirectionInput> = async (directionData) => {
    try {
      setLoading(true);
      const { data, error } = await addDirection(directionData.name);
      
      if (data) {
        setDirectionData(prev => [...prev, ...data]);
        setDirectionName('');
        setShowForm(false);
        reset();
        toast.success('Direction added successfully');
      }

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add direction');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAgency: SubmitHandler<IAgencyInput> = async (agencyData) => {
    try {
      setLoading(true);
      const { data, error } = await addAgency(agencyData);
      
      if (data) {
        setAgencyData(prev => [...prev, ...data]);
        setAgencyName('');
        setAgencySelect('');
        setShowForm(false);
        resetAgency();
        toast.success('Agency added successfully');
      }

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add agency');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAvenue: SubmitHandler<IAvenueInput> = async (avenueData) => {
    try {
      setLoading(true);
      const { data, error } = await addAvenue(avenueData);
      
      if (data) {
        setAvenueData(prev => [...prev, ...data]);
        setAvenueName('');
        setAvenueSelect('');
        setShowForm(false);
        resetAvenue();
        toast.success('Avenue added successfully');
      }

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add avenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const [directionsResult, agenciesResult, avenuesResult] = await Promise.all([
          getDirections(),
          getAgency(),
          getAvenue()
        ]);
        
        if (directionsResult.data) setDirectionData(directionsResult.data);
        if (agenciesResult.data) setAgencyData(agenciesResult.data);
        if (avenuesResult.data) setAvenueData(avenuesResult.data);
      } catch (error: any) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const directionOptions = directionData.map((direction) => ({ 
    id: direction.code_direction,
    name: direction.name,
  }));

  const agencyOptions = agencyData.map((agency) => ({
    id: agency.code_agency,
    name: agency.name
  }));

  const getTabContent = () => {
    switch (activeTab) {
      case 'direction':
        return (
          <div className="space-y-6">
            {/* Direction Form */}
            {showForm && (
              <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New Direction
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

                <form onSubmit={handleSubmit(handleSubmitDirection)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Direction Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter direction name"
                      value={directionName}
                      register={register}
                      onChange={(e) => setDirectionName(e.target.value)}
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">Direction name is required</p>}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Adding...' : 'Add Direction'}
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

            {/* Directions Table */}
            <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  All Directions
                </h2>
              </div>
              <TableUI label="Direction" tableData={directionData} loading={loading} />
            </div>
          </div>
        );

      case 'agency':
        return (
          <div className="space-y-6">
            {/* Agency Form */}
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

                <form onSubmit={submitAgency(handleSubmitAgency)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Agency Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter agency name"
                      value={agencyName}
                      register={registerAgency}
                      onChange={(e) => setAgencyName(e.target.value)}
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsAgency.name && <p className="mt-1 text-sm text-red-600">Agency name is required</p>}
                  </div>

                  <div>
                    <SelectForm
                      label="Direction"
                      options={directionOptions}
                      onChangeSelect={(e) => setAgencySelect(e.target.value)}
                      value={agencySelect}
                      register={registerAgency}
                      name="code_direction"
                    />
                    {errorsAgency.code_direction && <p className="mt-1 text-sm text-red-600">Direction is required</p>}
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  All Agencies
                </h2>
              </div>
              <TableUI label="Agency" tableData={agencyData} loading={loading} />
            </div>
          </div>
        );

      case 'avenue':
        return (
          <div className="space-y-6">
            {/* Avenue Form */}
            {showForm && (
              <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New Avenue
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

                <form onSubmit={submitAvenue(handleSubmitAvenue)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Avenue Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter avenue name"
                      value={avenueName}
                      register={registerAvenue}
                      onChange={(e) => setAvenueName(e.target.value)}
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsAvenue.name && <p className="mt-1 text-sm text-red-600">Avenue name is required</p>}
                  </div>

                  <div>
                    <SelectForm
                      label="Agency"
                      options={agencyOptions}
                      onChangeSelect={(e) => setAvenueSelect(e.target.value)}
                      value={avenueSelect}
                      register={registerAvenue}
                      name="code_agency"
                    />
                    {errorsAvenue.code_agency && <p className="mt-1 text-sm text-red-600">Agency is required</p>}
                  </div>

                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Adding...' : 'Add Avenue'}
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

            {/* Avenues Table */}
            <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  All Avenues
                </h2>
              </div>
              <TableUI label="Avenue" tableData={avenueData} loading={loading} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Direction Management" />

      {/* Header Section */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Direction Management System
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage directions, agencies, and avenues in the water distribution network
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{directionData.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Directions</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{avenueData.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Avenues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'direction', label: 'Directions', icon: '🏢' },
              { key: 'agency', label: 'Agencies', icon: '🏛️' },
              { key: 'avenue', label: 'Avenues', icon: '🛣️' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setShowForm(false);
                }}
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

        <div className="p-6">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Direction;