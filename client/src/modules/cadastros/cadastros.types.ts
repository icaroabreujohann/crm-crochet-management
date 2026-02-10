export type TipoMaterial = {
     id: number,
     nome: string
}
export type UnidadeMedida = {
     id: number,
     nome: string,
     sigla: string
}

export interface ProdutoCategoria {
     id: number,
     categoria: string
}

export interface ProdutoCategoriaForm {
     id?: number,
     categoria: string
}

export interface ProdutoCategoriaCriarDTO {
     categoria: string
}

export interface ProdutoCategoriaEditarDTO {
     id: number,
     categoria: string
}