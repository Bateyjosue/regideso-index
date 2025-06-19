export interface Database {
  public: {
    Tables: {
      User: {
        Row: {
          id: string
          name: string | null
          email: string
          password_hash: string
          role: 'USER' | 'ADMIN' | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name?: string | null
          email: string
          password_hash: string
          role?: 'USER' | 'ADMIN' | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          password_hash?: string
          role?: 'USER' | 'ADMIN' | null
          createdAt?: string
          updatedAt?: string
        }
      }
      Direction: {
        Row: {
          code_direction: string
          name: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          code_direction?: string
          name: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          code_direction?: string
          name?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      Agency: {
        Row: {
          code_agency: string
          name: string
          code_direction: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          code_agency?: string
          name: string
          code_direction: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          code_agency?: string
          name?: string
          code_direction?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      Avenue: {
        Row: {
          code_avenue: string
          name: string
          code_agency: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          code_avenue?: string
          name: string
          code_agency: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          code_avenue?: string
          name?: string
          code_agency?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      Agent: {
        Row: {
          code_agent: string
          matricule_agent: string
          first_name: string
          last_name: string
          sur_name: string
          telephone: string
          code_agency: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          code_agent?: string
          matricule_agent: string
          first_name: string
          last_name: string
          sur_name: string
          telephone: string
          code_agency: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          code_agent?: string
          matricule_agent?: string
          first_name?: string
          last_name?: string
          sur_name?: string
          telephone?: string
          code_agency?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      Level: {
        Row: {
          code_level: string
          name: string
          code_agent: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          code_level?: string
          name: string
          code_agent: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          code_level?: string
          name?: string
          code_agent?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      Category: {
        Row: {
          code_category: string
          name: string
          code_agent: string
          code_subscriber: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          code_category?: string
          name: string
          code_agent: string
          code_subscriber: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          code_category?: string
          name?: string
          code_agent?: string
          code_subscriber?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      Subscriber: {
        Row: {
          code_subscriber: string
          first_name: string
          last_name: string
          sur_name: string
          telephone: string
          code_avenue: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          code_subscriber?: string
          first_name: string
          last_name: string
          sur_name: string
          telephone: string
          code_avenue: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          code_subscriber?: string
          first_name?: string
          last_name?: string
          sur_name?: string
          telephone?: string
          code_avenue?: string
          createdAt?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Role: 'USER' | 'ADMIN'
    }
  }
}