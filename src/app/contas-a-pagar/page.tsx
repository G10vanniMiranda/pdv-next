// app/contas-a-pagar/page.tsx

import { createClient } from '@/lib/supabase/server';
import { DataTable } from './data-table';
import { AddAccountButton } from './add-account-button';

export const revalidate = 60;

export default async function ContasAPagarPage() {
    // CORREÇÃO: Adicionado 'await' para esperar a Promise do cliente Supabase.
    const supabase = await createClient();

    // Busca os dados da tabela, ordenando pela data mais recente
    const { data: contas, error } = await supabase
        .from('contas_pagar')
        .select('*')
        .order('data', { ascending: false });

    if (error) {
        console.error('Erro ao buscar contas:', error);
        return <p className="p-4 text-red-500">Erro ao carregar os dados.</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Contas a Pagar</h1>
                <AddAccountButton />
            </div>
            <DataTable data={contas ?? []} />
        </div>
    );
}
