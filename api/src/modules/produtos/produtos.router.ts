import { Router } from 'express'
import { ProdutosController } from './produtos.controller'
import { validaCodigoParam, validaIdParam } from '../../middlewares/validaParam'
import { uploadProdutos } from '../../infra/upload/produtos.multer'

const router = Router()
const controller = new ProdutosController()

router.get('/', controller.listarProdutos)
router.get('/:id', validaIdParam, controller.listarProdutoPorId)
router.post('/', uploadProdutos.array('fotos'), controller.criarProduto)
router.patch('/:id', validaIdParam, controller.editarProduto)
router.delete('/:id/:codigo', validaIdParam, validaCodigoParam, controller.excluirProduto)

export default router