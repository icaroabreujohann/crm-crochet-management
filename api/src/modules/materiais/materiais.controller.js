"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsController = void 0;
const gerenciador_resposta_1 = require("../../utils/respostas/gerenciador-resposta");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const valida_requisicao_1 = require("../../shared/validators/valida.requisicao");
const materiais_services_1 = require("./materiais.services");
class MaterialsController {
    service = new materiais_services_1.MateriaisServices();
    listarMateriais = async (req, res) => {
        const materiais = await this.service.listar();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.MATERIAL_LISTAR_SUCESS, materiais);
    };
    listarMaterialCodigo = async (req, res) => {
        const codigo = res.locals.codigo;
        const material = await this.service.listarPorCodigo(codigo);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.MATERIAL_LISTAR_SUCESS, material);
    };
    criarMaterial = async (req, res) => {
        const data = req.body;
        (0, valida_requisicao_1.validaRequisicao)(data, ['nome', 'tipo_id', 'unidade_medida_id', 'preco', 'quantidade']);
        const materialCriado = await this.service.criarMaterial(data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.MATERIAL_CRIAR_SUCESS, materialCriado);
    };
    editarMaterial = async (req, res) => {
        const codigo = res.locals.codigo;
        const data = req.body;
        const materialEditado = await this.service.editarMaterial(codigo, data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.MATERIAL_EDITAR_SUCESS, materialEditado);
    };
    excluirMaterial = async (req, res) => {
        const codigo = res.locals.codigo;
        const materialExcluido = await this.service.excluirMaterial(codigo);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.MATERIAL_EXCLUIR_SUCESS, materialExcluido);
    };
}
exports.MaterialsController = MaterialsController;
//# sourceMappingURL=materiais.controller.js.map