import { Router } from 'express'
import { EncomendasController } from './encomendas.controller'
import { EncomendaMaterialController } from './materiais/encomendaMaterial.controller'
import { validaCodigoParam, validaIdParam } from '../../middlewares/validaParam'

const router = Router()
const controller = new EncomendasController()
const controllerMaterial = new EncomendaMaterialController()

router.get('/', controller.listar)
router.get('/:codigo/completa', validaCodigoParam, controller.listarCompleta)
router.get('/:codigo', validaCodigoParam, controller.listarPorCodigo)
router.post('/', controller.criarEncomenda)
router.patch('/:codigo', validaCodigoParam, controller.editarEncomenda)
router.delete('/:codigo', validaCodigoParam, controller.excluirEncomenda)

//Materiais

router.get('/:codigo/materiais', validaCodigoParam, controllerMaterial.listarPorEncomenda)
router.post('/:codigo/materiais', validaCodigoParam, controllerMaterial.adicionarMaterialEncomenda)
router.patch('/:codigo/materiais/:id', validaCodigoParam, validaIdParam, controllerMaterial.editarMaterialEncomenda)
router.delete('/:codigo/materiais/:id', validaCodigoParam, validaIdParam, controllerMaterial.excluirMaterialEncomenda)

export default router