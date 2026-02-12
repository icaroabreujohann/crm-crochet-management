"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("./clientes.controller");
const valida_param_1 = require("../../middlewares/valida-param");
const router = (0, express_1.Router)();
const controller = new clientes_controller_1.ClientesController();
router.get('/', controller.listarClientes);
router.get('/:id', valida_param_1.validaIdParam, controller.listarClientePorId);
router.post('/', controller.criarCliente);
router.patch('/:id', valida_param_1.validaIdParam, controller.editarCliente);
router.delete('/:id', valida_param_1.validaIdParam, controller.excluirCliente);
exports.default = router;
//# sourceMappingURL=clientes.router.js.map