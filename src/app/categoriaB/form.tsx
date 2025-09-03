// app/contas-a-pagar/account-form.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCategory, updateCategory } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Categoria } from '@/lib/types/database.types';

function SubmitButton({ mode }: { mode: 'create' | 'edit' }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Salvando...' : mode === 'create' ? 'Salvar Categoria' : 'Salvar Alterações'}
        </Button>
    );
}

interface IcategoryProps {
    mode: 'create' | 'edit';
    categoria?: Categoria;
    onClose: () => void;
}

export function Form({ mode, categoria, onClose }: IcategoryProps) {
    const actionFn = mode === 'create' ? createCategory : updateCategory;
    const [state, formAction] = useFormState(actionFn, { message: '' });

    useEffect(() => {
        if (state.message === 'success') {
            onClose();
        }
    }, [state, onClose]);

    return (
        <form action={formAction} className="">
            {mode === 'edit' && categoria && (
                <input type="hidden" name="id" value={categoria.id} />
            )}

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">
                        Nome
                    </Label>
                    <Input
                        id="nome"
                        name="nome"
                        defaultValue={categoria?.nome ?? ''}
                        className="col-span-3"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <SubmitButton mode={mode} />
            </div>

            {state.message && state.message !== 'success' && (
                <p className="text-sm text-red-500 mt-2">{state.message}</p>
            )}
        </form>
    );
}
