"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomendasController = void 0;
const encomendas_services_1 = require("./encomendas.services");
const gerenciador_resposta_1 = require("../../utils/respostas/gerenciador-resposta");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const valida_requisicao_1 = require("../../shared/validators/valida.requisicao");
class EncomendasController {
    services;
    constructor(services = new encomendas_services_1.EncomendasServices()) {
        this.services = services;
    }
    listarEncomendas = async (req, res) => {
        const encomendas = await this.services.listar();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.ENCOMENDA_LISTAR_SUCESS, encomendas);
    };
    listarEncomendaCompleta = async (req, res) => {
        const codigo = res.locals.codigo;
        const encomenda = await this.services.listarCompleto(codigo);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.ENCOMENDA_LISTAR_SUCESS, encomenda);
    };
    criarEncomenda = async (req, res) => {
        const data = req.body;
        (0, valida_requisicao_1.validaRequisicao)(data, ['cliente_id', 'produto_codigo']);
        const encomendaCriada = await this.services.criar(data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.ENCOMENDA_CRIAR_SUCESS, encomendaCriada);
    };
    editarEncomenda = async (req, res) => {
        const codigo = res.locals.codigo;
        const data = req.body;
        const encomendaEditada = await this.services.editar(codigo, data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.ENCOMENDA_EDITAR_SUCESS, encomendaEditada);
    };
    excluirEncomenda = async (req, res) => {
        const codigo = res.locals.codigo;
        const encomendaExcluida = await this.services.excluir(codigo);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.ENCOMENDA_EXCLUIR_SUCESS, encomendaExcluida);
    };
}
exports.EncomendasController = EncomendasController;
//# sourceMappingURL=encomendas.controller.js.map