"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produtos_controller_1 = require("./produtos.controller");
const valida_param_1 = require("../../middlewares/valida-param");
const produtos_multer_1 = require("../../infra/upload/produtos.multer");
const router = (0, express_1.Router)();
const controller = new produtos_controller_1.ProdutosController();
//Principal
router.get('/', controller.listarProdutos);
router.get('/:codigo/completo', valida_param_1.validaCodigoParam, controller.listarProdutoCompleto);
router.get('/:codigo', valida_param_1.validaCodigoParam, controller.listarProdutoCodigo);
router.post('/', produtos_multer_1.uploadProdutos.array('fotos'), controller.criarProduto);
router.patch('/:codigo', valida_param_1.validaCodigoParam, controller.editarProduto);
router.post('/:codigo/fotos', valida_param_1.validaCodigoParam, produtos_multer_1.uploadProdutos.array('fotos'), controller.editarFotosProduto);
router.delete('/:codigo', valida_param_1.validaCodigoParam, controller.excluirProduto);
exports.default = router;
//# sourceMappingURL=produtos.router.js.map