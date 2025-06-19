import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Breadcrumb from "../../ui/Breadcrumb"
import Input from "../../forms/Input"
import SelectForm from "../../forms/SelectForm"
import toast from "react-hot-toast"

interface IAgentInput {
  matricule_agent: string
  first_name: string
  last_name: string
  sur_name: string
  telephone: string
  code_agency: string
  code_level: string
  code_category: string
}

interface ILevelInput {
  name: string
  description: string
  permissions: string[]
}

interface ICategoryInput {
  name: string
  description: string
  color: string
}

interface IAgent {
  id: string
  matricule_agent: string
  first_name: string
  last_name: string
  sur_name: string
  telephone: string
  code_agency: string
  level: string
  category: string
  createdAt: string
}

interface ILevel {
  id: string
  name: string
  description: string
  permissions: string[]
  agentCount: number
  createdAt: string
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

const Agent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agent' | 'level' | 'category'>('agent');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Agent state
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [agentForm, setAgentForm] = useState({
    matricule_agent: '',
    first_name: '',
    last_name: '',
    sur_name: '',
    telephone: '',
    code_agency: '',
    code_level: '',
    code_category: ''
  });

  // Level state
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [levelForm, setLevelForm] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  // Category state
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  const { register: registerAgent, handleSubmit: submitAgent, formState: { errors: errorsAgent }, reset: resetAgent } = useForm<IAgentInput>();
  const { register: registerLevel, handleSubmit: submitLevel, formState: { errors: errorsLevel }, reset: resetLevel } = useForm<ILevelInput>();
  const { register: registerCategory, handleSubmit: submitCategory, formState: { errors: errorsCategory }, reset: resetCategory } = useForm<ICategoryInput>();

  const availablePermissions = [
    { id: 'read_meters', name: 'Read Water Meters', description: 'Access to read and record meter readings' },
    { id: 'manage_subscribers', name: 'Manage Subscribers', description: 'Add, edit, and manage subscriber information' },
    { id: 'handle_complaints', name: 'Handle Complaints', description: 'Process and resolve customer complaints' },
    { id: 'emergency_response', name: 'Emergency Response', description: 'Respond to water emergencies and leaks' },
    { id: 'quality_testing', name: 'Quality Testing', description: 'Perform water quality tests and inspections' },
    { id: 'maintenance', name: 'Maintenance', description: 'Perform routine maintenance tasks' },
    { id: 'reporting', name: 'Generate Reports', description: 'Create and submit operational reports' },
    { id: 'supervisor', name: 'Supervisor Access', description: 'Supervise other agents and approve actions' }
  ];

  const colorOptions = [
    { value: '#3B82F6', name: 'Blue' },
    { value: '#10B981', name: 'Green' },
    { value: '#F59E0B', name: 'Yellow' },
    { value: '#EF4444', name: 'Red' },
    { value: '#8B5CF6', name: 'Purple' },
    { value: '#F97316', name: 'Orange' },
    { value: '#06B6D4', name: 'Cyan' },
    { value: '#84CC16', name: 'Lime' }
  ];

  // Mock data initialization
  useEffect(() => {
    const mockAgents: IAgent[] = [
      {
        id: '1',
        matricule_agent: 'AG001',
        first_name: 'Jean',
        last_name: 'Mukamana',
        sur_name: 'Marie',
        telephone: '+250788123456',
        code_agency: 'ag-001',
        level: 'Senior Agent',
        category: 'Field Operations',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        matricule_agent: 'AG002',
        first_name: 'Paul',
        last_name: 'Niyonzima',
        sur_name: 'Claude',
        telephone: '+250788654321',
        code_agency: 'ag-002',
        level: 'Field Agent',
        category: 'Maintenance',
        createdAt: '2024-01-16'
      }
    ];

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
      }
    ];

    const mockCategories: ICategory[] = [
      {
        id: '1',
        name: 'Field Operations',
        description: 'Field-based water service operations',
        color: '#3B82F6',
        agentCount: 35,
        subscriberCount: 2500,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Maintenance',
        description: 'Infrastructure maintenance and repairs',
        color: '#10B981',
        agentCount: 20,
        subscriberCount: 850,
        createdAt: '2024-01-10'
      }
    ];

