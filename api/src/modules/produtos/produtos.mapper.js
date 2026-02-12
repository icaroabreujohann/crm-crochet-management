"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEditarProdutoDTOparaDB = exports.mapCriarProdutoDTOParaDB = exports.mapProdutoDBParaView = void 0;
const converte_horas_minutos_1 = require("../../utils/datas/converte-horas-minutos");
const mapProdutoDBParaView = (produto) => ({
    id: produto.id,
    codigo: produto.codigo,
    nome: produto.nome,
    preco: produto.preco,
    fotos_url: produto.fotos_url,
    tempo_medio: (0, converte_horas_minutos_1.converteMinutosParaHoras)(produto.tempo_medio),
    data_criacao: produto.data_criacao,
    data_alteracao: produto.data_alteracao,
    categoria_id: produto.categoria_id,
    categoria_nome: produto.categoria_nome ?? ''
});
exports.mapProdutoDBParaView = mapProdutoDBParaView;
const mapCriarProdutoDTOParaDB = (data, codigo, fotos_url) => ({
    nome: data.nome,
    preco: data.preco,
    codigo,
    fotos_url,
    tempo_medio: (0, converte_horas_minutos_1.converteHorasParaMinutos)(Number(data.tempo_medio.horas), Number(data.tempo_medio.minutos)),
    categoria_id: data.categoria_id,
});
exports.mapCriarProdutoDTOParaDB = mapCriarProdutoDTOParaDB;
const mapEditarProdutoDTOparaDB = (data) => {
    const resultado = {};
    if (data.nome !== undefined) {
        resultado.nome = data.nome;
    }
    if (data.preco !== undefined) {
        resultado.preco = data.preco;
    }
    if (data.tempo_medio !== undefined) {
        resultado.tempo_medio = (0, converte_horas_minutos_1.converteHorasParaMinutos)(Number(data.tempo_medio.horas ?? 0), Number(data.tempo_medio.minutos ?? 0));
    }
    if (data.categoria_id !== undefined) {
        resultado.categoria_id = data.categoria_id;
    }
    return resultado;
};
exports.mapEditarProdutoDTOparaDB = mapEditarProdutoDTOparaDB;
//# sourceMappingURL=produtos.mapper.js.map