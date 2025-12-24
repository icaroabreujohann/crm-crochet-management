import { Router } from 'express'
import { TiposMateriaisController } from './tiposMateriais/tipos.materiais.controller'
import { UnidadesMedidaController } from './unidadesMedida/unidades.medida.controller'

const router = Router()
const controllerTiposMateriais = new TiposMateriaisController()
const controllerUnidadesMedida = new UnidadesMedidaController()

router.get('/tipos_materiais', controllerTiposMateriais.listar)
router.get('/unidades_medida', controllerUnidadesMedida.listar)

export default router