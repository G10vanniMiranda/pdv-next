// app/contas-a-pagar/page.tsx

import { listSignatures } from './actions';
import { AddButton } from './add-button';
import { ListaAssinatura } from './lista'; // novo componente simplificado
import { CloseButton } from './voltar-button';

export const revalidate = 60;

export default async function ContasAPagarPage() {
    const assinaturas = await listSignatures();

    if (!assinaturas) {
        return <p className="p-4 text-red-500">Erro ao carregar os dados.</p>;
    }

    return (
        <div className="mx-auto py-10 bg-slate-900 h-screen w-screen">
            <div className="flex justify-between items-center mb-6 px-10">
                <CloseButton />
                <h1 className="text-xl font-bold text-slate-300">Assinaturas</h1>
                <AddButton />
            </div>

            <ListaAssinatura assinaturas={assinaturas} />
        </div>
    );
}
