// app/contas-a-pagar/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type ActionState = {
    message: string;
};

/**
 * Cria uma nova conta a pagar no banco de dados.
 */
export async function createAccount(prevState: ActionState, formData: FormData) {
    const supabase = await createClient();

    // A busca pelo usuário foi removida daqui.

    const nome = formData.get('nome') as string;
    const valor = formData.get('valor') as string;
    const data = formData.get('data') as string;
    const status = formData.get('status') as "Pendente" | "Pago" | "Atrasado";

    // O campo 'user_id' foi removido do objeto de inserção.
    const { error } = await supabase.from('contas_receber').insert({
        nome,
        valor: parseFloat(valor),
        data,
        status,
    });

    if (error) {
        console.error('Erro ao criar conta:', error);
        return { message: 'Erro de banco de dados: Não foi possível criar a conta.' };
    }

    revalidatePath('/contas-a-receber');
    return { message: 'success' };
}

/**
 * Atualiza uma conta a receber existente.
 */
export async function updateAccount(prevState: ActionState, formData: FormData) {
    const supabase = await createClient();

    const id = formData.get('id') as string;
    const nome = formData.get('nome') as string;
    const valor = formData.get('valor') as string;
    const data = formData.get('data') as string;
    const status = formData.get('status') as "Pendente" | "Pago" | "Atrasado";

    const { error } = await supabase
        .from('contas_receber')
        .update({
            nome,
            valor: parseFloat(valor),
            data,
            status,
        })
        .eq('id', parseInt(id));

    if (error) {
        console.error('Erro ao atualizar conta:', error);
        return { message: 'Erro de banco de dados: Não foi possível atualizar a conta.' };
    }

    revalidatePath('/contas-a-receber');
    return { message: 'success' };
}

/**
 * Exclui uma conta a receber do banco de dados.
 */
export async function deleteAccount(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('contas_receber')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao excluir conta:', error);
        return { error: 'Erro de banco de dados: Não foi possível excluir a conta.' };
    }

    revalidatePath('/contas-a-receber');
    return { success: true };
}

/**
 * Listando os dados
 */
export async function listAccounts() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('contas_receber')
        .select('*')
        .order('data', { ascending: true });

    if (error) {
        console.error('Erro ao listar contas:', error);
        return [];
    }

    return data;
}
