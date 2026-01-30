export interface EncomendaMaterialView {
     id: number,
     encomenda_id: number,
     material_codigo: string,
     material_id: number,
     material_nome: string,
     quantidade: number,
     preco_final: number,
     material_unidade_medida_sigla: number
     material_tipo_nome: string,
     preco_x_qtd: number
}
export interface EncomendaMaterialDB {
     id: number,
     encomenda_id: number,
     material_codigo: string,
     material_id: number,
     quantidade: number,
     preco_x_qtd: number
     preco_final: number
}

export interface EncomendaMaterialCriarDTO {
     material_codigo: string
     quantidade: number
}

export interface EncomendaMaterialCriarDB {
     encomenda_id: number,
     material_id: number,
     quantidade: number,
     preco_final: number
}

export interface EncomendaMaterialEditarDB {
     encomenda_id: number,
     material_id: number,
     quantidade: number,
     preco_final: number
}