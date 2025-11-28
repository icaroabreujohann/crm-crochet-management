export interface Encomenda {
     id: number
     titulo: string
     clienteId: number
     clienteNome: string
     notas: string | null
     precoTotal: number
     dataInclusao: Date
     dataPrazo: Date
     dataEntrega: Date | null
     dataCriacao: Date
}

export interface CriarEncomendaDTO {
     titulo: string
     clienteId: number
     clienteNome: string | null
     notas: string | null
     precoTotal: number | null
     dataPrazo: Date
     dataEntrega: Date | null
}
export interface EditarEncomendaDTO {
     titulo: string
     notas: string | null
     precoTotal: number | null
     dataPrazo: Date
     dataEntrega: Date | null
}