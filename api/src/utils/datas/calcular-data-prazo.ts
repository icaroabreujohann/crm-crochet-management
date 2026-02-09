import { CODIGOS_ERRO } from "../respostas/codigos-resposta"
import { gerenciadorMensagens } from "../respostas/gerenciador-resposta"

export function calcularDataPrazo(
     data_pedido: string | Date,
     data_prazo: string | Date | null,
     dias: number
): string {
     const pedido =
          typeof data_pedido === 'string'
               ? new Date(`${data_pedido}T00:00:00`)
               : new Date(data_pedido)

     if (isNaN(pedido.getTime())) { gerenciadorMensagens.criarMensagemErro(CODIGOS_ERRO.DADO_TIPO_INVALIDO, pedido) }

     if (data_prazo == null || data_prazo == '') {
          const prazo = new Date(pedido)
          prazo.setDate(prazo.getDate() + dias)
          return String(prazo)
     }

     if (data_prazo) {
          const prazo =
               typeof data_prazo === 'string'
                    ? new Date(`${data_prazo}T00:00:00`)
                    : new Date(data_prazo)

          if (isNaN(prazo.getTime())) { gerenciadorMensagens.criarMensagemErro(CODIGOS_ERRO.DADO_TIPO_INVALIDO, prazo) }

          return String(prazo)
     }

     return ''
}