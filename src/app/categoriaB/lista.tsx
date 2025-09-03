// app/categoria/lista.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Categoria } from '@/lib/types/database.types';
import { deleteCategory } from './actions';
import { Form } from './form';

interface ListaCategoriasProps {
    categorias: Categoria[];
}

export function ListaCategorias({ categorias }: ListaCategoriasProps) {
    const [categoriasSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

    const handleDelete = async (id: number) => {
        await deleteCategory(id);
        setCategoriaSelecionada(null);
    };
    return (
        <div className="space-y-2 px-10">
            {categorias.length === 0 && (
                <div className="text-center text-gray-500">Nenhum resultado encontrado.</div>
            )}

            {categorias.map((cat) => (
                <div
                    key={cat.id}
                    className="flex items-center justify-between p-3 border rounded-md cursor-pointer 
                    hover:bg-gray-800 duration-300"
                    onClick={() => setCategoriaSelecionada(cat)}
                >
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-300">{cat.nome}</span>
                    </div>
                </div>
            ))}

            {/* Modal único de edição/exclusão */}
            <Dialog open={!!categoriasSelecionada} onOpenChange={() => setCategoriaSelecionada(null)}>
                <DialogContent className="sm:max-w-[425px] bg-gray-800">
                    <DialogHeader>
                        <DialogTitle>Editar Categoria</DialogTitle>
                        <DialogDescription>
                            Faça alterações na categoria ou exclua permanentemente.
                        </DialogDescription>
                    </DialogHeader>

                    {categoriasSelecionada && (
                        <>
                            <Form
                                mode="edit"
                                categoria={categoriasSelecionada}
                                onClose={() => setCategoriaSelecionada(null)}
                            />

                            <Button
                                variant="destructive"
                                className="w-full mt-4"
                                onClick={() => handleDelete(categoriasSelecionada.id)}
                            >
                                Excluir Categoria
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
