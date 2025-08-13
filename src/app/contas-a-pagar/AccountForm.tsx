// app/contas-a-pagar/account-form.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { createAccount, updateAccount } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { ContaPagar } from '@/lib/types/database.types';

function SubmitButton({ mode }: { mode: 'create' | 'edit' }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Salvando...' : mode === 'create' ? 'Salvar Conta' : 'Salvar Alterações'}
        </Button>
    );
}

interface AccountFormProps {
    mode: 'create' | 'edit';
    conta?: ContaPagar;
    onClose: () => void;
}

export function AccountForm({ mode, conta, onClose }: AccountFormProps) {
    const actionFn = mode === 'create' ? createAccount : updateAccount;
    const [state, formAction] = useFormState(actionFn, { message: '' });

    useEffect(() => {
        if (state.message === 'success') {
            onClose();
        }
    }, [state, onClose]);

    return (
        <form action={formAction}>
            {mode === 'edit' && conta && (
                <input type="hidden" name="id" value={conta.id} />
            )}

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">
                        Nome
                    </Label>
                    <Input
                        id="nome"
                        name="nome"
                        defaultValue={conta?.nome ?? ''}
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valor" className="text-right">
                        Valor
                    </Label>
                    <Input
                        id="valor"
                        name="valor"
                        type="number"
                        step="0.01"
                        defaultValue={conta?.valor ?? ''}
                        className="col-span-3"
                        required
                    />
                </div>
                <div className='flex gap-2'>
                    <div className="mt-2 flex-1">
                        <Label htmlFor="data" className="text-right mb-2">
                            Data
                        </Label>
                        <Input
                            id="data"
                            name="data"
                            type="date"
                            defaultValue={conta?.data ?? ''}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="mt-2 flex-1">
                        <Label htmlFor="status" className="text-right mb-2">
                            Status
                        </Label>
                        <Select
                            name="status"
                            defaultValue={conta?.status ?? 'Pendente'}
                            required

                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pendente">Pendente</SelectItem>
                                <SelectItem value="Pago">Pago</SelectItem>
                                <SelectItem value="Atrasado">Atrasado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
