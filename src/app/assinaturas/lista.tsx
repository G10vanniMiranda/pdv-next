// app/contas-a-pagar/lista-contas.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Assinatura } from '@/lib/types/database.types';
import { SignatureForm } from './form';
import { deleteSignature } from './actions';

interface ListaAssinaturaProps {
    assinaturas: Assinatura[];
}

export function ListaAssinatura({ assinaturas }: ListaAssinaturaProps) {
    const [assinaturaSelecionada, setAssinaturaSelecionada] = useState<Assinatura | null>(null);

    const handleDelete = async (id: number) => {
        await deleteSignature(id);
        setAssinaturaSelecionada(null);
    };

    return (
        <div className="space-y-2 px-10">
            {assinaturas.length === 0 && (
                <div className="text-center text-gray-500">Nenhum resultado encontrado.</div>
            )}

            {assinaturas.map((assinatura) => (
                <div
                    key={assinatura.id}
                    className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-800 duration-300"
                    onClick={() => setAssinaturaSelecionada(assinatura)}
                >
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-300">{assinatura.nome}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-300">{assinatura.descricao}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-300">
                            {Number(assinatura.valor).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </span>
                        <Badge
                            variant={
                                assinatura.status === 'Grátis'
                                    ? 'default'
                                    : assinatura.status === 'Avião'
                                        ? 'destructive'
                                        : 'secondary'
                            }
                        >
                            {assinatura.status}
                        </Badge>
                    </div>
                </div>
            ))}

            {/* Modal único de edição/exclusão */}
            <Dialog open={!!assinaturaSelecionada} onOpenChange={() => setAssinaturaSelecionada(null)}>
                <DialogContent className="sm:max-w-[425px] bg-gray-800">
                    <DialogHeader>
                        <DialogTitle>Editar Assinatura</DialogTitle>
                        <DialogDescription>
                            Faça alterações na sua conta ou exclua permanentemente.
                        </DialogDescription>
                    </DialogHeader>

                    {assinaturaSelecionada && (
                        <>
                            <SignatureForm
                                mode="edit"
                                assinatura={assinaturaSelecionada}
                                onClose={() => setAssinaturaSelecionada(null)}
                            />

                            <Button
                                variant="destructive"
                                className="w-full mt-4"
                                onClick={() => handleDelete(assinaturaSelecionada.id)}
                            >
                                Excluir Assinatura
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
