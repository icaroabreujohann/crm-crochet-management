import { Request, Response, NextFunction } from 'express'
import { CODIGOS_ERRO } from '../utils/codigosRespostas'
import { ErroCustomizado } from '../errors/erro.customizado'

export function validaIdParam(req: Request, res: Response, next: NextFunction) {
     const idParam = req.params.id
     const id = Number(idParam)

     if (!Number.isInteger(id) || id <= 0) throw new ErroCustomizado(CODIGOS_ERRO.ID_INVALIDO, { id }, 400)

     req.params.id = String(id)
     next()
}
