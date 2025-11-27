import { Router } from 'express'
import { ClientesController } from './clientes.controller'

const router = Router()
const controller = new ClientesController()

router.get('/', controller.listarClientes)
router.get('/:id', controller.listarClientePorId)
router.post('/', controller.criarCliente)

export default router