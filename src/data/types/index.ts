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

export interface ITableProps {
  id?: string,
  code_direction?: string,
  code_agency?: string,
  code_avenue?: string,
  name: string
  created_at?: Date | string,
  createdAt?: Date | string,
  updatedAt?: Date | string,
}

export interface IDirection {
  code_direction: string,
  name: string
  createdAt: Date | string,
  updatedAt: Date | string
}

export interface IAvenue {
  code_agency: string,
  name: string
  createdAt: Date | string,
  updatedAt: Date | string
}