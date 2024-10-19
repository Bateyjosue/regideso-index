import supabase from "../data/supabase.d"

const useGetAgent = async (code_user: string | undefined) => {
  try {
    
  const { data: agent, error } = await supabase
    .from('Agent')
    .select(code_user)

    return {
      agent,
      error
    }
  } catch (error) {
    throw error
  }
}

export default useGetAgent;