"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesService = void 0;
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const valida_regranegocio_1 = require("../../shared/validators/valida.regranegocio");
const clientes_repository_1 = require("../clientes/clientes.repository");
const assertResultadoBusca_1 = require("../../shared/asserts/assertResultadoBusca");
const resultadoBusca_1 = require("../../utils/resultadoBusca");
class ClientesService {
    repository = new clientes_repository_1.ClientesRepository();
    async listarClientes() {
        return await this.repository.listar();
    }
    async listarClientePorId(id) {
        const cliente = await this.repository.listarPorId(id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(cliente, codigos_resposta_1.CODIGOS_ERRO.CLIENTE_N_EXISTE_ERR, id);
        return cliente;
    }
    async criarCliente(data) {
        const [clienteInstagram, clienteTelefone] = await Promise.all([
            data.instagram ? this.repository.listarClientePorInstagram(data.instagram) : Promise.resolve((0, resultadoBusca_1.resultadoInexistente)()),
            data.telefone ? this.repository.listarClientePorTelefone(data.telefone) : Promise.resolve((0, resultadoBusca_1.resultadoInexistente)())
        ]);
        (0, valida_regranegocio_1.validaRegraNegocio)([
            { condicao: clienteInstagram.existe, valor: clienteInstagram, codigoResposta: codigos_resposta_1.CODIGOS_ERRO.CLIENTE_EXISTE_IG_ERR },
            { condicao: clienteTelefone.existe, valor: clienteTelefone, codigoResposta: codigos_resposta_1.CODIGOS_ERRO.CLIENTE_EXISTE_TEL_ERR }
        ]);
        return await this.repository.criar(data);
    }
    async editarCliente(id, data) {
        const [clienteAtual, clienteInstagram, clienteTelefone] = await Promise.all([
            this.repository.listarPorId(id),
            data.instagram ? this.repository.listarClientePorInstagram(data.instagram) : Promise.resolve((0, resultadoBusca_1.resultadoInexistente)()),
            data.telefone ? this.repository.listarClientePorTelefone(data.telefone) : Promise.resolve((0, resultadoBusca_1.resultadoInexistente)())
        ]);
        (0, assertResultadoBusca_1.assertResultadoExiste)(clienteAtual, codigos_resposta_1.CODIGOS_ERRO.CLIENTE_N_EXISTE_ERR, { ...data, id });
        (0, valida_regranegocio_1.validaRegraNegocio)([
            { condicao: clienteInstagram.existe && clienteInstagram.data.id != id, valor: { ...data, id }, codigoResposta: codigos_resposta_1.CODIGOS_ERRO.CLIENTE_EXISTE_IG_ERR },
            { condicao: clienteTelefone.existe && clienteTelefone.data.id != id, valor: { ...data, id }, codigoResposta: codigos_resposta_1.CODIGOS_ERRO.CLIENTE_EXISTE_TEL_ERR }
        ]);
        return await this.repository.editar(id, data);
    }
    async excluirCliente(id) {
        const cliente = await this.repository.listarPorId(id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(cliente, codigos_resposta_1.CODIGOS_ERRO.CLIENTE_N_EXISTE_ERR, id);
        return await this.repository.excluir(id);
    }
}
exports.ClientesService = ClientesService;
//# sourceMappingURL=clientes.services.js.map