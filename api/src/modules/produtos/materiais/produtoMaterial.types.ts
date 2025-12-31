export interface ProdutoMaterialView {
     id: number,
     produto_id: number,
     material_id: number,
     material_nome: string,
     quantidade: number,
     preco_final: number
}
export interface ProdutoMaterialDB {
     id: number,
     produto_id: number,
     material_id: number,
     quantidade: number,
     preco_final: number
}

export interface ProdutoMaterialCriarDTO {
     material_codigo: string
     quantidade: number
}

export interface ProdutoMaterialCriarDB {
     produto_id: number,
     material_id: number,
     quantidade: number,
     preco_final: number
}

export interface ProdutoMaterialEditarDB {
     produto_id: number,
     material_id: number,
     quantidade: number,
     preco_final: number
}