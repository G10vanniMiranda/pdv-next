import Image from "next/image";

export default function Page() {
  return (
    <div>
      <h1>Modulos</h1>

      <div className="w-44 h-80 bg-amber-200 hover:bg-amber-500 cursor-pointer">
        <Image src="" width={150} height={150} alt="" />
        <h2>Assinaturas</h2>
      </div>

      <div className="w-44 h-80 bg-amber-200 hover:bg-amber-500 cursor-pointer">
        <Image src="" width={150} height={150} alt="" />
        <h2>Contas a Pagar</h2>
      </div>

      <div className="w-44 h-80 bg-amber-200 hover:bg-amber-500 cursor-pointer">
        <Image src="" width={150} height={150} alt="" />
        <h2>Categorias</h2>
      </div>

    </div>
  );
}