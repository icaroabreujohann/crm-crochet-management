"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosController = void 0;
const produtos_services_1 = require("./produtos.services");
const gerenciador_resposta_1 = require("../../utils/respostas/gerenciador-resposta");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const valida_requisicao_1 = require("../../shared/validators/valida.requisicao");
const converte_fotos_1 = require("../../infra/filesystem/converte-fotos");
class ProdutosController {
    service = new produtos_services_1.ProdutosService();
    listarProdutos = async (req, res) => {
        const produtos = await this.service.listar();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_LISTAR_SUCESS, produtos);
    };
    listarProdutoCodigo = async (req, res) => {
        const codigo = res.locals.codigo;
        const produto = await this.service.listarPorCodigo(codigo);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_LISTAR_SUCESS, produto);
    };
    listarProdutoCompleto = async (req, res) => {
        const codigo = res.locals.codigo;
        const produto = await this.service.listarCompleto(codigo);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_LISTAR_SUCESS, produto);
    };
    criarProduto = async (req, res) => {
        const data = req.body;
        (0, valida_requisicao_1.validaRequisicao)(data, ['nome', 'preco']);
        const fotos = req.files ?? [];
        const fotosConvertidas = await (0, converte_fotos_1.converteFotosParaWEBP)(fotos);
        const produtoCriado = await this.service.criarProduto(data, fotosConvertidas);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_CRIAR_SUCESS, produtoCriado);
    };
    editarProduto = async (req, res) => {
        const codigo = res.locals.codigo;
        const data = req.body;
        const produtoEditado = await this.service.editarProduto(codigo, data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_EDITAR_SUCESS, produtoEditado);
    };
    editarFotosProduto = async (req, res) => {
        const codigo = res.locals.codigo;
        const fotos = req.files ?? [];
        const fotosConvertidas = await (0, converte_fotos_1.converteFotosParaWEBP)(fotos);
        const fotosEditadas = await this.service.editarFotosProduto(codigo, fotosConvertidas);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_EDITAR_FOTOS_SUCESS, fotosEditadas);
    };
    excluirProduto = async (req, res) => {
        const codigo = res.locals.codigo;
        const produtoExcluido = await this.service.excluirProduto(codigo);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_EXCLUIR_SUCESS, produtoExcluido);
    };
}
exports.ProdutosController = ProdutosController;
//# sourceMappingURL=produtos.controller.js.map