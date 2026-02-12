"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnidadesMedidaController = void 0;
const codigos_resposta_1 = require("../../../utils/respostas/codigos-resposta");
const gerenciador_resposta_1 = require("../../../utils/respostas/gerenciador-resposta");
const unidades_medida_services_1 = require("./unidades.medida.services");
class UnidadesMedidaController {
    services = new unidades_medida_services_1.UnidadesMedidaServices();
    listar = async (req, res) => {
        const response = await this.services.listar();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.UNIDADE_MEDIDA_LISTAR_SUCESS, response);
    };
}
exports.UnidadesMedidaController = UnidadesMedidaController;
//# sourceMappingURL=unidades.medida.controller.js.map