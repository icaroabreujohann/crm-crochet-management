import path from 'path'

export const DIR_BASE = path.resolve(
     __dirname,
     '../../../arquivos/'
)

export const PRODUTOS_DIR = path.join(DIR_BASE, 'produtos')
export const PRODUTOS_TMP_DIR = path.join(DIR_BASE, 'tmp', 'produtos')