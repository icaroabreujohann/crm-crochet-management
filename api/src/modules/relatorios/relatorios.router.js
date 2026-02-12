"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const relatorios_controller_1 = require("./relatorios.controller");
const router = (0, express_1.Router)();
const controller = new relatorios_controller_1.RelatoriosController();
router.get('/encomendas/mensal/resumo', controller.listarEncomendasResumoMensal);
router.get('/encomendas/mensal/faturamento', controller.listarEncomendasFaturamentoMensal);
router.get('/produtos/total/categoria', controller.listarProdutoCategoria);
exports.default = router;
//# sourceMappingURL=relatorios.router.js.map