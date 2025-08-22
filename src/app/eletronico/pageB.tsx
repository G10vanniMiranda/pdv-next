import Image from 'next/image';

const produtos = [
    { nome: 'Teclados', img: '/icones/teclados.png' },
    { nome: 'Mouses', img: '/icones/mouses.png' },
    { nome: 'Fones', img: '/icones/fones.png' },
    { nome: 'Mousepads', img: '/icones/mousepads.png' },
    { nome: 'Monitores', img: '/icones/monitores.png' },
    { nome: 'Speakers', img: '/icones/speakers.png' },
];

export default function EletronicoPage2() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black">
                <button className="text-white text-2xl">
                    <span className="material-icons">menu</span>
                </button>
                <div className="flex-1 flex justify-center">
                    <span className="bg-purple-700 text-white px-6 py-2 rounded-b-lg text-lg font-bold">
                        Loja Online
                    </span>
                </div>
                <button className="text-white text-2xl">
                    <span className="material-icons">shopping_cart</span>
                </button>
            </div>

            {/* Catálogo */}
            <div className="px-4 mt-4">
                <span className="inline-block bg-black text-white font-bold px-4 py-2 rounded mb-2 border border-white">
                    CATÁLOGO
                </span>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    {/* Cards dos produtos */}
                    <CatalogCard nome="Teclados" img="/icones/teclados.png" />
                    <CatalogCard nome="Mouses" img="/icones/mouses.png" />
                    <CatalogCard nome="Fones" img="/icones/fones.png" />
                    <CatalogCard nome="Mousepads" img="/icones/mousepads.png" />
                    <CatalogCard nome="Monitores" img="/icones/monitores.png" />
                    <CatalogCard nome="Speakers" img="/icones/speakers.png" />
                </div>
            </div>
        </div>
    );
}

function CatalogCard({ nome, img }: { nome: string; img: string }) {
    return (
        <div className="bg-gradient-to-b from-[#2d1850] to-[#3b1e6e] rounded-lg flex flex-col items-center justify-center py-6 shadow-md">
            <div className="w-20 h-20 mb-3 flex items-center justify-center">
                <Image
                    src={img}
                    alt={nome}
                    width={80}
                    height={80}
                    className="object-contain"
                />
            </div>
            <span className="text-white font-semibold text-base bg-black/60 px-3 py-1 rounded mt-2">
                {nome}
            </span>
        </div>
    );
}