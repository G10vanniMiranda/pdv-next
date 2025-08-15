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
import { AccountForm } from './form';

export function AddButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild >
                <Button>Adicionar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-700">
                <DialogHeader>
                    <DialogTitle>Adicionar</DialogTitle>
                    <DialogDescription className='text-slate-300'>
                        Preencha as informações da nova conta a pagar.
                    </DialogDescription>
                </DialogHeader>
                {/* Formulário genérico no modo 'create' */}
                <AccountForm mode="create" onClose={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
