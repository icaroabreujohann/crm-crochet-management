export interface Produto {
     id: number,
     codigo: string,
     nome: string,
     preco: number,
     fotos_url: string,
     tempo_medio: string,
     data_criacao: Date,
     data_alteracao: Date
     fotos: File[] | null
}
export interface ProdutoPayload {
     nome: string,
     preco: number,
     tempo_medio: string | null,
     fotos: File[] | null,
}

export interface ProdutoForm extends ProdutoPayload {
     codigo: string
}