import fs from 'fs/promises'
import path from 'path'

export const excluirPasta = async (caminho: string, pasta: string):Promise<void> => {
     const pastaParaRemover = path.join(caminho, pasta)
     await fs.rm(pastaParaRemover, { recursive: true, force: true })
}