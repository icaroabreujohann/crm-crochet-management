"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipos_materiais_controller_1 = require("./tiposMateriais/tipos.materiais.controller");
const unidades_medida_controller_1 = require("./unidadesMedida/unidades.medida.controller");
const produtos_categorias_controller_1 = require("./produtosCategorias/produtos.categorias.controller");
const valida_param_1 = require("../../middlewares/valida-param");
const router = (0, express_1.Router)();
const controllerTiposMateriais = new tipos_materiais_controller_1.TiposMateriaisController();
const controllerUnidadesMedida = new unidades_medida_controller_1.UnidadesMedidaController();
const controllerProdutoCategoria = new produtos_categorias_controller_1.ProdutoCategoriaController();
router.get('/tipos_materiais', controllerTiposMateriais.listar);
router.get('/unidades_medida', controllerUnidadesMedida.listar);
router.get('/produto_categoria', controllerProdutoCategoria.listar);
router.post('/produto_categoria', controllerProdutoCategoria.criar);
router.patch('/produto_categoria/:id', valida_param_1.validaIdParam, controllerProdutoCategoria.editar);
router.delete('/produto_categoria/:id', valida_param_1.validaIdParam, controllerProdutoCategoria.excluir);
exports.default = router;
//# sourceMappingURL=cadastros.router.js.map