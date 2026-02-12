"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateriaisRepository = void 0;
const db_1 = require("../../config/db");
const resultadoBusca_1 = require("../../utils/resultadoBusca");
const normalizadores_1 = require("../../utils/normalizadores");
class MateriaisRepository {
    async listar() {
        return await (0, db_1.sql) `
               select
                    mat.*,
                    um.sigla as unidade_medida_sigla,
                    mt.nome as tipo_nome
               from materiais mat
               join materiais_tipos mt 
                    on mat.tipo_id = mt.id
               join unidades_medida um 
                    on um.id = mat.unidade_medida_id
               order by mat.id desc
          `;
    }
    async listarMaterialPorCodigo(codigo) {
        const [material] = await (0, db_1.sql) `
               select
                    mat.*,
                    um.sigla as unidade_medida_sigla,
                    mt.nome as tipo_nome
               from materiais mat
               join materiais_tipos mt 
                    on mat.tipo_id = mt.id
               join unidades_medida um 
                    on um.id = mat.unidade_medida_id
               where mat.codigo = ${codigo}
          `;
        return material ? (0, resultadoBusca_1.resultadoEncontrado)(material) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async listarMaterialPorId(id) {
        const [material] = await (0, db_1.sql) `
               select
                    mat.*,
                    um.sigla as unidade_medida_sigla,
                    mt.nome as tipo_nome
               from materiais mat
               join materiais_tipos mt 
                    on mat.tipo_id = mt.id
               join unidades_medida um 
                    on um.id = mat.unidade_medida_id
               where mat.id = ${id}
          `;
        return material ? (0, resultadoBusca_1.resultadoEncontrado)(material) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async criar(data) {
        const [material] = await (0, db_1.sql) `
               insert into materiais (nome, tipo_id, unidade_medida_id, preco, quantidade, observacoes)
                    values (
                    ${data.nome},
                    ${data.tipo_id},
                    ${data.unidade_medida_id},
                    ${data.preco},
                    ${data.quantidade},
                    ${(0, normalizadores_1.normalizaTexto)(data.observacoes)}
                    )
               returning *
          `;
        return material ?? null;
    }
    async editar(id, data) {
        const [material] = await (0, db_1.sql) `
               update materiais
               set
                    nome           = coalesce(${data.nome}, nome),
                    tipo_id           = coalesce(${data.tipo_id}, tipo_id),
                    unidade_medida_id = coalesce(${data.unidade_medida_id}, unidade_medida_id),
                    preco          = coalesce(${data.preco}, preco),
                    quantidade     = coalesce(${data.quantidade}, quantidade),
                    observacoes    = coalesce(${(0, normalizadores_1.normalizaTexto)(data.observacoes)}, observacoes),
                    data_alteracao = now()
               where id = ${id}
               returning *
          `;
        return material ?? null;
    }
    async excluir(id) {
        const [materialExcluido] = await (0, db_1.sql) `
               delete from materiais
               where id = ${id}
               returning *
          `;
        return materialExcluido ?? null;
    }
}
exports.MateriaisRepository = MateriaisRepository;
//# sourceMappingURL=materiais.repository.js.map