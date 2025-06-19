import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Breadcrumb from "../../ui/Breadcrumb"
import Input from "../../forms/Input"
import SelectForm from "../../forms/SelectForm"
import toast from "react-hot-toast"

interface ISubscriberInput {
  first_name: string
  last_name: string
  sur_name: string
  telephone: string
  code_avenue: string
  code_level: string
  code_category: string
}

interface ILevelInput {
  name: string
  description: string
  priority: number
}

interface ICategoryInput {
  name: string
  description: string
  tariffRate: number
  connectionFee: number
}

interface ISubscriber {
  id: string
  first_name: string
  last_name: string
  sur_name: string
  telephone: string
  avenue: string
  level: string
  category: string
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
}

interface ILevel {
  id: string
  name: string
  description: string
  priority: number
  subscriberCount: number
  createdAt: string
}

interface ICategory {
  id: string
  name: string
  description: string
  tariffRate: number
  connectionFee: number
  subscriberCount: number
  totalRevenue: number
  createdAt: string
}

const Subscriber: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subscriber' | 'level' | 'category'>('subscriber');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Subscriber state
  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [subscriberForm, setSubscriberForm] = useState({
    first_name: '',
    last_name: '',
    sur_name: '',
    telephone: '',
    code_avenue: '',
    code_level: '',
    code_category: ''
  });

  // Level state
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [levelForm, setLevelForm] = useState({
    name: '',
    description: '',
    priority: 1
  });

  // Category state
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    tariffRate: 0,
    connectionFee: 0
  });

  const { register: registerSubscriber, handleSubmit: submitSubscriber, formState: { errors: errorsSubscriber }, reset: resetSubscriber } = useForm<ISubscriberInput>();
  const { register: registerLevel, handleSubmit: submitLevel, formState: { errors: errorsLevel }, reset: resetLevel } = useForm<ILevelInput>();
  const { register: registerCategory, handleSubmit: submitCategory, formState: { errors: errorsCategory }, reset: resetCategory } = useForm<ICategoryInput>();

  // Mock data initialization
  useEffect(() => {
    const mockSubscribers: ISubscriber[] = [
      {
        id: '1',
        first_name: 'Marie',
        last_name: 'Uwimana',
        sur_name: 'Claire',
        telephone: '+250788123456',
        avenue: 'Avenue de la Paix',
        level: 'Premium',
        category: 'Domestic Premium',
        status: 'active',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        first_name: 'Jean',
        last_name: 'Nkurunziza',
        sur_name: 'Baptiste',
        telephone: '+250788654321',
        avenue: 'Avenue Nyamirambo',
        level: 'Standard',
        category: 'Domestic Basic',
        status: 'active',
        createdAt: '2024-01-16'
      }
    ];

    const mockLevels: ILevel[] = [
      {
        id: '1',
        name: 'Standard',
        description: 'Basic water service level',
        priority: 1,
        subscriberCount: 1200,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Premium',
        description: 'Enhanced water service with priority support',
        priority: 2,
        subscriberCount: 800,
        createdAt: '2024-01-10'
      },
      {
        id: '3',
        name: 'VIP',
        description: 'Highest priority service level',
        priority: 3,
        subscriberCount: 150,
        createdAt: '2024-01-05'
      }
    ];

    const mockCategories: ICategory[] = [
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
        name: 'Commercial',
        description: 'Business and commercial establishments',
        tariffRate: 850,
        connectionFee: 50000,
        subscriberCount: 420,
        totalRevenue: 357000,
        createdAt: '2024-01-10'
      }
    ];

    setSubscribers(mockSubscribers);
    setLevels(mockLevels);
    setCategories(mockCategories);
  }, []);

  const handleSubmitSubscriber: SubmitHandler<ISubscriberInput> = async (data) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSubscriber: ISubscriber = {
        id: Date.now().toString(),
        first_name: data.first_name,
        last_name: data.last_name,
        sur_name: data.sur_name,
        telephone: data.telephone,
        avenue: 'Avenue de la Paix', // Mock avenue
        level: levels.find(l => l.id === data.code_level)?.name || '',
        category: categories.find(c => c.id === data.code_category)?.name || '',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setSubscribers(prev => [...prev, newSubscriber]);
      setSubscriberForm({
        first_name: '',
        last_name: '',
        sur_name: '',
        telephone: '',
        code_avenue: '',
        code_level: '',
        code_category: ''
      });
      setShowForm(false);
      resetSubscriber();
      toast.success('Subscriber added successfully!');
    } catch (error: any) {
      toast.error('Failed to add subscriber');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLevel: SubmitHandler<ILevelInput> = async (data) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLevel: ILevel = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        priority: data.priority,
        subscriberCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setLevels(prev => [...prev, newLevel]);
      setLevelForm({ name: '', description: '', priority: 1 });
      setShowForm(false);
      resetLevel();
      toast.success('Subscriber level created successfully!');
    } catch (error: any) {
      toast.error('Failed to create subscriber level');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCategory: SubmitHandler<ICategoryInput> = async (data) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCategory: ICategory = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        tariffRate: data.tariffRate,
        connectionFee: data.connectionFee,
        subscriberCount: 0,
        totalRevenue: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setCategories(prev => [...prev, newCategory]);
      setCategoryForm({ name: '', description: '', tariffRate: 0, connectionFee: 0 });
      setShowForm(false);
      resetCategory();
      toast.success('Subscriber category created successfully!');
    } catch (error: any) {
      toast.error('Failed to create subscriber category');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'subscriber':
        return (
          <div className="space-y-6">
            {/* Subscriber Form */}
            {showForm && (
              <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New Subscriber
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

                <form onSubmit={submitSubscriber(handleSubmitSubscriber)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter first name"
                      value={subscriberForm.first_name}
                      register={registerSubscriber}
                      onChange={(e) => setSubscriberForm(prev => ({ ...prev, first_name: e.target.value }))}
                      name="first_name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsSubscriber.first_name && <p className="mt-1 text-sm text-red-600">First name is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter last name"
                      value={subscriberForm.last_name}
                      register={registerSubscriber}
                      onChange={(e) => setSubscriberForm(prev => ({ ...prev, last_name: e.target.value }))}
                      name="last_name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsSubscriber.last_name && <p className="mt-1 text-sm text-red-600">Last name is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Surname
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter surname"
                      value={subscriberForm.sur_name}
                      register={registerSubscriber}
                      onChange={(e) => setSubscriberForm(prev => ({ ...prev, sur_name: e.target.value }))}
                      name="sur_name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsSubscriber.sur_name && <p className="mt-1 text-sm text-red-600">Surname is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telephone
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter telephone number"
                      value={subscriberForm.telephone}
                      register={registerSubscriber}
                      onChange={(e) => setSubscriberForm(prev => ({ ...prev, telephone: e.target.value }))}
                      name="telephone"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsSubscriber.telephone && <p className="mt-1 text-sm text-red-600">Telephone is required</p>}
                  </div>

                  <div>
                    <SelectForm
                      label="Level"
                      options={levels.map(l => ({ id: l.id, name: l.name }))}
                      onChangeSelect={(e) => setSubscriberForm(prev => ({ ...prev, code_level: e.target.value }))}
                      value={subscriberForm.code_level}
                      register={registerSubscriber}
                      name="code_level"
                    />
                    {errorsSubscriber.code_level && <p className="mt-1 text-sm text-red-600">Level is required</p>}
                  </div>

                  <div>
                    <SelectForm
                      label="Category"
                      options={categories.map(c => ({ id: c.id, name: c.name }))}
                      onChangeSelect={(e) => setSubscriberForm(prev => ({ ...prev, code_category: e.target.value }))}
                      value={subscriberForm.code_category}
                      register={registerSubscriber}
                      name="code_category"
                    />
                    {errorsSubscriber.code_category && <p className="mt-1 text-sm text-red-600">Category is required</p>}
                  </div>

                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Adding...' : 'Add Subscriber'}
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

            {/* Subscribers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {subscriber.first_name.charAt(0)}{subscriber.last_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {subscriber.first_name} {subscriber.last_name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(subscriber.status)}`}>
                        {subscriber.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Level:</span>
                      <span className="text-gray-900 dark:text-white">{subscriber.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Category:</span>
                      <span className="text-gray-900 dark:text-white">{subscriber.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Avenue:</span>
                      <span className="text-gray-900 dark:text-white">{subscriber.avenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                      <span className="text-gray-900 dark:text-white">{subscriber.telephone}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Added: {new Date(subscriber.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'level':
        return (
          <div className="space-y-6">
            {/* Level Form */}
            {showForm && (
              <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create New Subscriber Level
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

                <form onSubmit={submitLevel(handleSubmitLevel)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Level Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter level name"
                        value={levelForm.name}
                        register={registerLevel}
                        onChange={(e) => setLevelForm(prev => ({ ...prev, name: e.target.value }))}
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsLevel.name && <p className="mt-1 text-sm text-red-600">Level name is required</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority Level
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter priority (1-5)"
                        value={levelForm.priority.toString()}
                        register={registerLevel}
                        onChange={(e) => setLevelForm(prev => ({ ...prev, priority: Number(e.target.value) }))}
                        name="priority"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsLevel.priority && <p className="mt-1 text-sm text-red-600">Priority is required</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter level description"
                      value={levelForm.description}
                      register={registerLevel}
                      onChange={(e) => setLevelForm(prev => ({ ...prev, description: e.target.value }))}
                      name="description"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsLevel.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <div key={level.id} className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {level.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded-full">
                        Priority {level.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {level.description}
                  </p>

                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {level.subscriberCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Subscribers
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Created: {new Date(level.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'category':
        return (
          <div className="space-y-6">
            {/* Category Form */}
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

                <form onSubmit={submitCategory(handleSubmitCategory)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter category name"
                        value={categoryForm.name}
                        register={registerCategory}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsCategory.name && <p className="mt-1 text-sm text-red-600">Category name is required</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter category description"
                        value={categoryForm.description}
                        register={registerCategory}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                        name="description"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsCategory.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tariff Rate (RWF per m³)
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter tariff rate"
                        value={categoryForm.tariffRate.toString()}
                        register={registerCategory}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, tariffRate: Number(e.target.value) }))}
                        name="tariffRate"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsCategory.tariffRate && <p className="mt-1 text-sm text-red-600">Tariff rate is required</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Connection Fee (RWF)
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter connection fee"
                        value={categoryForm.connectionFee.toString()}
                        register={registerCategory}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, connectionFee: Number(e.target.value) }))}
                        name="connectionFee"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsCategory.connectionFee && <p className="mt-1 text-sm text-red-600">Connection fee is required</p>}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
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

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(category.tariffRate)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        per m³
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(category.connectionFee)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Connection
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {category.subscriberCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Subscribers
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(category.totalRevenue)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Revenue
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Created: {new Date(category.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Subscriber Management" />

      {/* Header Section */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Subscriber Management System
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage subscribers, their service levels, and billing categories
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{subscribers.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Subscribers</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{levels.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Service Levels</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Billing Categories</p>
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
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'subscriber', label: 'Subscribers', icon: '👥' },
              { key: 'level', label: 'Service Levels', icon: '⭐' },
              { key: 'category', label: 'Billing Categories', icon: '💰' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setShowForm(false);
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
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

export default Subscriber;