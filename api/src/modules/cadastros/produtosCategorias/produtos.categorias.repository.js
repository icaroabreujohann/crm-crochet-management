"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoCategoriaRepository = void 0;
const db_1 = require("../../../config/db");
const resultadoBusca_1 = require("../../../utils/resultadoBusca");
class ProdutoCategoriaRepository {
    async listar() {
        return await (0, db_1.sql) `
               select * from produtos_categoria
               order by id desc
          `;
    }
    async listarCategoriaPorId(id) {
        const [categoria] = await (0, db_1.sql) `
               select * from produtos_categoria
               where id = ${id}
               order by id desc
          `;
        return categoria ? (0, resultadoBusca_1.resultadoEncontrado)(categoria) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async listarCategoriaUtilizada(id) {
        const [produto] = await (0, db_1.sql) `
               select * from produtos
               where categoria_id = ${id}
          `;
        return produto ? (0, resultadoBusca_1.resultadoEncontrado)(produto) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async criar(data) {
        const [categoriaCriada] = await (0, db_1.sql) `
               insert into produtos_categoria (categoria)
               values (${data.categoria})
               returning *
          `;
        return categoriaCriada ?? null;
    }
    async editar(data) {
        const [categoriaEditada] = await (0, db_1.sql) `
               update produtos_categoria
               set categoria = ${data.categoria}
               where id = ${data.id}
               returning *
          `;
        return categoriaEditada ?? null;
    }
    async excluir(id) {
        const [categoriaExcluida] = await (0, db_1.sql) `
               delete from produtos_categoria
               where id = ${id}
               returning *
          `;
        return categoriaExcluida ?? null;
    }
}
exports.ProdutoCategoriaRepository = ProdutoCategoriaRepository;
//# sourceMappingURL=produtos.categorias.repository.js.map