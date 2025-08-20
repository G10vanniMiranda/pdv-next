import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-slate-900 h-screen">
      <h1 className="text-white text-5xl text-center pt-10 pb-10">Modulos</h1>

      <div className="flex flex-wrap gap-3 items-center justify-around">

        <Link href="assinaturas" >
          <div className="w-44 h-44 bg-sky-200 hover:bg-sky-500 cursor-pointer p-5 rounded-lg">
            <Image src="/icones/assinatura.webp" width={150} height={150} alt="" className="w-full h-28" />
            <h2>Assinaturas</h2>
          </div>
        </Link>

        <Link href="contas-a-pagar" >
          <div className="w-44 h-44 bg-sky-200 hover:bg-sky-500 cursor-pointer p-5 rounded-lg">
            <Image src="/icones/contas-receber.png" width={150} height={150} alt="" className="w-full h-28" />
            <h2>Contas a Pagar</h2>
          </div>
        </Link>

        <Link href="contas-a-receber" >
          <div className="w-44 h-44 bg-sky-200 hover:bg-sky-500 cursor-pointer p-5 rounded-lg">
            <Image src="/icones/contas-pagar.png" width={150} height={150} alt="" className="w-full h-28" />
            <h2>Contas a Receber</h2>
          </div>
        </Link>

        <Link href="categoria">
          <div className="w-44 h-44 bg-sky-200 hover:bg-sky-500 cursor-pointer p-5 rounded-lg">
            <Image src="/icones/categorias.png" width={150} height={150} alt="" className="w-full h-28" />
            <h2>Categorias</h2>
          </div>
        </Link>

      </div>

    </div>
  );
}