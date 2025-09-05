import { useEffect, useState } from "react";
import axios from "axios";

interface ICep {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
}

export default function Form() {
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [enderecos, setEnderecos] = useState<ICep[]>([]);

    const API_URL = "https://jyrimgynflxmtjhhkyrs.supabase.co/rest/v1/cadastro_endereco";
    const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cmltZ3luZmx4bXRqaGhreXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4ODYwNzIsImV4cCI6MjA1NTQ2MjA3Mn0.H_5D1uvr2cLHYxa-bvk8bpc-ya6IPTcoPKx2cONIa00";

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

                setEstado(data.uf);
                setCidade(data.localidade);
                setBairro(data.bairro);
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                alert("Erro ao buscar o endereço.");
            }
        }
    };

    // Função para gravar no Supabase
    const gravarEndereco = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(
                API_URL,
                { cep, estado, cidade, bairro },
                {
                    headers: {
                        apikey: API_KEY,
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                        Prefer: "return=representation", // faz retornar os dados criados
                    },
                }
            );

            // Após salvar, atualiza a lista
            buscarEnderecos();
            setCep("");
            setEstado("");
            setCidade("");
            setBairro("");
        } catch (error) {
            console.error("Erro ao gravar no Supabase:", error);
            alert("Erro ao gravar endereço.");
        }
    };

    // Função para listar endereços
    const buscarEnderecos = async () => {
        try {
            const { data } = await axios.get(`${API_URL}?select=*`, {
                headers: {
                    apikey: API_KEY,
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            setEnderecos(data);
        } catch (error) {
            console.error("Erro ao buscar endereços:", error);
        }
    };

    // Carregar lista no início
    useEffect(() => {
        buscarEnderecos();
    }, []);
    return (
        <form
            onSubmit={gravarEndereco}
            className="w-96 mx-auto bg-slate-600 p-5 rounded-xl"
        >
            <div className="flex flex-col">
                <label htmlFor="cep" className="text-slate-400">
                    Cep
                </label>
                <input
                    id="cep"
                    type="text"
                    placeholder="Digite o cep"
                    value={cep}
                    onChange={handleCepChange}
                    onKeyUp={handleKeyUp}
                    className="bg-slate-700 p-2 rounded-full px-3 text-white"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="estado" className="text-slate-400">
                    Estado
                </label>
                <input
                    id="estado"
                    type="text"
                    value={estado}
                    readOnly
                    className="bg-slate-700 p-2 rounded-full px-3 text-white"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="cidade" className="text-slate-400">
                    Cidade
                </label>
                <input
                    id="cidade"
                    type="text"
                    value={cidade}
                    readOnly
                    className="bg-slate-700 p-2 rounded-full px-3 text-white"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="bairro" className="text-slate-400">
                    Bairro
                </label>
                <input
                    id="bairro"
                    type="text"
                    value={bairro}
                    readOnly
                    className="bg-slate-700 p-2 rounded-full px-3 text-white"
                />
            </div>
            <button
                type="submit"
                className="p-2 bg-violet-700 rounded-md mt-3 text-white hover:bg-violet-600 cursor-pointer"
            >
                Gravar
            </button>
        </form>
    )
}