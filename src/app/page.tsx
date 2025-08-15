import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Modulos</h1>

      <div className="flex justify-around">
        <div className="w-44 h-44 bg-amber-200 hover:bg-amber-500 cursor-pointer">
          <Image src="" width={150} height={150} alt="" className="w-full" />
          <h2>Assinaturas</h2>
        </div>

        <Link href="contas-a-pagar" >
          <div className="w-44 h-44 bg-amber-200 hover:bg-amber-500 cursor-pointer">
            <Image src="" width={150} height={150} alt="" className="w-full" />
            <h2>Contas a Pagar</h2>
          </div>
        </Link>

        <Link href="categoria" >
          <div className="w-44 h-44 bg-amber-200 hover:bg-amber-500 cursor-pointer">
            <Image src="" width={150} height={150} alt="" className="w-full" />
            <h2>Categorias</h2>
          </div>
        </Link>
      </div>

    </div>
  );
}