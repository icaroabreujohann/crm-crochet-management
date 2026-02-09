import { calcularDataPrazo } from '../../utils/datas/calcular-data-prazo'
import { normalizaTexto } from '../../utils/normalizadores'
import { ProdutoMaterialView } from '../produtos/materiais/produtoMaterial.types'
import { EncomendaCriarDTO, EncomendaCriarDB, EncomendaEditarDTO, EncomendaEditarDB } from './encomendas.types'
import { EncomendaMaterialCriarDTO } from './materiais/encomendaMaterialtypes'

export const mapEncomendaCriarDTOParaDB = (
     data: EncomendaCriarDTO,
     codigo: string,
     produto_id: number
): EncomendaCriarDB => ({
     codigo,
     cliente_id: data.cliente_id,
     produto_id,

     observacoes: data.observacoes ?? '',
     status_pagamento: data.status_pagamento ?? 'pendente',
     forma_pagamento: data.forma_pagamento ?? '',
     finalizado: data.finalizado ?? false,
     entregue: data.entregue ?? false,
     local_entrega: data.local_entrega ?? '',

     data_pedido: data.data_pedido,
     data_prazo: calcularDataPrazo(data.data_pedido, data.data_prazo ?? null, 20)
})

export const mapEncomendaEditarDTOParaDB = (
     data: EncomendaEditarDTO,
     produto_id?: number
): EncomendaEditarDB => {
     const resultado: EncomendaEditarDB = {}
     
     if (data.observacoes !== undefined) {
          resultado.observacoes = normalizaTexto(data.observacoes) ?? ''
     }

     if (data.status_pagamento !== undefined) {
          resultado.status_pagamento = data.status_pagamento
     }

     if (data.forma_pagamento !== undefined) {
          resultado.forma_pagamento = normalizaTexto(data.forma_pagamento) ?? ''
     }

     if (data.finalizado !== undefined) {
          resultado.finalizado = data.finalizado
     }

     if (data.entregue !== undefined) {
          resultado.entregue = data.entregue
     }

     if (data.local_entrega !== undefined) {
          resultado.local_entrega = normalizaTexto(data.local_entrega) ?? ''
     }

     if (data.data_pedido !== undefined) {
          resultado.data_pedido = data.data_pedido
     }

     if (data.data_prazo !== undefined) {
          resultado.data_prazo = data.data_prazo
     }

     return resultado
}

export const mapProdutoMaterialParaEncomendaMaterial = (
     data: ProdutoMaterialView[]
): EncomendaMaterialCriarDTO[] => {
     const materiaisMapeados = data.map(m => ({
          material_codigo: m.codigo,
          quantidade: m.quantidade
     }))

     return materiaisMapeados
}