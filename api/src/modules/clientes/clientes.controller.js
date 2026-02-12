"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
const clientes_services_1 = require("../clientes/clientes.services");
const gerenciador_resposta_1 = require("../../utils/respostas/gerenciador-resposta");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const valida_requisicao_1 = require("../../shared/validators/valida.requisicao");
class ClientesController {
    service = new clientes_services_1.ClientesService();
    listarClientes = async (req, res) => {
        const response = await this.service.listarClientes();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.CLIENTE_LISTAR_SUCESS, response);
    };
    listarClientePorId = async (req, res) => {
        const id = res.locals.id;
        const response = await this.service.listarClientePorId(id);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.CLIENTE_LISTAR_SUCESS, response);
    };
    criarCliente = async (req, res) => {
        const data = req.body;
        (0, valida_requisicao_1.validaRequisicao)(data, ['nome']);
        const response = await this.service.criarCliente(data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.CLIENTE_CRIAR_SUCESS, response);
    };
    editarCliente = async (req, res) => {
        const id = res.locals.id;
        const data = req.body;
        (0, valida_requisicao_1.validaRequisicao)(data, ['nome']);
        const response = await this.service.editarCliente(id, data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.CLIENTE_EDITAR_SUCESS, response);
    };
    excluirCliente = async (req, res) => {
        const id = res.locals.id;
        const response = await this.service.excluirCliente(id);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.CLIENTE_EXCLUIR_SUCESS, response);
    };
}
exports.ClientesController = ClientesController;
//# sourceMappingURL=clientes.controller.js.map