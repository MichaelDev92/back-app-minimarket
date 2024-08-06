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
exports.addCategory = exports.getCategoryById = exports.getCategories = exports.addProduct = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const connection_1 = __importDefault(require("../db/connection"));
const util_1 = require("../utils/util");
const tipo_producto_1 = __importDefault(require("../models/tipo_producto"));
const cliente_1 = __importDefault(require("../models/cliente"));
const producto_cliente_1 = __importDefault(require("../models/producto_cliente"));
const producto_1 = __importDefault(require("../models/producto"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.slice(7).split('.')[1];
    console.log("token data client: ", token);
    const tokenDecoded = JSON.parse(Buffer.from(token, 'base64').toString());
    let _id = tokenDecoded.id;
    let productos = null;
    connection_1.default.query('CALL ListarProductosCliente(:id)', { replacements: { id: _id } })
        .then(response => {
        productos = response;
        res.status(200).json({ productos });
    })
        .catch(error => {
        res.status(412).json({ msg: error });
    });
});
exports.getProducts = getProducts;
// export const getProductsByCategory = async (req: Request, res: Response) =>{
// }
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.slice(7).split('.')[1];
    console.log("token data client: ", token);
    const tokenDecoded = JSON.parse(Buffer.from(token, 'base64').toString());
    let { body } = req;
    const product = producto_1.default.create(body);
    if (!product) {
        return res.status(412).json({ msg: "Error al crear producto" });
    }
    const client = yield cliente_1.default.findOne({
        where: { id: tokenDecoded.id }
    });
    if (!client) {
        return res.status(412).json({ msg: "Cliente no encontrado" });
    }
    const productClient = producto_cliente_1.default.create(body);
    if (!productClient) {
        return res.status(412).json({ msg: "Error al crear producto cliente" });
    }
    return res.status(200).json({ msg: 'Producto creado con éxito.' });
});
exports.addProduct = addProduct;
// export const updateProduct = async (req: Request, res: Response) =>{
// }
// export const deleteProduct = async (req: Request, res: Response) =>{
// }
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield tipo_producto_1.default.findAll();
    if (!categorias) {
        return res.status(404).json({ msg: 'No se encontraron categorias' });
    }
    else
        return res.status(202).json({ categorias });
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (!results.isEmpty()) {
        return res.status(400).json(results.array);
    }
    const categoria = yield tipo_producto_1.default.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!categoria) {
        return res.status(404).json({ message: 'No se encontró categoria' });
    }
    else {
        return res.status(202).json({ categoria });
    }
});
exports.getCategoryById = getCategoryById;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(500).json(result['errors']);
    }
    const exist = yield tipo_producto_1.default.findOne({
        where: {
            descripcion: req.body.descripcion
        }
    });
    if (exist) {
        return res.status(400).json({ message: 'Ya existe una categoria con este mismo nombre' });
    }
    const fechaHoy = (0, util_1.crearFechaFormateada)();
    try {
        const completebody = Object.assign(Object.assign({}, req.body), { created_at: fechaHoy, updated_at: fechaHoy });
        const categoria = yield tipo_producto_1.default.create(completebody);
        if (!categoria) {
            return res.status(500).json({ message: 'Error al crear categoria' });
        }
        return res.status(200).json({ categoria, msg: 'Categoria creada con éxito.' });
    }
    catch (error) {
        return res.status(412).json({ msg: error });
    }
});
exports.addCategory = addCategory;
