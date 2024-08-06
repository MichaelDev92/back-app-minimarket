"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./db/connection"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/* importing routes */
const auth_1 = __importDefault(require("./routes/auth"));
const client_routing_1 = __importDefault(require("./routes/client-routing"));
const product_routing_1 = __importDefault(require("./routes/product-routing"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.apiPaths = {
            clients: '/api/clients',
            auth: '/api/auth',
            products: '/api/products'
        };
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.port = Number(process.env.PORT) || 8080;
        this.server = new http_1.default.Server(this.app);
        this.initMorgan();
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // CORS features
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                const ACCEPTED_ORIGINS = [
                    'http://localhost:5173',
                ];
                if (ACCEPTED_ORIGINS.map(item => item === origin)) {
                    return callback(null, true);
                }
                if (!origin) {
                    return callback(null, true);
                }
                return callback(new Error('Not allowed by cors'));
            }
        }));
        // Body reading 
        this.app.use(express_1.default.json());
        // Gives use to Express the public folder
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        // API routes
        this.app.use(this.apiPaths.clients, client_routing_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.products, product_routing_1.default);
        this.app.disable('x-powered-by');
    }
    initMorgan() {
        const logDirectory = path_1.default.join(__dirname, 'logs');
        try {
            fs_1.default.accessSync(logDirectory, fs_1.default.constants.W_OK);
            console.log('Permisos de escritura verificados en el directorio de logs.');
        }
        catch (_error) {
            console.error('No se puede escribir en el directorio de logs:', _error.message);
        }
        const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(logDirectory, 'access.log'), { flags: 'a' });
        this.app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database connected...');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = Server;
