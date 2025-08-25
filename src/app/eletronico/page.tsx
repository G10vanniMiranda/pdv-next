
import { MdOutlineMenu } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { BiSolidDashboard } from "react-icons/bi";
import Image from "next/image";

export default function EletronicoPage() {
    return (
        <div>
            <header className="flex justify-between items-center px-10 h-[12vh] bg-slate-950">

                <MdOutlineMenu className="text-white bg-slate-900 rounded-sm p-2 size-9 cursor-pointer hover:bg-blue-700 transition-all duration-300" />

                <div className="bg-blue-700 py-2 rounded-b-xl">
                    <h1 className="text-white font-semibold px-3 py-1">Loja Online</h1>
                </div>

                <FiShoppingCart className="text-white bg-slate-900 rounded-sm p-2 size-9 cursor-pointer hover:bg-blue-700 transition-all duration-300 " />

            </header>

            <section className="bg-slate-900 h-full w-full p-5">
                <div className="flex gap-1 items-center justify-center border-2 border-blue-700 
                w-fit rounded-full px-3 hover:bg-blue-700 transition-all duration-300 cursor-pointer">
                    <BiSolidDashboard className="text-white" />
                    <h2 className="text-white font-semibold py-1">Produtos</h2>
                </div>

                <div className="pt-5 flex gap-3 flex-wrap justify-center items-start">

                    <div className="w-44 h-96">
                        <div className="bg-blue-700 rounded-t-xl p-7">
                            <Image src="/loja-online/catalogo-produtos/teclado.png"
                                width={150} height={150} alt="" className="w-28 h-28" />
                        </div>

                        <div className="bg-slate-800 h-10 rounded-b-xl flex items-center justify-center">
                            <h3 className="text-slate-200">Teclados</h3>
                        </div>
                    </div>

                    <div className="w-44 h-96">
                        <div className="bg-blue-700 rounded-t-xl p-7">
                            <Image src="/loja-online/catalogo-produtos/teclado.png"
                                width={150} height={150} alt="" className="w-28 h-28" />
                        </div>

                        <div className="bg-slate-800 h-10 rounded-b-xl flex items-center justify-center">
                            <h3 className="text-slate-200">Teclados</h3>
                        </div>
                    </div>

                    <div className="w-44 h-96">
                        <div className="bg-blue-700 rounded-t-xl p-7">
                            <Image src="/loja-online/catalogo-produtos/teclado.png"
                                width={150} height={150} alt="" className="w-28 h-28" />
                        </div>

                        <div className="bg-slate-800 h-10 rounded-b-xl flex items-center justify-center">
                            <h3 className="text-slate-200">Teclados</h3>
                        </div>
                    </div>

                    <div className="w-44 h-96">
                        <div className="bg-blue-700 rounded-t-xl p-7">
                            <Image src="/loja-online/catalogo-produtos/teclado.png"
                                width={150} height={150} alt="" className="w-28 h-28" />
                        </div>

                        <div className="bg-slate-800 h-10 rounded-b-xl flex items-center justify-center">
                            <h3 className="text-slate-200">Teclados</h3>
                        </div>
                    </div>

                    <div className="w-44 h-96">
                        <div className="bg-blue-700 rounded-t-xl p-7">
                            <Image src="/loja-online/catalogo-produtos/teclado.png"
                                width={150} height={150} alt="" className="w-28 h-28" />
                        </div>

                        <div className="bg-slate-800 h-10 rounded-b-xl flex items-center justify-center">
                            <h3 className="text-slate-200">Teclados</h3>
                        </div>
                    </div>

                    <div className="w-44 h-96">
                        <div className="bg-blue-700 rounded-t-xl p-7">
                            <Image src="/loja-online/catalogo-produtos/teclado.png"
                                width={150} height={150} alt="" className="w-28 h-28" />
                        </div>

                        <div className="bg-slate-800 h-10 rounded-b-xl flex items-center justify-center">
                            <h3 className="text-slate-200">Teclados</h3>
                        </div>

                    </div>

                </div>
            </section>

        </div>
    )
}