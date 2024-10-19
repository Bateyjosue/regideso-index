import { useState } from "react";
import supabase from "../supabase.d";
import { PostgrestError } from "@supabase/supabase-js";

export const getAgent = async (code_user: string | undefined) => {
  try {
    const { data: agent, error } = await supabase
      .from('Agent')
      .select('*')
      .eq('code_user', `${code_user}`)

    return {
      agent,
      error,
    }
  } catch (error: PostgrestError | unknown) {
    throw error
  }
}


export const getAgentLevel = async(id: string) => {
  try {
    const { data: level, error } = await supabase
      .from('Level')
      .select('*')
      .eq('id', `${id}`)
    
    return {
      level,
      error,
    }
  } catch (error: PostgrestError | unknown) {
    throw error
  }
}
