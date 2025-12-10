export interface EncomendaMaterial {
     id: number,
     encomenda_id: number,
     material_id: number,
     material_nome: string,
     quantidade: number,
     preco_final: number
}

export interface CriarEncomendaMaterialDTO {
     material_codigo: string
     quantidade: number
}

export interface CriarEncomendaMaterialRepoDTO {
     encomenda_id: number,
     material_id: number,
     quantidade: number,
     preco_final: number
}

export interface EditarEncomendaMaterialDTO {
     quantidade: number
}
export interface EditarEncomendaMaterialRepoDTO {
     quantidade: number,
     preco_final: number
}