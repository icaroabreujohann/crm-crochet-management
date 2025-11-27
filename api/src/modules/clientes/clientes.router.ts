import { Router } from 'express'
import { ClientesController } from './clientes.controller'

const router = Router()
const controller = new ClientesController()

router.get('/', controller.listarClientes)
router.get('/teste/:id', controller.listarClientePorId)

export default router