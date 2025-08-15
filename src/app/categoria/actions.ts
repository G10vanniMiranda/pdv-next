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
export async function createCategory(prevState: ActionState, formData: FormData) {
    const supabase = await createClient();

    // A busca pelo usuário foi removida daqui.
    const nome = formData.get('nome') as string;

    // O campo 'user_id' foi removido do objeto de inserção.
    const { error } = await supabase.from('categoria').insert({
        nome,
    });

    if (error) {
        console.error('Erro ao criar Categoria:', error);
        return { message: 'Erro de banco de dados: Não foi possível criar a Categoria.' };
    }

    revalidatePath('/categoria');
    return { message: 'success' };
}

/**
 * Atualiza uma conta a pagar existente.
 */
export async function updateCategory(prevState: ActionState, formData: FormData) {
    const supabase = await createClient();

    const id = formData.get('id') as string;
    const nome = formData.get('nome') as string;

    const { error } = await supabase
        .from('categoria')
        .update({
            nome,
        })
        .eq('id', parseInt(id));

    if (error) {
        console.error('Erro ao atualizar Categoria:', error);
        return { message: 'Erro de banco de dados: Não foi possível atualizar a categoria.' };
    }

    revalidatePath('/categoria');
    return { message: 'success' };
}

/**
 * Exclui uma conta a pagar do banco de dados.
 */
export async function deleteCategory(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('categoria')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao excluir categoria:', error);
        return { error: 'Erro de banco de dados: Não foi possível excluir a categoria.' };
    }

    revalidatePath('/categoria');
    return { success: true };
}

/**
 * Listando os dados
 */
export async function listCategory() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categoria')
        .select('*')
        .order('data', { ascending: true });

    if (error) {
        console.error('Erro ao listar categorias:', error);
        return [];
    }

    return data;
}
