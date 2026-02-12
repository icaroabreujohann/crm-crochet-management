"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoMaterialService = void 0;
const produtoMaterial_repository_1 = require("./produtoMaterial.repository");
const produtos_repository_1 = require("../produtos.repository");
const materiais_repository_1 = require("../../materiais/materiais.repository");
const assertResultadoBusca_1 = require("../../../shared/asserts/assertResultadoBusca");
const codigos_resposta_1 = require("../../../utils/respostas/codigos-resposta");
class ProdutoMaterialService {
    repository = new produtoMaterial_repository_1.ProdutoMaterialRepository();
    repositoryMaterial = new materiais_repository_1.MateriaisRepository();
    repositoryProdutos = new produtos_repository_1.ProdutosRepository();
    async adicionarMaterial(produto_id, data) {
        const produto = await this.repositoryProdutos.listarProdutoPorId(produto_id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(produto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, produto_id);
        const material = await this.repositoryMaterial.listarMaterialPorCodigo(data.material_codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(material, codigos_resposta_1.CODIGOS_ERRO.MATERIAL_N_EXISTE_ERR, data.material_codigo);
        const materialProduto = {
            produto_id: produto.data.id,
            material_id: material.data.id,
            quantidade: data.quantidade,
            preco_final: material.data.preco_x_qtd * data.quantidade
        };
        return await this.repository.criar(materialProduto);
    }
}
exports.ProdutoMaterialService = ProdutoMaterialService;
//# sourceMappingURL=produtoMaterial.services.js.map