    setAgents(mockAgents);
    setLevels(mockLevels);
    setCategories(mockCategories);
  }, []);

  const handleSubmitAgent: SubmitHandler<IAgentInput> = async (data) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAgent: IAgent = {
        id: Date.now().toString(),
        matricule_agent: data.matricule_agent,
        first_name: data.first_name,
        last_name: data.last_name,
        sur_name: data.sur_name,
        telephone: data.telephone,
        code_agency: data.code_agency,
        level: levels.find(l => l.id === data.code_level)?.name || '',
        category: categories.find(c => c.id === data.code_category)?.name || '',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setAgents(prev => [...prev, newAgent]);
      setAgentForm({
        matricule_agent: '',
        first_name: '',
        last_name: '',
        sur_name: '',
        telephone: '',
        code_agency: '',
        code_level: '',
        code_category: ''
      });
      setShowForm(false);
      resetAgent();
      toast.success('Agent added successfully!');
    } catch (error: any) {
      toast.error('Failed to add agent');
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
        permissions: levelForm.permissions,
        agentCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setLevels(prev => [...prev, newLevel]);
      setLevelForm({ name: '', description: '', permissions: [] });
      setShowForm(false);
      resetLevel();
      toast.success('Agent level created successfully!');
    } catch (error: any) {
      toast.error('Failed to create agent level');
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
        color: categoryForm.color,
        agentCount: 0,
        subscriberCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setCategories(prev => [...prev, newCategory]);
      setCategoryForm({ name: '', description: '', color: '#3B82F6' });
      setShowForm(false);
      resetCategory();
      toast.success('Agent category created successfully!');
    } catch (error: any) {
      toast.error('Failed to create agent category');
    } finally {
      setLoading(false);
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'agent':
        return (
          <div className="space-y-6">
            {/* Agent Form */}
            {showForm && (
              <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New Agent
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

                <form onSubmit={submitAgent(handleSubmitAgent)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Matricule
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter agent matricule"
                      value={agentForm.matricule_agent}
                      register={registerAgent}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, matricule_agent: e.target.value }))}
                      name="matricule_agent"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsAgent.matricule_agent && <p className="mt-1 text-sm text-red-600">Matricule is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter first name"
                      value={agentForm.first_name}
                      register={registerAgent}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, first_name: e.target.value }))}
                      name="first_name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsAgent.first_name && <p className="mt-1 text-sm text-red-600">First name is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter last name"
                      value={agentForm.last_name}
                      register={registerAgent}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, last_name: e.target.value }))}
                      name="last_name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsAgent.last_name && <p className="mt-1 text-sm text-red-600">Last name is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Surname
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter surname"
                      value={agentForm.sur_name}
                      register={registerAgent}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, sur_name: e.target.value }))}
                      name="sur_name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsAgent.sur_name && <p className="mt-1 text-sm text-red-600">Surname is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telephone
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter telephone number"
                      value={agentForm.telephone}
                      register={registerAgent}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, telephone: e.target.value }))}
                      name="telephone"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errorsAgent.telephone && <p className="mt-1 text-sm text-red-600">Telephone is required</p>}
                  </div>

                  <div>
                    <SelectForm
                      label="Level"
                      options={levels.map(l => ({ id: l.id, name: l.name }))}
                      onChangeSelect={(e) => setAgentForm(prev => ({ ...prev, code_level: e.target.value }))}
                      value={agentForm.code_level}
                      register={registerAgent}
                      name="code_level"
                    />
                    {errorsAgent.code_level && <p className="mt-1 text-sm text-red-600">Level is required</p>}
                  </div>

                  <div>
                    <SelectForm
                      label="Category"
                      options={categories.map(c => ({ id: c.id, name: c.name }))}
                      onChangeSelect={(e) => setAgentForm(prev => ({ ...prev, code_category: e.target.value }))}
                      value={agentForm.code_category}
                      register={registerAgent}
                      name="code_category"
                    />
                    {errorsAgent.code_category && <p className="mt-1 text-sm text-red-600">Category is required</p>}
                  </div>

                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Adding...' : 'Add Agent'}
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

            {/* Agents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {agent.first_name.charAt(0)}{agent.last_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {agent.first_name} {agent.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {agent.matricule_agent}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Level:</span>
                      <span className="text-gray-900 dark:text-white">{agent.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Category:</span>
                      <span className="text-gray-900 dark:text-white">{agent.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                      <span className="text-gray-900 dark:text-white">{agent.telephone}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Added: {new Date(agent.createdAt).toLocaleDateString()}
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsLevel.name && <p className="mt-1 text-sm text-red-600">Level name is required</p>}
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsLevel.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
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
                            levelForm.permissions.includes(permission.id)
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                          }`}
                          onClick={() => {
                            setLevelForm(prev => ({
                              ...prev,
                              permissions: prev.permissions.includes(permission.id)
                                ? prev.permissions.filter(p => p !== permission.id)
                                : [...prev.permissions, permission.id]
                            }));
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={levelForm.permissions.includes(permission.id)}
                              onChange={() => {}}
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
              {levels.map((level) => (
                <div key={level.id} className="border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-r-xl shadow-lg p-6">
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
        );

      case 'category':
        return (
          <div className="space-y-6">
            {/* Category Form */}
            {showForm && (
              <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create New Agent Category
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {errorsCategory.description && <p className="mt-1 text-sm text-red-600">Description is required</p>}
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
                          onClick={() => setCategoryForm(prev => ({ ...prev, color: color.value }))}
                          className={`w-12 h-12 rounded-lg border-2 transition-all ${
                            categoryForm.color === color.value
                              ? 'border-gray-900 dark:border-white scale-110'
                              : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          {categoryForm.color === color.value && (
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Agent Management" />

      {/* Header Section */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Agent Management System
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage agents, their levels, and categories in the water distribution network
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
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{agents.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Agents</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{levels.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Agent Levels</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Agent Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'agent', label: 'Agents', icon: '👤' },
              { key: 'level', label: 'Levels', icon: '📊' },
              { key: 'category', label: 'Categories', icon: '📋' }
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

export default Agent;