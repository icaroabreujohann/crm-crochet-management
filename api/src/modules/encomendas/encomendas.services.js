"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomendasServices = void 0;
const node_crypto_1 = require("node:crypto");
const assertResultadoBusca_1 = require("../../shared/asserts/assertResultadoBusca");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const encomendas_repository_1 = require("./encomendas.repository");
const encomendaMaterial_services_1 = require("./materiais/encomendaMaterial.services");
const encomendaMaterial_repository_1 = require("./materiais/encomendaMaterial.repository");
const produtos_repository_1 = require("../produtos/produtos.repository");
const clientes_repository_1 = require("../clientes/clientes.repository");
const encomendas_mapper_1 = require("./encomendas.mapper");
const assertPersistencia_1 = require("../../shared/asserts/assertPersistencia");
const produtoMaterial_repository_1 = require("../produtos/materiais/produtoMaterial.repository");
const calcular_data_prazo_1 = require("../../utils/datas/calcular-data-prazo");
class EncomendasServices {
    repository;
    repositoryMateriais;
    repositoryMateriaisProdutos;
    repositoryProdutos;
    repositoryClientes;
    servicesMateriaisEncomendas;
    constructor(repository = new encomendas_repository_1.EncomendasRepository(), repositoryMateriais = new encomendaMaterial_repository_1.EncomendaMaterialRepository(), repositoryMateriaisProdutos = new produtoMaterial_repository_1.ProdutoMaterialRepository(), repositoryProdutos = new produtos_repository_1.ProdutosRepository(), repositoryClientes = new clientes_repository_1.ClientesRepository(), servicesMateriaisEncomendas = new encomendaMaterial_services_1.EncomendaMaterialService()) {
        this.repository = repository;
        this.repositoryMateriais = repositoryMateriais;
        this.repositoryMateriaisProdutos = repositoryMateriaisProdutos;
        this.repositoryProdutos = repositoryProdutos;
        this.repositoryClientes = repositoryClientes;
        this.servicesMateriaisEncomendas = servicesMateriaisEncomendas;
    }
    async gerarCodigoEncomendaUnico() {
        let codigo;
        let encomendaExiste;
        do {
            codigo = (0, node_crypto_1.randomUUID)();
            encomendaExiste = await this.repository.listarPorCodigo(codigo);
        } while (encomendaExiste.existe);
        return codigo;
    }
    async inserirMateriaisDaEncomenda(encomenda_id, materiais) {
        if (!materiais?.length)
            return;
        for (const material of materiais) {
            await this.servicesMateriaisEncomendas.adicionarMaterial(encomenda_id, material);
        }
    }
    async excluirMateriaisDaEncomenda(encomenda_id) {
        await this.repositoryMateriais.excluirPorEncomenda(encomenda_id);
    }
    async listar() {
        return await this.repository.listar();
    }
    async listarPorCodigo(codigo) {
        const encomenda = await this.repository.listarPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(encomenda, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR, codigo);
        return encomenda.data;
    }
    async listarCompleto(codigo) {
        const encomenda = await this.repository.listarPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(encomenda, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR, codigo);
        const materiais = await this.repositoryMateriais.listarMaterialPorEncomenda(encomenda.data.id);
        const materiaisMapeados = materiais?.data ?? [];
        return {
            ...encomenda.data,
            materiais: materiaisMapeados
        };
    }
    async criar(data) {
        const produtoExiste = await this.repositoryProdutos.listarProdutoPorCodigo(data.produto_codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(produtoExiste, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, data.produto_codigo);
        const clienteExiste = await this.repositoryClientes.listarPorId(data.cliente_id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(clienteExiste, codigos_resposta_1.CODIGOS_ERRO.CLIENTE_N_EXISTE_ERR, data.cliente_id);
        const codigo = await this.gerarCodigoEncomendaUnico();
        const encomendaMap = (0, encomendas_mapper_1.mapEncomendaCriarDTOParaDB)(data, codigo, produtoExiste.data.id);
        console.log('encomenda map criar', encomendaMap);
        const encomendaCriada = await this.repository.criar(encomendaMap);
        (0, assertPersistencia_1.assertPersistencia)(encomendaCriada, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_CRIAR_ERR);
        const materiaisDoProduto = await this.repositoryMateriaisProdutos.listarMaterialPorProduto(produtoExiste.data.id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(materiaisDoProduto, codigos_resposta_1.CODIGOS_ERRO.PRODUTO_MATERIAL_N_EXISTE_ERRO, produtoExiste.data.id);
        const materiaisMapeados = (0, encomendas_mapper_1.mapProdutoMaterialParaEncomendaMaterial)(materiaisDoProduto.data);
        await this.inserirMateriaisDaEncomenda(encomendaCriada.id, materiaisMapeados);
        return encomendaCriada;
    }
    async editar(codigo, data) {
        const encomendaExiste = await this.repository.listarPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(encomendaExiste, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR, codigo);
        let encomendaEditada;
        const encomendaMap = (0, encomendas_mapper_1.mapEncomendaEditarDTOParaDB)(data);
        if ('data_prazo' in encomendaMap) {
            if (encomendaMap.data_prazo === null) {
                const base = encomendaMap.data_pedido ?? encomendaExiste.data.data_pedido;
                encomendaMap.data_prazo = (0, calcular_data_prazo_1.calcularDataPrazo)(base, null, 20);
            }
        }
        if (Object.keys(encomendaMap).length) {
            encomendaEditada = await this.repository.editar(encomendaExiste.data.id, encomendaMap);
            (0, assertPersistencia_1.assertPersistencia)(encomendaEditada, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_EDITAR_ERR);
        }
        if (data.materiais) {
            this.excluirMateriaisDaEncomenda(encomendaExiste.data.id);
            this.inserirMateriaisDaEncomenda(encomendaExiste.data.id, data.materiais);
        }
        console.log('encomenda', encomendaMap);
        return encomendaEditada;
    }
    async excluir(encomenda_codigo) {
        const encomendaExiste = await this.repository.listarPorCodigo(encomenda_codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(encomendaExiste, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR, encomenda_codigo);
        const encomendaExcluida = await this.repository.excluir(encomendaExiste.data.id);
        (0, assertPersistencia_1.assertPersistencia)(encomendaExcluida, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_EXCLUIR_ERR, encomendaExiste.data.id);
        await this.excluirMateriaisDaEncomenda(encomendaExiste.data.id);
        return encomendaExcluida;
    }
}
exports.EncomendasServices = EncomendasServices;
//# sourceMappingURL=encomendas.services.js.map