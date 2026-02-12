"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirArquivosPasta = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const excluirArquivosPasta = async (caminho) => {
    const arquivos = await promises_1.default.readdir(caminho);
    await Promise.all(arquivos.map(arquivo => promises_1.default.rm(path_1.default.join(caminho, arquivo), { recursive: true, force: true })));
};
exports.excluirArquivosPasta = excluirArquivosPasta;
//# sourceMappingURL=excluir-arquivos-pasta.js.map