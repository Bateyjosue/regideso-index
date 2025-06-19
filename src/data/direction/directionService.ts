import { supabase } from '../../lib/supabase'

// Helper function to generate UUID
const generateId = () => 'id-' + Math.random().toString(36).substr(2, 9)

export const getDirections = async () => {
  try {
    const { data, error } = await supabase
      .from('Direction')
      .select('*')
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching directions:', error)
    
    // Fallback to mock data if Supabase fails
    return { 
      data: [
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
      ], 
      error: null 
    }
  }
}

export const getAgency = async () => {
  try {
    const { data, error } = await supabase
      .from('Agency')
      .select('*')
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching agencies:', error)
    
    // Fallback to mock data
    return { 
      data: [
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
      ], 
      error: null 
    }
  }
}

export const getAvenue = async () => {
  try {
    const { data, error } = await supabase
      .from('Avenue')
      .select('*')
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching avenues:', error)
    
    // Fallback to mock data
    return { 
      data: [
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
      ], 
      error: null 
    }
  }
}

export const addDirection = async (name: string) => {
  try {
    const newDirection = {
      name: name,
    }
    
    const { data, error } = await supabase
      .from('Direction')
      .insert([newDirection])
      .select()
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error adding direction:', error)
    
    // Fallback to mock data
    const mockNewDirection = {
      code_direction: generateId(),
      name: name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return { data: [mockNewDirection], error: null }
  }
}

export const addAgency = async (agencydata: IAgency) => {
  try {
    const newAgency = {
      name: agencydata.name,
      code_direction: agencydata.code_direction
    }
    
    const { data, error } = await supabase
      .from('Agency')
      .insert([newAgency])
      .select()
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error adding agency:', error)
    
    // Fallback to mock data
    const mockNewAgency = {
      code_agency: generateId(),
      name: agencydata.name,
      code_direction: agencydata.code_direction,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return { data: [mockNewAgency], error: null }
  }
}

export const addAvenue = async (avenueData: IAvenue) => {
  try {
    const newAvenue = {
      name: avenueData.name,
      code_agency: avenueData.code_agency
    }
    
    const { data, error } = await supabase
      .from('Avenue')
      .insert([newAvenue])
      .select()
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error adding avenue:', error)
    
    // Fallback to mock data
    const mockNewAvenue = {
      code_avenue: generateId(),
      name: avenueData.name,
      code_agency: avenueData.code_agency,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return { data: [mockNewAvenue], error: null }
  }
}

interface IAgency {
  name: string | null
  code_direction: string
}

interface IAvenue {
  name: string | null
  code_agency: string
}