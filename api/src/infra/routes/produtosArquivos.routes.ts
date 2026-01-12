import { Router } from 'express'
import path from 'path'
import fs from 'fs'

const router = Router()
import { PRODUTOS_DIR } from '../upload/paths'
import { gerenciadorMensagens } from '../../utils/respostas/gerenciador-resposta'
import { CODIGOS_SUCESSO } from '../../utils/respostas/codigos-resposta'

router.get('/:codigo', (req, res) => {
     const dir = path.join(PRODUTOS_DIR, req.params.codigo)
     if (!fs.existsSync(dir)) return res.json([])

     const arquivos = fs.readdirSync(dir)
     const urls = arquivos.map(nome => `${req.protocol}://${req.get('host')}/arquivos/produtos/${req.params.codigo}/${nome}`)
     
     gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.PRODUTO_LISTAR_FOTOS_SUCESS, urls)
})

router.get('/:codigo/:arquivo', (req, res) => {
     const filePath = path.join(PRODUTOS_DIR, req.params.codigo, req.params.arquivo)
     if (!fs.existsSync(filePath)) return res.status(404).send('Arquivo não encontrado')
     res.sendFile(filePath)
})

export default router