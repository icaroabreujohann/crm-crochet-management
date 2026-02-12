"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoCategoriaServices = void 0;
const produtos_categorias_repository_1 = require("./produtos.categorias.repository");
const codigos_resposta_1 = require("../../../utils/respostas/codigos-resposta");
const assertPersistencia_1 = require("../../../shared/asserts/assertPersistencia");
const assertResultadoBusca_1 = require("../../../shared/asserts/assertResultadoBusca");
class ProdutoCategoriaServices {
    repository;
    constructor(repository = new produtos_categorias_repository_1.ProdutoCategoriaRepository()) {
        this.repository = repository;
    }
    async listar() {
        const categorias = await this.repository.listar();
        return categorias;
    }
    async criar(data) {
        const categoriaCriada = await this.repository.criar(data);
        (0, assertPersistencia_1.assertPersistencia)(categoriaCriada, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_CATEGORIA_CRIAR_ERR);
        return categoriaCriada;
    }
    async editar(data) {
        const categoriaExiste = await this.repository.listarCategoriaPorId(data.id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(categoriaExiste, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_CATEGORIA_N_EXISTE);
        const categoriaEditada = await this.repository.editar(data);
        (0, assertPersistencia_1.assertPersistencia)(categoriaEditada, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_CATEGORIA_EDITAR_ERR);
        return categoriaEditada;
    }
    async excluir(id) {
        const categoriaExiste = await this.repository.listarCategoriaPorId(id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(categoriaExiste, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_CATEGORIA_N_EXISTE);
        const categoriaUtilizada = await this.repository.listarCategoriaUtilizada(id);
        (0, assertResultadoBusca_1.assertResultadoNaoExiste)(categoriaUtilizada, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_CATEGORIA_EM_USO, id);
        const categoriaExcluida = await this.repository.excluir(id);
        (0, assertPersistencia_1.assertPersistencia)(categoriaExcluida, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_CATEGORIA_EXCLUIR_ERR);
        return categoriaExcluida;
    }
}
exports.ProdutoCategoriaServices = ProdutoCategoriaServices;
//# sourceMappingURL=produtos.categorias.services.js.map