"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProdutos = exports.criaPastaSeNaoExistir = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const criaPastaSeNaoExistir = (caminho) => {
    if (!fs_1.default.existsSync(caminho))
        fs_1.default.mkdirSync(caminho, { recursive: true });
};
exports.criaPastaSeNaoExistir = criaPastaSeNaoExistir;
exports.uploadProdutos = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Arquivo inválido'));
        }
        cb(null, true);
    }
});
//# sourceMappingURL=produtos.multer.js.map