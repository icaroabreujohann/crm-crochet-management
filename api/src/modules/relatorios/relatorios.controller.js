"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatoriosController = void 0;
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const gerenciador_resposta_1 = require("../../utils/respostas/gerenciador-resposta");
const relatorios_services_1 = require("./relatorios.services");
class RelatoriosController {
    services;
    constructor(services = new relatorios_services_1.RelatoriosServices()) {
        this.services = services;
    }
    listarEncomendasResumoMensal = async (req, res) => {
        const relatorio = await this.services.listarEncomendasResumoMensal();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.RELATORIO_LISTAR_SUCESS, relatorio);
    };
    listarEncomendasFaturamentoMensal = async (req, res) => {
        const relatorio = await this.services.listarEncomendasFaturamentoMensal();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.RELATORIO_LISTAR_SUCESS, relatorio);
    };
    listarProdutoCategoria = async (req, res) => {
        const relatorio = await this.services.listarProdutoCategoria();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.RELATORIO_LISTAR_SUCESS, relatorio);
    };
}
exports.RelatoriosController = RelatoriosController;
//# sourceMappingURL=relatorios.controller.js.map