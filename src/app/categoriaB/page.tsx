// app/contas-a-pagar/page.tsx

import { listCategory } from './actions';
import { AddAccountButton } from './add-button';
import { ListaCategorias } from './lista'; // novo componente simplificado

export const revalidate = 60;

export default async function CategoriasPage() {
    const categorias = await listCategory();

    if (!categorias) {
        return <p className="p-4 text-red-500">Erro ao carregar os dados.</p>;
    }

    return (
        <div className="mx-auto py-10 bg-slate-900 h-screen w-screen">
            <div className="flex justify-between items-center mb-6 px-10">
                <h1 className="text-xl font-bold text-slate-300">Categoria</h1>
                <AddAccountButton />
            </div>

            <ListaCategorias categorias={categorias} />
        </div>
    );
}
