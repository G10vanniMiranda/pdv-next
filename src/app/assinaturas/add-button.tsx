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
import { SignatureForm } from './form';

export function AddButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild className='hidden md:flex'>
                <Button className='cursor-pointer'>Adicionar</Button>
            </DialogTrigger>

            <DialogTrigger asChild className='md:hidden'>
                <Button className='cursor-pointer'>+</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-gray-700">
                <DialogHeader>
                    <DialogTitle className='text-slate-300'>Adicionar</DialogTitle>
                    <DialogDescription className='text-slate-300'>
                        Preencha as informações da nova conta a pagar.
                    </DialogDescription>
                </DialogHeader>
                {/* Formulário genérico no modo 'create' */}
                <SignatureForm mode="create" onClose={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
