"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirPasta = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const excluirPasta = async (caminho, pasta) => {
    const pastaParaRemover = path_1.default.join(caminho, pasta);
    await promises_1.default.rm(pastaParaRemover, { recursive: true, force: true });
};
exports.excluirPasta = excluirPasta;
//# sourceMappingURL=excluir-pasta.js.map