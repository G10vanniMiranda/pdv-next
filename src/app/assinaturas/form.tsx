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
import { createSignature, updateSignature } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { Assinatura } from '@/lib/types/database.types';

function SubmitButton({ mode }: { mode: 'create' | 'edit' }) { // botão de salvar
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Salvando...' : mode === 'create' ? 'Salvar' : 'Salvar Alterações'}
        </Button>
    );
}

interface SignatureProps {
    mode: 'create' | 'edit';
    assinatura?: Assinatura;
    onClose: () => void;
}

export function SignatureForm({ mode, assinatura, onClose }: SignatureProps) {
    const actionFn = mode === 'create' ? createSignature : updateSignature;
    const [state, formAction] = useFormState(actionFn, { message: '' });

    const [valor, setValor] = useState(
        assinatura?.valor
            ? Number(assinatura.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : ''
    );

    function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/\D/g, '');
        value = (Number(value) / 100).toFixed(2) + '';
        setValor(Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    }

    function handleValorBlur(e: React.FocusEvent<HTMLInputElement>) {
        // Garante que o valor seja formatado corretamente ao sair do campo
        let value = e.target.value.replace(/\D/g, '');
        value = (Number(value) / 100).toFixed(2) + '';
        setValor(Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    }

    useEffect(() => {
        if (state.message === 'success') {
            onClose();
        }
    }, [state, onClose]);

    return (
        <form action={formAction} className="">
            {mode === 'edit' && assinatura && (
                <input type="hidden" name="id" value={assinatura.id} />
            )}

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right text-gray-400">
                        Nome
                    </Label>
                    <Input
                        id="nome"
                        name="nome"
                        defaultValue={assinatura?.nome ?? ''}
                        className="col-span-3 text-white"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descricao" className="text-right text-gray-400">
                        Descrição
                    </Label>
                    <Input
                        id="descricao"
                        name="descricao"
                        defaultValue={assinatura?.descricao ?? ''}
                        className="col-span-3 text-white"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valor" className="text-right text-gray-400">
                        Valor
                    </Label>
                    <Input
                        id="valor"
                        name="valor"
                        type="text"
                        inputMode="numeric"
                        pattern="[\d,.]*"
                        value={valor}
                        onChange={handleValorChange}
                        onBlur={handleValorBlur}
                        className="col-span-3 text-white"
                        required
                    />
                </div>
                <div className='flex gap-2'>
                    <div className="mt-2 flex-1">
                        <Label htmlFor="status" className="text-right mb-2 text-gray-400">
                            Status
                        </Label>
                        <Select
                            name="status"
                            defaultValue={assinatura?.status ?? ''}
                            required
                        >
                            <SelectTrigger className="w-full text-white">
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-700 text-white">
                                <SelectItem value="Grátis">Grátis</SelectItem>
                                <SelectItem value="Avião">Avião</SelectItem>
                                <SelectItem value="Foguete">Foguete</SelectItem>
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
