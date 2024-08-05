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
/* importing routes */
const auth_1 = __importDefault(require("./routes/auth"));
const client_routing_1 = __importDefault(require("./routes/client-routing"));
const product_routing_1 = __importDefault(require("./routes/product-routing"));
dotenv_1.default.config({ path: './.env' });
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
        console.log("desde app.ts env: ", process.env.PORT);
        this.port = process.env.PORT || '3000';
        this.server = new http_1.default.Server(this.app);
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
