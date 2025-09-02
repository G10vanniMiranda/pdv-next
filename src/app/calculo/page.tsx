"use client"

import { useState } from "react";

interface ICep {
    cep: string;
    estado: string;
    cidade: string;
}

export default function () {
    const [iphone, setIphone] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("");

    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [result, setResult] = useState<ICep | null>(null);

    const calcular = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const total = parseFloat(valor) * parseInt(quantidade);
        alert(`O total para ${iphone} é R$ ${total}`);
    };

    // Função para aplicar máscara ao CEP
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // só números
        if (value.length > 8) value = value.substring(0, 8);
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        }
        setCep(value);
    };


    // Busca o endereço automaticamente quando o CEP tiver 8 números
    const handleKeyUp = async () => {
        const cleanCep = cep.replace("-", "");
        if (cleanCep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                setResult(data);
                setEstado(data.uf);
                setCidade(data.localidade);
                setBairro(data.bairro);

            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                alert("Erro ao buscar o endereço.");
            }
        }
    };

    return (
        <div className="bg-slate-900 h-screen">
            <div className="hidden">
                <h1>Calculo</h1>

                <form onSubmit={calcular} className="w-96 mx-auto bg-slate-600 p-5 rounded-xl">
                    <div className="flex flex-col">
                        <label htmlFor="valor" className="text-slate-400">Valor do produto</label>
                        <input type="text"
                            placeholder="Iphone"
                            value={iphone}
                            className="bg-slate-700 p-2 rounded-full px-3 text-white"
                            onChange={(e) => setIphone(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="valor" className="text-slate-400">Valor do produto</label>
                        <input type="text"
                            placeholder="Quantidade"
                            value={quantidade} // digitar um valor, se eu passar um valor
                            className="bg-slate-700 p-2 rounded-full px-3 text-white"
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="valor" className="text-slate-400">Valor do produto</label>
                        <input type="text"
                            id="valor"
                            value={valor}
                            placeholder="Digite um valor"
                            className="bg-slate-700 p-2 rounded-full px-3 text-white"
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="bg-violet-700 p-2 rounded-xl mt-3 text-white">Calcular</button>
                </form>

                <hr className="mb-5 mt-5 w-96 mx-auto" />
            </div>

            <h3 className="text-white pt-10 text-3xl text-center mb-3">Confirme seu endereço</h3>

            <form className="w-96 mx-auto bg-slate-600 p-5 rounded-xl">
                <div className="flex flex-col">
                    <label htmlFor="cep" className="text-slate-400">Cep</label>
                    <input id="cep" type="text"
                        placeholder="Digite o cep"
                        value={cep}
                        onChange={handleCepChange}
                        onKeyUp={handleKeyUp}
                        className="bg-slate-700 p-2 rounded-full px-3 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="estado" className="text-slate-400">Estado</label>
                    <input id="estado" type="text"
                        placeholder="Digite o estado"
                        value={estado}
                        readOnly
                        className="bg-slate-700 p-2 rounded-full px-3 text-white"
                        onChange={(e) => setEstado(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="cidade" className="text-slate-400">Cidade</label>
                    <input id="cidade" type="text"
                        placeholder="Digite a cidade"
                        value={cidade}
                        disabled
                        className="bg-slate-700 p-2 rounded-full px-3 text-white"
                        onChange={(e) => setCidade(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="bairro" className="text-slate-400">Bairro</label>
                    <input id="bairro" type="text"
                        placeholder="Digite o bairro"
                        value={bairro}
                        disabled
                        className="bg-slate-700 p-2 rounded-full px-3 text-white"
                        onChange={(e) => setBairro(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}