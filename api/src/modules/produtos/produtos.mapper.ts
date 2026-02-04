import { CriarProdutoDTO, CriarProdutoDB, EditarProdutoDTO, EditarProdutoDB, ProdutoView, ProdutoDB } from './produtos.types'
import { converteHorasParaMinutos, converteMinutosParaHoras } from '../../utils/datas/converte-horas-minutos'

export const mapProdutoDBParaView = (produto: ProdutoDB): ProdutoView => ({
     id: produto.id,
     codigo: produto.codigo,
     nome: produto.nome,
     preco: produto.preco,
     fotos_url: produto.fotos_url,
     tempo_medio: converteMinutosParaHoras(produto.tempo_medio),
     data_criacao: produto.data_criacao,
     data_alteracao: produto.data_alteracao,
     categoria_id: produto.categoria_id,
     categoria_nome: produto.categoria_nome ?? ''
})

export const mapCriarProdutoDTOParaDB = (
     data: CriarProdutoDTO,
     codigo: string,
     fotos_url: string
): CriarProdutoDB => ({
     nome: data.nome,
     preco: data.preco,
     codigo,
     fotos_url,
     tempo_medio: converteHorasParaMinutos(
          Number(data.tempo_medio.horas),
          Number(data.tempo_medio.minutos)
     ),
     categoria_id: data.categoria_id,
})

export const mapEditarProdutoDTOparaDB = (
     data: EditarProdutoDTO
): EditarProdutoDB => {
     const resultado: EditarProdutoDB = {}
     if (data.nome !== undefined) { resultado.nome = data.nome }
     if (data.preco !== undefined) { resultado.preco = data.preco }

     if (data.tempo_medio !== undefined) {
          resultado.tempo_medio = converteHorasParaMinutos(
               Number(data.tempo_medio.horas ?? 0),
               Number(data.tempo_medio.minutos ?? 0)
          )
     }

     if(data.categoria_id !== undefined) { resultado.categoria_id = data.categoria_id}

     return resultado
}
