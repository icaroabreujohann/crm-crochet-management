import { Router } from 'express'
import { RelatoriosController } from './relatorios.controller'

const router = Router()
const controller = new RelatoriosController()

router.get('/encomendas/mensal/resumo', controller.listarEncomendasResumoMensal)
router.get('/encomendas/mensal/faturamento', controller.listarEncomendasFaturamentoMensal)


export default router