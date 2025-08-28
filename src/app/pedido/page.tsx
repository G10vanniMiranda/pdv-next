"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Pedido {
    id: number;
    nome: string;
    valor: number;
    categoria: string;
    vendido: boolean;
}

export default function PedidoPage() {

    const [estoque, setEstoque] = useState<Pedido[]>([
        { id: 1, nome: "Item 1", valor: 200, categoria: "serviço", vendido: true },
        { id: 2, nome: "Item 1", valor: 500, categoria: "serviço", vendido: true },
        { id: 3, nome: "Item 2", valor: 200, categoria: "produtos", vendido: true },
        { id: 4, nome: "Item 3", valor: 300, categoria: "produtos", vendido: false },
        { id: 5, nome: "Item 3", valor: 300, categoria: "produtos", vendido: true },
    ]);

    const [form, setForm] = useState({
        nome: "",
        valor: "",
        categoria: "produtos",
        vendido: false,
    });

    const calcularEstoque = () =>
        estoque.reduce((total, item) => total + item.valor, 0).toFixed(2);

    const calcularVendas = () =>
        estoque
            .filter((item) => item.vendido)
            .reduce((total, item) => total + item.valor, 0)
            .toFixed(2);

    const calcularServicos = () =>
        estoque
            .filter((item) => item.categoria === "serviço")
            .reduce((total, item) => total + item.valor, 0)
            .toFixed(2);

    const calcularProdutos = () =>
        estoque
            .filter((item) => item.categoria === "produtos")
            .reduce((total, item) => total + item.valor, 0)
            .toFixed(2);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nome || !form.valor) return;

        const novoPedido: Pedido = {
            id: estoque.length + 1,
            nome: form.nome,
            valor: parseFloat(form.valor),
            categoria: form.categoria,
            vendido: form.vendido,
        };

        setEstoque([...estoque, novoPedido]);

        setForm({ nome: "", valor: "", categoria: "produtos", vendido: false });
    };

    return (
        <div className="p-10 min-h-screen bg-gray-950">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Dashboard de Pedidos</h1>

            {/* Resumos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {[
                    { titulo: "Faturamento Total", valor: calcularEstoque() },
                    { titulo: "Total Vendido", valor: calcularVendas() },
                    { titulo: "Serviços", valor: calcularServicos() },
                    { titulo: "Produtos", valor: calcularProdutos() },
                ].map((card, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-slate-800 shadow-md rounded-2xl p-6 flex flex-col items-center"
                    >
                        <p className="text-xl font-semibold text-green-600">R$ {card.valor}</p>
                        <h2 className="text-gray-600 mt-2">{card.titulo}</h2>
                    </motion.div>
                ))}
            </div>

            {/* Formulário */}
            <div className="bg-slate-800 shadow-md rounded-2xl p-6 mb-10">
                <h2 className="text-lg font-semibold mb-4">➕ Adicionar Pedido</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nome do Pedido"
                        className="border rounded-xl px-4 py-2"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Valor"
                        className="border rounded-xl px-4 py-2"
                        value={form.valor}
                        onChange={(e) => setForm({ ...form, valor: e.target.value })}
                    />
                    <select
                        className="border rounded-xl px-4 py-2"
                        value={form.categoria}
                        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    >
                        <option value="produtos">Produtos</option>
                        <option value="serviço">Serviço</option>
                    </select>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.vendido}
                            onChange={(e) => setForm({ ...form, vendido: e.target.checked })}
                        />
                        Vendido?
                    </label>
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700 transition w-fit"
                    >
                        Adicionar
                    </button>
                </form>
            </div>

            {/* Lista */}
            <div className="bg-slate-800 shadow-md rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-green-500 mb-4">📦 Estoque</h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {estoque.map((item) => (
                        <li
                            key={item.id}
                            className={`rounded-xl text-green-500 p-4 text-center shadow-md ${item.vendido ? "bg-slate-800 border border-green-300" : "border border-green-300 bg-slate-800"
                                }`}
                        >
                            <p className="font-semibold text-green-600">{item.nome}</p>
                            <p className="text-sm text-gray-500">R$ {item.valor}</p>
                            <span className="text-xs px-2 py-1 mt-2 inline-block rounded-full bg-gray-200">
                                {item.categoria}
                            </span>
                            {item.vendido && (
                                <span className="text-xs px-2 py-1 mt-2 ml-2 inline-block rounded-full bg-green-500 text-white">
                                    Vendido
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
