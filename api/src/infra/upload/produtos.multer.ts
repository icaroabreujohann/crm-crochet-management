import fs from 'fs'
import multer from 'multer'
import { PRODUTOS_TMP_DIR } from './paths'
import path from 'path'
import { randomUUID } from 'crypto'

export const criaPastaSeNaoExistir = (caminho: string) => {
     if (!fs.existsSync(caminho)) fs.mkdirSync(caminho, { recursive: true })
}

export const uploadProdutos = multer({
     storage: multer.diskStorage({
          destination: PRODUTOS_TMP_DIR,
          filename: (req, file, cb) => {
               const ext = path.extname(file.originalname)
               cb(null, `${randomUUID()}${ext}`)
          }
     })
})