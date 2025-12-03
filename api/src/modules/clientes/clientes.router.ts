import { Router } from 'express'
import { ClientesController } from './clientes.controller'
import { validaIdParam } from '../../middlewares/validaParam'

const router = Router()
const controller = new ClientesController()

router.get('/', controller.listarClientes)
router.get('/:id', validaIdParam, controller.listarClientePorId)
router.post('/', controller.criarCliente)
router.patch('/:id', validaIdParam, controller.editarCliente)
router.delete('/:id', validaIdParam, controller.excluirCliente)

export default router