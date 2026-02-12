"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProdutoMaterialParaEncomendaMaterial = exports.mapEncomendaEditarDTOParaDB = exports.mapEncomendaCriarDTOParaDB = void 0;
const calcular_data_prazo_1 = require("../../utils/datas/calcular-data-prazo");
const normalizadores_1 = require("../../utils/normalizadores");
const mapEncomendaCriarDTOParaDB = (data, codigo, produto_id) => ({
    codigo,
    cliente_id: data.cliente_id,
    produto_id,
    observacoes: data.observacoes ?? '',
    status_pagamento: data.status_pagamento ?? 'pendente',
    forma_pagamento: data.forma_pagamento ?? '',
    finalizado: data.finalizado ?? false,
    entregue: data.entregue ?? false,
    local_entrega: data.local_entrega ?? '',
    data_pedido: data.data_pedido,
    data_prazo: (0, calcular_data_prazo_1.calcularDataPrazo)(data.data_pedido, data.data_prazo ?? null, 20)
});
exports.mapEncomendaCriarDTOParaDB = mapEncomendaCriarDTOParaDB;
const mapEncomendaEditarDTOParaDB = (data, produto_id) => {
    const resultado = {};
    if (data.observacoes !== undefined) {
        resultado.observacoes = (0, normalizadores_1.normalizaTexto)(data.observacoes) ?? '';
    }
    if (data.status_pagamento !== undefined) {
        resultado.status_pagamento = data.status_pagamento;
    }
    if (data.forma_pagamento !== undefined) {
        resultado.forma_pagamento = (0, normalizadores_1.normalizaTexto)(data.forma_pagamento) ?? '';
    }
    if (data.finalizado !== undefined) {
        resultado.finalizado = data.finalizado;
    }
    if (data.entregue !== undefined) {
        resultado.entregue = data.entregue;
    }
    if (data.local_entrega !== undefined) {
        resultado.local_entrega = (0, normalizadores_1.normalizaTexto)(data.local_entrega) ?? '';
    }
    if (data.data_pedido !== undefined) {
        resultado.data_pedido = data.data_pedido;
    }
    if (data.data_prazo !== undefined) {
        resultado.data_prazo = data.data_prazo;
    }
    return resultado;
};
exports.mapEncomendaEditarDTOParaDB = mapEncomendaEditarDTOParaDB;
const mapProdutoMaterialParaEncomendaMaterial = (data) => {
    const materiaisMapeados = data.map(m => ({
        material_codigo: m.codigo,
        quantidade: m.quantidade
    }));
    return materiaisMapeados;
};
exports.mapProdutoMaterialParaEncomendaMaterial = mapProdutoMaterialParaEncomendaMaterial;
//# sourceMappingURL=encomendas.mapper.js.map