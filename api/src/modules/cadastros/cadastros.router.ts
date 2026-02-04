import { Router } from 'express'
import { TiposMateriaisController } from './tiposMateriais/tipos.materiais.controller'
import { UnidadesMedidaController } from './unidadesMedida/unidades.medida.controller'
import { ProdutoCategoriaController } from './produtosCategorias/produtos.categorias.controller'
import { validaIdParam } from '../../middlewares/valida-param'

const router = Router()
const controllerTiposMateriais = new TiposMateriaisController()
const controllerUnidadesMedida = new UnidadesMedidaController()
const controllerProdutoCategoria = new ProdutoCategoriaController()

router.get('/tipos_materiais', controllerTiposMateriais.listar)
router.get('/unidades_medida', controllerUnidadesMedida.listar)

router.get('/produto_categoria', controllerProdutoCategoria.listar)
router.post('/produto_categoria', controllerProdutoCategoria.criar)
router.patch('/produto_categoria/:id', validaIdParam, controllerProdutoCategoria.editar)
router.delete('/produto_categoria/:id', validaIdParam, controllerProdutoCategoria.excluir)

export default router