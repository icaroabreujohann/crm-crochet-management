import { Router } from 'express'
import { EncomendasController } from './encomendas.controller'
import { validaIdParam } from '../../middlewares/validaIdParam'

const router = Router()
const controller = new EncomendasController()

router.get('/', controller.listarEncomendas)

export default router
