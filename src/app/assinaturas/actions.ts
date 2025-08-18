// app/assinaturas-a-pagar/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type ActionState = {
    message: string;
};

/**
 * Cria uma nova assinatura a pagar no banco de dados.
 */
export async function createSignature(prevState: ActionState, formData: FormData) {
    const supabase = await createClient();

    // A busca pelo usuário foi removida daqui.

    const nome = formData.get('nome') as string;
    const descricao = formData.get('descricao') as string;
    const valor = formData.get('valor') as string;
    const status = formData.get('status') as "Grátis" | "Avião" | "Foguete";

    // O campo 'user_id' foi removido do objeto de inserção.
    const { error } = await supabase.from('assinatura').insert({
        nome,
        descricao,
        valor: parseFloat(valor),
        status,
    });

    if (error) {
        console.error('Erro ao criar Assinatura:', error);
        return { message: 'Erro de banco de dados: Não foi possível criar a Assinatura.' };
    }

    revalidatePath('/assinaturas');
    return { message: 'success' };
}

/**
 * Atualiza uma assinatura a pagar existente.
 */
export async function updateSignature(prevState: ActionState, formData: FormData) {
    const supabase = await createClient();

    const id = formData.get('id') as string; const nome = formData.get('nome') as string;
    const descricao = formData.get('nome') as string;
    const valor = formData.get('valor') as string;
    const status = formData.get('status') as "Grátis" | "Avião" | "Foguete";

    const { error } = await supabase
        .from('assinatura')
        .update({
            nome,
            descricao,
            valor: parseFloat(valor),
            status,
        })
        .eq('id', parseInt(id));

    if (error) {
        console.error('Erro ao atualizar Assinatura:', error);
        return { message: 'Erro de banco de dados: Não foi possível atualizar a Assinatura.' };
    }

    revalidatePath('/assinaturas');
    return { message: 'success' };
}

/**
 * Exclui uma assinatura a pagar do banco de dados.
 */
export async function deleteSignature(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('assinatura')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao excluir Assinatura:', error);
        return { error: 'Erro de banco de dados: Não foi possível excluir a Assinatura.' };
    }

    revalidatePath('/assinaturas');
    return { success: true };
}

/**
 * Listando os dados
 */
export async function listSignatures() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('assinatura')
        .select('*')
        .order('nome', { ascending: true });

    if (error) {
        console.error('Erro ao listar Assinaturas:', error);
        return [];
    }

    return data;
}
