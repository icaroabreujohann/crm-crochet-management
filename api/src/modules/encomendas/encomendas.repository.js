"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomendasRepository = void 0;
const db_1 = require("../../config/db");
const normalizadores_1 = require("../../utils/normalizadores");
const resultadoBusca_1 = require("../../utils/resultadoBusca");
class EncomendasRepository {
    selectEncomendaView = (0, db_1.sql) `
          select
               em.*,
               p.codigo as produto_codigo,
               p.nome as produto_nome,
               c.nome as cliente_nome
          from encomendas em
          join produtos p
               on p.id = em.produto_id
          join clientes c 
               on c.id = em.cliente_id
     `;
    async listar() {
        return await (0, db_1.sql) `
               ${this.selectEncomendaView}
               order by em.data_criacao desc
          `;
    }
    async listarPorProduto(produto_id) {
        const encomendas = await (0, db_1.sql) `
               ${this.selectEncomendaView}
               where em.produto_id = ${produto_id}
          `;
        return encomendas.length > 0
            ? (0, resultadoBusca_1.resultadoEncontrado)(encomendas)
            : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async listarPorId(id) {
        const [encomenda] = await (0, db_1.sql) `
               ${this.selectEncomendaView}
               where em.id = ${id}
          `;
        return encomenda ? (0, resultadoBusca_1.resultadoEncontrado)(encomenda) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async listarPorCodigo(codigo) {
        const [encomenda] = await (0, db_1.sql) `
               ${this.selectEncomendaView}
               where em.codigo = ${codigo}
          `;
        return encomenda ? (0, resultadoBusca_1.resultadoEncontrado)(encomenda) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async criar(data) {
        console.log(data);
        const [encomenda] = await (0, db_1.sql) `
                    insert into encomendas(codigo, cliente_id, produto_id, observacoes, status_pagamento, forma_pagamento,finalizado, entregue, local_entrega, data_pedido, data_prazo)
                    values (
                         ${data.codigo},
                         ${data.cliente_id},
                         ${data.produto_id},
                         ${(0, normalizadores_1.normalizaTexto)(data.observacoes)},
                         ${data.status_pagamento ?? false},
                         ${(0, normalizadores_1.normalizaTexto)(data.forma_pagamento)},
                         ${data.finalizado ?? false},
                         ${data.entregue ?? false},
                         ${(0, normalizadores_1.normalizaTexto)(data.local_entrega)},
                         ${(data.data_pedido ?? new Date())},
                         ${(0, normalizadores_1.normalizaData)(data.data_prazo)}
                         )
                    returning *
               `;
        return encomenda ?? null;
    }
    async editar(id, data) {
        if (!Object.keys(data).length) {
            return null;
        }
        const [encomenda] = await (0, db_1.sql) `
               update encomendas
               set
                    ${(0, db_1.sql)(data)},
                    data_alteracao = now()
               where id = ${id}
               returning *
          `;
        return encomenda ?? null;
    }
    async excluir(id) {
        const [encomenda] = await (0, db_1.sql) `
               delete from encomendas
               where id = ${id}
               returning *
          `;
        return encomenda ?? null;
    }
}
exports.EncomendasRepository = EncomendasRepository;
//# sourceMappingURL=encomendas.repository.js.map