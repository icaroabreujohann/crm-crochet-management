import { computed, type Ref } from 'vue'
import type { EncomendaView } from '@/modules/encomendas/encomendas.types'

interface EventoAgenda {
     name: string
     start: string
     end: string
     allDay: boolean
     color: string
     encomenda_codigo: string
}

export function useAgendaEncomendas(encomendas: Ref<EncomendaView[]>) {
     const eventos = computed<EventoAgenda[]>(() => {
          return encomendas.value
               .filter(e => !!e.data_prazo)
               .map(e => ({
                    name: `${e.cliente_nome} (${e.produto_nome})`,
                    start: e.data_prazo!,
                    end: e.data_prazo!,
                    allDay: true,
                    color: e.entregue
                         ? 'blue'
                         : e.finalizado
                              ? 'grey'
                              : 'orange',
                    encomenda_codigo: e.codigo,
               }))
     })


     return { eventos }
}