"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateriaisServices = void 0;
const crypto_1 = require("crypto");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const assertResultadoBusca_1 = require("../../shared/asserts/assertResultadoBusca");
const materiais_repository_1 = require("./materiais.repository");
class MateriaisServices {
    repository = new materiais_repository_1.MateriaisRepository();
    async gerarCodigoMaterialUnico() {
        let codigo = (0, crypto_1.randomUUID)();
        let produtoExiste = await this.repository.listarMaterialPorCodigo(codigo);
        while (produtoExiste.existe) {
            codigo = (0, crypto_1.randomUUID)();
            produtoExiste = await this.repository.listarMaterialPorCodigo(codigo);
        }
        return codigo;
    }
    async listar() {
        return await this.repository.listar();
    }
    async listarPorCodigo(codigo) {
        const material = await this.repository.listarMaterialPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(material, codigos_resposta_1.CODIGOS_ERRO.MATERIAL_N_EXISTE_ERR, codigo);
        return material;
    }
    async criarMaterial(data) {
        const codigo = await this.gerarCodigoMaterialUnico();
        return await this.repository.criar({ ...data, codigo });
    }
    async editarMaterial(codigo, data) {
        const material = await this.repository.listarMaterialPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(material, codigos_resposta_1.CODIGOS_ERRO.MATERIAL_N_EXISTE_ERR, codigo);
        return await this.repository.editar(material.data.id, data);
    }
    async excluirMaterial(codigo) {
        const material = await this.repository.listarMaterialPorCodigo(codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(material, codigos_resposta_1.CODIGOS_ERRO.MATERIAL_N_EXISTE_ERR, codigo);
        return await this.repository.excluir(material.data.id);
    }
}
exports.MateriaisServices = MateriaisServices;
//# sourceMappingURL=materiais.services.js.map