"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosService = void 0;
const crypto_1 = require("crypto");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const produtos_repository_1 = require("./produtos.repository");
const paths_1 = require("../../infra/upload/paths");
const produtos_salvarfotos_1 = require("../../infra/upload/produtos.salvarfotos");
const excluir_pasta_1 = require("../../infra/filesystem/excluir-pasta");
const assertResultadoBusca_1 = require("../../shared/asserts/assertResultadoBusca");
const produtoMaterial_repository_1 = require("./materiais/produtoMaterial.repository");
const produtos_mapper_1 = require("./produtos.mapper");
const produtoMaterial_services_1 = require("./materiais/produtoMaterial.services");
const assertPersistencia_1 = require("../../shared/asserts/assertPersistencia");
const encomendas_repository_1 = require("../encomendas/encomendas.repository");
class ProdutosService {
    repository;
    repositoryMateriais;
    servicesMateriais;
    repositoryEncomendas;
    constructor(repository = new produtos_repository_1.ProdutosRepository(), repositoryMateriais = new produtoMaterial_repository_1.ProdutoMaterialRepository(), servicesMateriais = new produtoMaterial_services_1.ProdutoMaterialService(), repositoryEncomendas = new encomendas_repository_1.EncomendasRepository()) {
        this.repository = repository;
        this.repositoryMateriais = repositoryMateriais;
        this.servicesMateriais = servicesMateriais;
        this.repositoryEncomendas = repositoryEncomendas;
    }
    async gerarCodigoProdutoUnico() {
        let codigo;
        let produtoExiste;
        do {
            codigo = (0, crypto_1.randomUUID)();
            produtoExiste = await this.repository.listarProdutoPorCodigo(codigo);
        } while (produtoExiste.existe);
        return codigo;
    }
    async inserirMateriaisDoProduto(produto_id, materiais) {
        if (!materiais?.length)
            return;
        for (const material of materiais) {
            await this.servicesMateriais.adicionarMaterial(produto_id, material);
        }
    }
    async excluirMateriaisDoProduto(produto_id) {
        await this.repositoryMateriais.excluirPorProduto(produto_id);
    }
    async listar() {
        const produtos = await this.repository.listar();
        const produtosMap = produtos.map(produtos_mapper_1.mapProdutoDBParaView);
        return produtosMap;
    }
    async listarPorCodigo(codigo) {
        const produto = await this.repository.listarProdutoPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(produto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, codigo);
        const produtoMap = (0, produtos_mapper_1.mapProdutoDBParaView)(produto.data);
        return produtoMap;
    }
    async listarCompleto(codigo) {
        const produto = await this.repository.listarProdutoPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(produto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, codigo);
        const produtoMap = (0, produtos_mapper_1.mapProdutoDBParaView)(produto.data);
        const materiais = await this.repositoryMateriais.listarMaterialPorProduto(produto.data.id);
        const materiaisMapeados = materiais?.data ?? [];
        return {
            ...produtoMap,
            materiais: materiaisMapeados
        };
    }
    async criarProduto(data, fotos) {
        const codigo = await this.gerarCodigoProdutoUnico();
        const fotos_url = `${paths_1.PRODUTOS_DIR_API}/${codigo}`;
        const produtoMap = (0, produtos_mapper_1.mapCriarProdutoDTOParaDB)(data, codigo, fotos_url);
        const produtoCriado = await this.repository.criar(produtoMap);
        (0, assertPersistencia_1.assertPersistencia)(produtoCriado, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_CRIAR_ERR);
        await this.inserirMateriaisDoProduto(produtoCriado.id, data.materiais);
        await (0, produtos_salvarfotos_1.salvarFotosProduto)(codigo, fotos, paths_1.PRODUTOS_DIR);
        return produtoCriado;
    }
    async editarProduto(codigo, data) {
        const produto = await this.repository.listarProdutoPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(produto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, codigo);
        let produtoEditado;
        const produtoMap = (0, produtos_mapper_1.mapEditarProdutoDTOparaDB)(data);
        if (Object.keys(produtoMap).length) {
            const atualizado = await this.repository.editar(produto.data.id, produtoMap);
            (0, assertPersistencia_1.assertPersistencia)(atualizado, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_EDITAR_ERR);
            produtoEditado = atualizado;
        }
        if (data.materiais) {
            await this.excluirMateriaisDoProduto(produto.data.id);
            await this.inserirMateriaisDoProduto(produto.data.id, data.materiais);
        }
        return produtoEditado ?? produto.data;
    }
    async editarFotosProduto(codigo, fotos) {
        const produto = await this.repository.listarProdutoPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(produto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, codigo);
        await (0, produtos_salvarfotos_1.editarFotosProduto)(codigo, fotos, paths_1.PRODUTOS_DIR);
        await this.repository.atualizarDataAlteracao(produto.data.id);
        return produto;
    }
    async excluirProduto(codigo) {
        const produto = await this.repository.listarProdutoPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(produto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, codigo);
        const existeEncomendaComProduto = await this.repositoryEncomendas.listarPorProduto(produto.data.id);
        (0, assertResultadoBusca_1.assertResultadoNaoExiste)(existeEncomendaComProduto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_EXISTE_ENCOMENDA, codigo);
        await this.excluirMateriaisDoProduto(produto.data.id);
        const produtoExcluido = await this.repository.excluir(produto.data.id);
        (0, assertPersistencia_1.assertPersistencia)(produtoExcluido, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_EXCLUIR_ERR);
        await (0, excluir_pasta_1.excluirPasta)(paths_1.PRODUTOS_DIR, codigo);
        return produtoExcluido;
    }
}
exports.ProdutosService = ProdutosService;
//# sourceMappingURL=produtos.services.js.map