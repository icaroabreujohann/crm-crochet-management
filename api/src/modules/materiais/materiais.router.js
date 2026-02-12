"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const valida_param_1 = require("../../middlewares/valida-param");
const materiais_controller_1 = require("./materiais.controller");
const router = (0, express_1.Router)();
const controller = new materiais_controller_1.MaterialsController();
router.get('/', controller.listarMateriais);
router.get('/:codigo', valida_param_1.validaCodigoParam, controller.listarMaterialCodigo);
router.post('/', controller.criarMaterial);
router.patch('/:codigo', valida_param_1.validaCodigoParam, controller.editarMaterial);
router.delete('/:codigo', valida_param_1.validaCodigoParam, controller.excluirMaterial);
exports.default = router;
//# sourceMappingURL=materiais.router.js.map