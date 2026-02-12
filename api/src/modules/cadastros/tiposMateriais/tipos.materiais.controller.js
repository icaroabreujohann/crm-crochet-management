"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposMateriaisController = void 0;
const codigos_resposta_1 = require("../../../utils/respostas/codigos-resposta");
const gerenciador_resposta_1 = require("../../../utils/respostas/gerenciador-resposta");
const tipos_materiais_services_1 = require("./tipos.materiais.services");
class TiposMateriaisController {
    services = new tipos_materiais_services_1.TiposMateriaisServices();
    listar = async (req, res) => {
        const response = await this.services.listar();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.TIPO_MATERIAL_LISTAR_SUCESS, response);
    };
}
exports.TiposMateriaisController = TiposMateriaisController;
//# sourceMappingURL=tipos.materiais.controller.js.map