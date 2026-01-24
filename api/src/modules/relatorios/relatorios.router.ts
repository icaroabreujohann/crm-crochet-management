import { Router } from 'express'
import { RelatoriosController } from './relatorios.controller'

const router = Router()
const controller = new RelatoriosController()

router.get('/encomendas/mensal', controller.listarEncomendasResumoMensal)


export default router