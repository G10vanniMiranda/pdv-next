// app/contas-a-pagar/add-account-form.tsx
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
import { createAccount } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';

// Botão de submit com estado de carregamento
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Salvando...' : 'Salvar Conta'}
        </Button>
    )
}

// Formulário para adicionar a conta
export function AddAccountForm({ onClose }: { onClose: () => void }) {
    const [state, formAction] = useFormState(createAccount, { message: '' });

    useEffect(() => {
        // Se a ação do formulário foi bem-sucedida, fecha o modal
        if (state.message === 'success') {
            onClose();
        }
    }, [state, onClose]);

    return (
        <form action={formAction}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">
                        Nome
                    </Label>
                    <Input id="nome" name="nome" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valor" className="text-right">
                        Valor
                    </Label>
                    <Input id="valor" name="valor" type="number" step="0.01" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="data" className="text-right">
                        Data
                    </Label>
                    <Input id="data" name="data" type="date" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                        Status
                    </Label>
                    <Select name="status" required>
                        <SelectTrigger className="col-span-3">
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
            <div className="flex justify-end">
                <SubmitButton />
            </div>
            {state.message && state.message !== 'success' && <p className="text-sm text-red-500 mt-2">{state.message}</p>}
        </form>
    );
}
