"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const clientes_router_1 = __importDefault(require("./modules/clientes/clientes.router"));
const produtos_router_1 = __importDefault(require("./modules/produtos/produtos.router"));
const materiais_router_1 = __importDefault(require("./modules/materiais/materiais.router"));
const encomendas_router_1 = __importDefault(require("./modules/encomendas/encomendas.router"));
const cadastros_router_1 = __importDefault(require("./modules/cadastros/cadastros.router"));
const produtosArquivos_routes_1 = __importDefault(require("./infra/routes/produtosArquivos.routes"));
const relatorios_router_1 = __importDefault(require("./modules/relatorios/relatorios.router"));
const erro_global_1 = require("./middlewares/erro-global");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/clientes', clientes_router_1.default);
app.use('/produtos', produtos_router_1.default);
app.use('/materiais', materiais_router_1.default);
app.use('/encomendas', encomendas_router_1.default);
app.use('/cadastros', cadastros_router_1.default);
app.use('/arquivos/produtos', produtosArquivos_routes_1.default);
app.use('/relatorios', relatorios_router_1.default);
app.use(erro_global_1.erroGlobal);
app.get('/', async (req, res) => {
    res.send('<h1>teste</h1>');
});
const iniciarApi = async () => {
    try {
        await (0, db_1.testarConexaoDb)();
        app.listen(port, () => {
            console.log('A API está rodando na porta', port);
        });
    }
    catch (error) {
        console.log('Erro ao iniciar a API', error);
    }
};
iniciarApi();
//# sourceMappingURL=app.js.map