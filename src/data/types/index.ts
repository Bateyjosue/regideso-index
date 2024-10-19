
export interface IAgent {
  code_agency: number | null
  code_category: number | null
  code_level: string | null
  code_user: string | null
  created_at: string
  firstname: string | null
  id: string
  lastname: string | null
  matricule_agent: string | null
  surname: string | null
  telephone: string | null
}

export interface ILevel {
  created_at: string
  id: string
  name: string | null
}

export interface IProfile{
  fullName: string;
  role: string;
}