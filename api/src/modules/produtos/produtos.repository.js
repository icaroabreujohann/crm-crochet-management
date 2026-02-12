"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosRepository = void 0;
const db_1 = require("../../config/db");
const resultadoBusca_1 = require("../../utils/resultadoBusca");
class ProdutosRepository {
    selectProdutoBase = (0, db_1.sql) `
          select
               p.*,
               pc.categoria as categoria_nome
          from produtos p
          join produtos_categoria pc
               on pc.id = p.categoria_id
     `;
    async listar() {
        return await (0, db_1.sql) `
               ${this.selectProdutoBase}
               order by p.id desc
          `;
    }
    async listarProdutoPorCodigo(codigo) {
        const [produto] = await (0, db_1.sql) `
               ${this.selectProdutoBase}
               where p.codigo = ${codigo}
               limit 1
          `;
        return produto ? (0, resultadoBusca_1.resultadoEncontrado)(produto) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async listarProdutoPorId(id) {
        const [produto] = await (0, db_1.sql) `
               ${this.selectProdutoBase}
               where p.id = ${id}
               limit 1
          `;
        return produto ? (0, resultadoBusca_1.resultadoEncontrado)(produto) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async criar(data) {
        console.log(data);
        const [produto] = await (0, db_1.sql) `
               insert into produtos(nome, codigo, preco, tempo_medio, fotos_url, categoria_id)
               values(
                    ${data.nome},
                    ${data.codigo},
                    ${data.preco},
                    ${(data.tempo_medio)},
                    ${data.fotos_url},
                    ${data.categoria_id}
               )
               returning *
          `;
        return produto ?? null;
    }
    async editar(id, data) {
        if (!Object.keys(data).length) {
            return null;
        }
        const [produto] = await (0, db_1.sql) `
               update produtos
               set
                    ${(0, db_1.sql)(data)},
                    data_alteracao = now()
               where id = ${id}
               returning *
               `;
        return produto ?? null;
    }
    async excluir(id) {
        const [produtoExcluido] = await (0, db_1.sql) `
               delete from produtos
               where id = ${id}
               returning *
          `;
        return produtoExcluido ?? null;
    }
    async atualizarDataAlteracao(id) {
        await (0, db_1.sql) `
               update produtos
               set data_alteracao = now()
               where id = ${id}
          `;
    }
}
exports.ProdutosRepository = ProdutosRepository;
//# sourceMappingURL=produtos.repository.js.map