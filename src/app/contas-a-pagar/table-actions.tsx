// app/contas-a-pagar/table-actions.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { MoreHorizontal } from 'lucide-react';
import { ContaPagar } from '@/lib/types/database.types';
import { deleteAccount } from './actions';
import { EditAccountForm } from './edit-account-form';

interface TableActionsProps {
    conta: ContaPagar;
}

export function TableActions({ conta }: TableActionsProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // Função para lidar com a exclusão
    const handleDelete = async () => {
        // Adicione um loading ou feedback visual se desejar
        await deleteAccount(conta.id);
        // O revalidatePath na action cuidará de atualizar a UI
    };

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-500">Excluir</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Modal de Exclusão */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso excluirá permanentemente a conta
                            {conta.nome} dos nossos servidores.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                            Sim, excluir conta
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Modal de Edição */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Conta</DialogTitle>
                    <DialogDescription>
                        Faça alterações na sua conta aqui. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <EditAccountForm
                    conta={conta}
                    onClose={() => setIsEditDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
