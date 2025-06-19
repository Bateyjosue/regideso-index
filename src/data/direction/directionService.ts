import { supabase } from "../../lib/supabase"

export const getDirections = async () => { 
    const { data, error } = await supabase.from('Direction').select('*')
    return { data, error }
}

export const getAgency = async () => { 
    const { data, error } = await supabase.from('Agency').select('*')
    return { data, error }
}

export const getAvenue = async () => { 
    const { data, error } = await supabase.from('Avenue').select('*')
    return { data, error }
}

export const addDirection = async (name: string) => {
  const { data, error } = await supabase.from('Direction').upsert({
    'name': name
  }).select('*')
  return { data, error }
}

export const addAgency = async (agencydata: IAgency) => {
    const { data, error } = await supabase
      .from('Agency')
      .insert({
        name: agencydata.name,
        code_direction: agencydata.code_direction
      }).select();

    return { data, error };
}

export const addAvenue = async (avenueData: IAvenue) => {
    const { data, error } = await supabase
      .from('Avenue')
      .insert({
        name: avenueData.name,
        code_agency: avenueData.code_agency
      }).select();

    return { data, error };
}

interface IAgency {
  name: string | null
  code_direction: string
}

interface IAvenue {
  name: string | null
  code_agency: string
}