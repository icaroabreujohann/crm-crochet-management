"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUTOS_TMP_DIR = exports.PRODUTOS_DIR_API = exports.PRODUTOS_DIR = exports.DIR_BASE = void 0;
const path_1 = __importDefault(require("path"));
exports.DIR_BASE = path_1.default.resolve(__dirname, '../../../arquivos/');
exports.PRODUTOS_DIR = path_1.default.join(exports.DIR_BASE, 'produtos');
exports.PRODUTOS_DIR_API = `/arquivos/produtos`;
exports.PRODUTOS_TMP_DIR = path_1.default.join(exports.DIR_BASE, 'tmp', 'produtos');
//# sourceMappingURL=paths.js.map