// Mock data for directions, agencies, and avenues
const mockDirections = [
  {
    code_direction: 'dir-001',
    name: 'Direction Technique',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    code_direction: 'dir-002', 
    name: 'Direction Commerciale',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    code_direction: 'dir-003',
    name: 'Direction Administrative',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  }
]

const mockAgencies = [
  {
    code_agency: 'ag-001',
    name: 'Agence Kigali',
    code_direction: 'dir-001',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  },
  {
    code_agency: 'ag-002',
    name: 'Agence Butare',
    code_direction: 'dir-001',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z'
  },
  {
    code_agency: 'ag-003',
    name: 'Agence Gitarama',
    code_direction: 'dir-002',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
]

const mockAvenues = [
  {
    code_avenue: 'av-001',
    name: 'Avenue de la Paix',
    code_agency: 'ag-001',
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z'
  },
  {
    code_avenue: 'av-002',
    name: 'Avenue Nyamirambo',
    code_agency: 'ag-001',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z'
  },
  {
    code_avenue: 'av-003',
    name: 'Avenue Kimisagara',
    code_agency: 'ag-002',
    createdAt: '2024-01-23T10:00:00Z',
    updatedAt: '2024-01-23T10:00:00Z'
  }
]

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to generate UUID
const generateId = () => 'id-' + Math.random().toString(36).substr(2, 9)

export const getDirections = async () => {
  await delay(500) // Simulate network delay
  return { data: mockDirections, error: null }
}

export const getAgency = async () => {
  await delay(500)
  return { data: mockAgencies, error: null }
}

export const getAvenue = async () => {
  await delay(500)
  return { data: mockAvenues, error: null }
}

export const addDirection = async (name: string) => {
  await delay(500)
  
  const newDirection = {
    code_direction: generateId(),
    name: name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  mockDirections.push(newDirection)
  return { data: [newDirection], error: null }
}

export const addAgency = async (agencydata: IAgency) => {
  await delay(500)
  
  const newAgency = {
    code_agency: generateId(),
    name: agencydata.name,
    code_direction: agencydata.code_direction,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  mockAgencies.push(newAgency)
  return { data: [newAgency], error: null }
}

export const addAvenue = async (avenueData: IAvenue) => {
  await delay(500)
  
  const newAvenue = {
    code_avenue: generateId(),
    name: avenueData.name,
    code_agency: avenueData.code_agency,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  mockAvenues.push(newAvenue)
  return { data: [newAvenue], error: null }
}

interface IAgency {
  name: string | null
  code_direction: string
}

interface IAvenue {
  name: string | null
  code_agency: string
}