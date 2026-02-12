"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encomendas_controller_1 = require("./encomendas.controller");
const valida_param_1 = require("../../middlewares/valida-param");
const router = (0, express_1.Router)();
const controller = new encomendas_controller_1.EncomendasController();
router.get('/', controller.listarEncomendas);
router.get('/:codigo/completa', valida_param_1.validaCodigoParam, controller.listarEncomendaCompleta);
router.post('/', controller.criarEncomenda);
router.patch('/:codigo', valida_param_1.validaCodigoParam, controller.editarEncomenda);
router.delete('/:codigo', valida_param_1.validaCodigoParam, controller.excluirEncomenda);
exports.default = router;
//# sourceMappingURL=encomendas.router.js.map