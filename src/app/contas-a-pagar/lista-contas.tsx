// app/contas-a-pagar/lista-contas.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ContaPagar } from '@/lib/types/database.types';
import { AccountForm } from './AccountForm';
import { deleteAccount } from './actions';

interface ListaContasProps {
    contas: ContaPagar[];
}

export function ListaContas({ contas }: ListaContasProps) {
    const [contaSelecionada, setContaSelecionada] = useState<ContaPagar | null>(null);

    const handleDelete = async (id: number) => {
        await deleteAccount(id);
        setContaSelecionada(null);
    };

    return (
        <div className="space-y-2 px-10">
            {contas.length === 0 && (
                <div className="text-center text-gray-500">Nenhum resultado encontrado.</div>
            )}

            {contas.map((conta) => (
                <div
                    key={conta.id}
                    className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-800 duration-300"
                    onClick={() => setContaSelecionada(conta)}
                >
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-300">{conta.nome}</span>
                        <span className="text-sm text-gray-300">
                            Vencimento: {conta.data ? new Date(conta.data).toLocaleDateString('pt-BR') : 'N/A'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-300">
                            {Number(conta.valor).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </span>
                        <Badge
                            variant={
                                conta.status === 'Pago'
                                    ? 'default'
                                    : conta.status === 'Atrasado'
                                        ? 'destructive'
                                        : 'secondary'
                            }
                        >
                            {conta.status}
                        </Badge>
                    </div>
                </div>
            ))}

            {/* Modal único de edição/exclusão */}
            <Dialog open={!!contaSelecionada} onOpenChange={() => setContaSelecionada(null)}>
                <DialogContent className="sm:max-w-[425px] bg-gray-800">
                    <DialogHeader>
                        <DialogTitle>Editar Conta</DialogTitle>
                        <DialogDescription>
                            Faça alterações na sua conta ou exclua permanentemente.
                        </DialogDescription>
                    </DialogHeader>

                    {contaSelecionada && (
                        <>
                            <AccountForm
                                mode="edit"
                                conta={contaSelecionada}
                                onClose={() => setContaSelecionada(null)}
                            />

                            <Button
                                variant="destructive"
                                className="w-full mt-4"
                                onClick={() => handleDelete(contaSelecionada.id)}
                            >
                                Excluir Conta
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
