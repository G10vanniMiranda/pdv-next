// app/contas-a-pagar/add-account-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { AddAccountForm } from './add-account-form';

export function AddAccountButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Adicionar Conta</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Nova Conta</DialogTitle>
                    <DialogDescription>
                        Preencha as informações da nova conta a pagar.
                    </DialogDescription>
                </DialogHeader>
                {/* Passamos a função para fechar o modal para o formulário */}
                <AddAccountForm onClose={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
