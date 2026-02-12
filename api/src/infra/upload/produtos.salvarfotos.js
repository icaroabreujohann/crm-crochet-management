"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarFotosProduto = exports.salvarFotosProduto = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const produtos_multer_1 = require("./produtos.multer");
const salvarFotosProduto = async (codigo, fotos, caminho) => {
    const pastaProduto = path_1.default.join(caminho, codigo);
    (0, produtos_multer_1.criaPastaSeNaoExistir)(pastaProduto);
    await Promise.all([
        ...fotos.map((foto, index) => {
            const nomeArquivo = `${index + 1}.webp`;
            const destino = path_1.default.join(pastaProduto, nomeArquivo);
            return promises_1.default.writeFile(destino, foto.buffer);
        })
    ]);
};
exports.salvarFotosProduto = salvarFotosProduto;
const editarFotosProduto = async (codigo, fotos, caminho) => {
    const pastaProduto = path_1.default.join(caminho, codigo);
    (0, produtos_multer_1.criaPastaSeNaoExistir)(pastaProduto);
    const arquivosExistentes = await promises_1.default.readdir(pastaProduto);
    await Promise.all([
        ...arquivosExistentes.map((arquivo) => promises_1.default.unlink(path_1.default.join(pastaProduto, arquivo))),
        ...fotos.map((foto, index) => {
            const nomeArquivo = `${index + 1}.webp`;
            const destino = path_1.default.join(pastaProduto, nomeArquivo);
            return promises_1.default.writeFile(destino, foto.buffer);
        })
    ]);
};
exports.editarFotosProduto = editarFotosProduto;
//# sourceMappingURL=produtos.salvarfotos.js.map