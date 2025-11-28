import { Router } from 'express'
import { EncomendasController } from './encomendas.controller'
import { validaIdParam } from '../../middlewares/validaIdParam'

const router = Router()
const controller = new EncomendasController()

router.get('/', controller.listarEncomendas)
router.get('/:id', validaIdParam, controller.listarEncomendaPorId)
router.post('/', controller.criarEncomenda)
router.patch('/:id', validaIdParam, controller.editarEncomenda)
router.delete('/:id', validaIdParam, controller.excluirEncomenda)

export default router
