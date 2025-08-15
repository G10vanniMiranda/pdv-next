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
import { Form } from './form';


export function AddAccountButton() {
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
                        Preencha as informações da nova categoria.
                    </DialogDescription>
                </DialogHeader>
                {/* Formulário genérico no modo 'create' */}
                <Form mode="create" onClose={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
