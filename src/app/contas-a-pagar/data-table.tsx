// app/contas-a-pagar/data-table.tsx
'use client';

import * as React from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ContaPagar } from '@/lib/types/database.types';
import { Badge } from '@/components/ui/badge';
import { TableActions } from './table-actions'; // Importe o componente de ações

// Definição das colunas da tabela
export const columns: ColumnDef<ContaPagar>[] = [
    {
        accessorKey: 'nome',
        header: 'Nome',
    },
    {
        accessorKey: 'valor',
        header: () => <div className="text-right">Valor</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('valor') as string);
            const formatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'data',
        header: 'Data Vencimento',
        cell: ({ row }) => {
            const date = row.getValue('data') ? new Date(row.getValue('data') as string) : null;
            if (date) {
                // Corrige o fuso horário para exibição
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            }
            const formattedDate = date ? date.toLocaleDateString('pt-BR') : 'N/A';
            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary';
            if (status === 'Pago') variant = 'default';
            if (status === 'Atrasado') variant = 'destructive';

            return <Badge variant={variant}>{status}</Badge>;
        },
    },
    {
        id: 'actions',
        // A célula agora renderiza o componente TableActions,
        // passando os dados completos da linha atual (conta).
        cell: ({ row }) => {
            return <TableActions conta={row.original} />;
        },
    },
];

interface DataTableProps {
    data: ContaPagar[];
}

export function DataTable({ data }: DataTableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próxima
                </Button>
            </div>
        </div>
    );
}
