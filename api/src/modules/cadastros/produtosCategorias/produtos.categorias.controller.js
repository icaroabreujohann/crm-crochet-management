"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoCategoriaController = void 0;
const produtos_categorias_services_1 = require("./produtos.categorias.services");
const gerenciador_resposta_1 = require("../../../utils/respostas/gerenciador-resposta");
const codigos_resposta_1 = require("../../../utils/respostas/codigos-resposta");
const valida_requisicao_1 = require("../../../shared/validators/valida.requisicao");
class ProdutoCategoriaController {
    services = new produtos_categorias_services_1.ProdutoCategoriaServices();
    listar = async (req, res) => {
        const categorias = await this.services.listar();
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_CATEGORIA_LISTAR_SUCESS, categorias);
    };
    criar = async (req, res) => {
        const data = req.body;
        (0, valida_requisicao_1.validaRequisicao)(data, ['categoria']);
        const categoriaCriada = await this.services.criar(data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 201, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_CATEGORIA_CRIAR_SUCESS, categoriaCriada);
    };
    editar = async (req, res) => {
        const id = res.locals.id;
        const data = { id, ...req.body };
        (0, valida_requisicao_1.validaRequisicao)(data, ['categoria']);
        const categoriaEditada = await this.services.editar(data);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_CATEGORIA_EDITAR_SUCESS, categoriaEditada);
    };
    excluir = async (req, res) => {
        const id = res.locals.id;
        const categoriaExcluida = await this.services.excluir(id);
        gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_CATEGORIA_EXCLUIR_SUCESS, categoriaExcluida);
    };
}
exports.ProdutoCategoriaController = ProdutoCategoriaController;
//# sourceMappingURL=produtos.categorias.controller.js.map