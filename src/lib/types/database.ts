// lib/types/database.ts

/**
 * Interface que representa a estrutura da tabela 'contas_pagar'.
 * Cada propriedade corresponde a uma coluna na tabela do Supabase.
 */
export interface ContaPagar {
    id: number;
    created_at: string;
    nome: string | null;
    status: 'Pendente' | 'Pago' | 'Atrasado' | null;
    valor: number | null;
    data: string | null; // Formato YYYY-MM-DD
    user_id: string | null;
}

// js,
// jsx, --> html

// ts,
// tsx, --> html