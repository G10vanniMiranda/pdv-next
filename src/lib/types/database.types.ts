// lib/types/database.types.ts

// Este é o tipo principal que descreve todo o seu banco de dados
export type Database = {
    public: {
        Tables: {
            contas_pagar: {
                Row: {
                    id: number
                    created_at: string
                    nome: string | null
                    status: "Pendente" | "Pago" | "Atrasado" | null
                    valor: number | null
                    data: string | null
                    user_id: string | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    nome: string | null
                    status: "Pendente" | "Pago" | "Atrasado" | null
                    valor: number | null
                    data: string | null
                    user_id: string | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    nome?: string | null
                    status?: "Pendente" | "Pago" | "Atrasado" | null
                    valor?: number | null
                    data?: string | null
                    user_id?: string | null
                }
            },
            categoria: {
                Row: {
                    id: number
                    created_at: string
                    nome: string | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    nome: string | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    nome?: string | null
                }
            },
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

// Para facilitar, exportamos o tipo específico da linha da tabela
export type ContaPagar = Database['public']['Tables']['contas_pagar']['Row'];
export type Categoria = Database['public']['Tables']['categoria']['Row'];
