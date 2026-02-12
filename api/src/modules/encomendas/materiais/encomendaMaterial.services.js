"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomendaMaterialService = void 0;
const materiais_repository_1 = require("../../materiais/materiais.repository");
const assertResultadoBusca_1 = require("../../../shared/asserts/assertResultadoBusca");
const codigos_resposta_1 = require("../../../utils/respostas/codigos-resposta");
const encomendas_repository_1 = require("../encomendas.repository");
const encomendaMaterial_repository_1 = require("./encomendaMaterial.repository");
class EncomendaMaterialService {
    repository = new encomendaMaterial_repository_1.EncomendaMaterialRepository();
    repositoryMaterial = new materiais_repository_1.MateriaisRepository();
    repositoryEncomenda = new encomendas_repository_1.EncomendasRepository();
    async adicionarMaterial(encomenda_id, data) {
        const encomenda = await this.repositoryEncomenda.listarPorId(encomenda_id);
        (0, assertResultadoBusca_1.assertResultadoExiste)(encomenda, codigos_resposta_1.CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR, encomenda_id);
        console.log(data);
        const material = await this.repositoryMaterial.listarMaterialPorCodigo(data.material_codigo);
        (0, assertResultadoBusca_1.assertResultadoExiste)(material, codigos_resposta_1.CODIGOS_ERRO.MATERIAL_N_EXISTE_ERR, data.material_codigo);
        const materialEncomenda = {
            encomenda_id: encomenda.data.id,
            material_id: material.data.id,
            quantidade: data.quantidade,
            preco_final: material.data.preco_x_qtd * data.quantidade
        };
        return await this.repository.criar(materialEncomenda);
    }
}
exports.EncomendaMaterialService = EncomendaMaterialService;
//# sourceMappingURL=encomendaMaterial.services.js.map