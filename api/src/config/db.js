"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testarConexaoDb = exports.sql = void 0;
const postgres_1 = __importDefault(require("postgres"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sql = (0, postgres_1.default)(process.env.DATABASE_URL, {
    types: {
        date: {
            from: [1082], // OID do DATE
            to: 1082,
            parse: (value) => value, // DB -> JS
            serialize: (value) => value // JS -> DB
        }
    }
});
const testarConexaoDb = async () => {
    try {
        const response = await (0, exports.sql) `select now()`;
        console.log('Conexão com o DB realizada.', response);
    }
    catch (error) {
        console.log('Erro ao conectar ao DB.');
    }
};
exports.testarConexaoDb = testarConexaoDb;
module.exports = { sql: exports.sql, testarConexaoDb: exports.testarConexaoDb };
//# sourceMappingURL=db.js.map