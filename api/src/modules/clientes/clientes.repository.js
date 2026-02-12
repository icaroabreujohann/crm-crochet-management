"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesRepository = void 0;
const db_1 = require("../../config/db");
const normalizadores_1 = require("../../utils/normalizadores");
const resultadoBusca_1 = require("../../utils/resultadoBusca");
class ClientesRepository {
    async listar() {
        return await (0, db_1.sql) `select * from clientes order by id desc`;
    }
    async listarPorId(id) {
        const [cliente] = await (0, db_1.sql) `
               select * from clientes
               where id = ${id}
               limit 1

               `;
        return cliente ? (0, resultadoBusca_1.resultadoEncontrado)(cliente) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async listarClientePorInstagram(instagram) {
        const [cliente] = await (0, db_1.sql) `
               select * from clientes
               where instagram = ${instagram}
               limit 1
          `;
        return cliente ? (0, resultadoBusca_1.resultadoEncontrado)(cliente) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async listarClientePorTelefone(telefone) {
        const [cliente] = await (0, db_1.sql) `
               select * from clientes
               where telefone = ${telefone}
               limit 1
          `;
        return cliente ? (0, resultadoBusca_1.resultadoEncontrado)(cliente) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async criar(data) {
        const [clienteNovo] = await (0, db_1.sql) `
          insert into clientes (nome, instagram, telefone)
          values (
               ${data.nome},
               ${(0, normalizadores_1.normalizaTexto)(data.instagram)},
               ${(0, normalizadores_1.normalizaTexto)(data.telefone)}
          )
          returning *
     `;
        return clienteNovo ?? null;
    }
    async editar(id, data) {
        const [clienteAtualizado] = await (0, db_1.sql) `
          update clientes
          set 
               nome = ${data.nome},
               instagram = ${(0, normalizadores_1.normalizaTexto)(data.instagram)},
               telefone = ${(0, normalizadores_1.normalizaTexto)(data.telefone)}
          where
               id = ${id}
          returning *
     `;
        return clienteAtualizado ?? null;
    }
    async excluir(id) {
        const [clienteExcluido] = await (0, db_1.sql) `
          delete from clientes
          where id = ${id}
          returning *
     `;
        return clienteExcluido ?? null;
    }
}
exports.ClientesRepository = ClientesRepository;
//# sourceMappingURL=clientes.repository.js.map