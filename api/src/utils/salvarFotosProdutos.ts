import fs from 'fs/promises'
import path from 'path'
import { criaPastaSeNaoExistir } from '../infra/upload/armazenamento'

export const salvarFotosProduto = async (codigo: string, fotos: Express.Multer.File[], caminho: string) => {
     const pastaProduto = path.join(caminho, codigo)
     criaPastaSeNaoExistir(pastaProduto)

     await Promise.all(
          fotos.map((foto, index) => {
               const ext = path.extname(foto.originalname)
               const nomeArquivo = `${index + 1}${ext}`

               const destino = path.join(pastaProduto, nomeArquivo)
               return fs.rename(foto.path, destino)
          })
     )
}