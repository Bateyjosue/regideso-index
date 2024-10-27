import supabase from "../supabase.d"

export const addDirection = async (name: string) => {
  const { data, error } = await supabase.from('Direction').upsert({
    'name': name
  }).select('*')
  return { data, error }
}

export const getDirections = async () => { 
    const { data, error } = await supabase.from('Direction').select('*')
    return { data, error }
}