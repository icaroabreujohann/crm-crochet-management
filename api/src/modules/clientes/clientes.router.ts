import { Router } from 'express'
import { ClientesController } from './clientes.controller'
import { validaIdParam } from '../../middlewares/validaIdParam'

const router = Router()
const controller = new ClientesController()

router.get('/', controller.listarClientes)
router.get('/:id', controller.listarClientePorId)
router.post('/', controller.criarCliente)
router.patch('/:id', validaIdParam, controller.editarCliente)

export default router