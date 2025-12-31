import { Router } from 'express'
import { ProdutosController } from './produtos.controller'
import { validaCodigoParam } from '../../middlewares/valida-param'
import { uploadProdutos } from '../../infra/upload/produtos.multer'

const router = Router()
const controller = new ProdutosController()


//Principal
router.get('/', controller.listarProdutos)
router.get('/:codigo/completo', validaCodigoParam, controller.listarProdutoCompleto)
router.get('/:codigo', validaCodigoParam, controller.listarProdutoCodigo)
router.post('/', uploadProdutos.array('fotos'), controller.criarProduto)
router.patch('/:codigo', validaCodigoParam, controller.editarProduto)
router.post('/:codigo/fotos', validaCodigoParam, uploadProdutos.array('fotos'), controller.editarFotosProduto)
router.delete('/:codigo', validaCodigoParam, controller.excluirProduto)

export default router