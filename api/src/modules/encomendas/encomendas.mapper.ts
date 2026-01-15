import { EncomendaCriarDTO, EncomendaCriarDB } from './encomendas.types'

export const mapEncomendaCriarDTOParaDB = (
     data: EncomendaCriarDTO,
     codigo: string,
     produto_id: number
): EncomendaCriarDB => ({
     codigo,
     cliente_id: data.cliente_id,
     produto_id,

     observacoes: data.observacoes ?? '',
     pagamento_realizado: data.pagamento_realizado ?? false,
     pagamento_forma: data.pagamento_forma ?? '',
     finalizado: data.finalizado ?? false,
     entregue: data.entregue ?? false,
     local_entrega: data.local_entrega ?? '',

     data_pedido: data.data_pedido,
     data_prazo: data.data_prazo ?? new Date(data.data_pedido.getFullYear(), data.data_pedido.getMonth(), data.data_pedido.getDate() + 20)
})
