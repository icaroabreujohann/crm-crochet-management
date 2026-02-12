"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaIdParam = validaIdParam;
exports.validaCodigoParam = validaCodigoParam;
const codigos_resposta_1 = require("../utils/respostas/codigos-resposta");
const erro_customizado_1 = require("../types/erro.customizado");
const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
function validaIdParam(req, res, next) {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0)
        throw new erro_customizado_1.ErroCustomizado(codigos_resposta_1.CODIGOS_ERRO.ID_INVALIDO, { id }, 400);
    res.locals.id = Number(id);
    next();
}
function validaCodigoParam(req, res, next) {
    const { codigo } = req.params;
    if (!codigo || !UUID_REGEX.test(codigo))
        throw new erro_customizado_1.ErroCustomizado(codigos_resposta_1.CODIGOS_ERRO.CODIGO_INVALIDO, { codigo }, 400);
    res.locals.codigo = String(codigo);
    next();
}
//# sourceMappingURL=valida-param.js.map