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
exports.addCategory = exports.getCategoryById = exports.getCategories = exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProductsByCategory = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const connection_1 = __importDefault(require("../db/connection"));
const util_1 = require("../utils/util");
const tipo_producto_1 = __importDefault(require("../models/tipo_producto"));
const cliente_1 = __importDefault(require("../models/cliente"));
const producto_cliente_1 = __importDefault(require("../models/producto_cliente"));
const producto_1 = __importDefault(require("../models/producto"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.slice(7).split('.')[1];
    console.log("token data client: ", token);
    const tokenDecoded = JSON.parse(Buffer.from(token, 'base64').toString());
    let _id = tokenDecoded.client.id;
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
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = req;
    console.log(body);
    res.status(200);
});
exports.getProductsByCategory = getProductsByCategory;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.slice(7).split('.')[1];
    console.log("token data client: ", token);
    const tokenDecoded = JSON.parse(Buffer.from(token, 'base64').toString());
    let { body } = req;
    const dataImages = body.images;
    const fechaHoy = (0, util_1.crearFechaFormateada)();
    body.images = "";
    let imagesDir = "";
    let fullBody = Object.assign(Object.assign({}, body), { created_at: fechaHoy, updated_at: fechaHoy });
    const productOK = yield producto_1.default.create(fullBody);
    if (!productOK) {
        return res.status(412).json({ msg: "Error al crear producto" });
    }
    const directdir = path_1.default.resolve(__dirname, '../public');
    const targetPath = path_1.default.join(directdir, tokenDecoded.client.nit, String(productOK.dataValues['id']));
    const dir = path_1.default.resolve(targetPath);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
        console.log(`directorio ${dir} creado.`);
    }
    else
        console.log(`ya existe el directorio ${dir}`);
    if (dataImages !== "" && dataImages.includes('!')) {
        const images = dataImages.split(',');
        images.map((img) => {
            const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const imgUUID = (0, uuid_1.v4)();
            const simplifiedUUID = imgUUID.replace('-', '');
            const imgPath = path_1.default.join(dir, simplifiedUUID + '.jpg');
            imagesDir += imgPath + ",";
            fs_1.default.writeFileSync(imgPath, buffer);
        });
        const updatedProductImages = yield producto_1.default.update({ images: imagesDir }, {
            where: { id: productOK.dataValues['id'] }
        });
        console.log(updatedProductImages);
    }
    else if (dataImages !== "") {
        const base64Data = dataImages.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const imgUUID = (0, uuid_1.v4)();
        const simplifiedUUID = imgUUID.replace("-", "");
        const imgPath = path_1.default.join(dir, simplifiedUUID + ".jpg");
        fs_1.default.writeFileSync(imgPath, buffer);
        const updatedProductImages = yield producto_1.default.update({ images: imgPath }, {
            where: { id: productOK.dataValues['id'] }
        });
        console.log(updatedProductImages);
    }
    else
        console.log("no hay imagenes para subir");
    const client = yield cliente_1.default.findOne({
        where: { id: tokenDecoded.client.id }
    });
    if (!client) {
        return res.status(412).json({ msg: "Cliente no encontrado" });
    }
    let bodyProductClient = {
        cliente_id: client.dataValues['id'],
        producto_id: productOK.dataValues['id']
    };
    const productClient = producto_cliente_1.default.create(bodyProductClient);
    if (!productClient) {
        return res.status(412).json({ msg: "Error al crear producto cliente" });
    }
    return res.status(200).json({ msg: 'Producto creado con éxito.' });
});
exports.addProduct = addProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = req;
    console.log(body);
    res.status(200);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = req;
    console.log(body);
    res.status(200);
});
exports.deleteProduct = deleteProduct;
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield tipo_producto_1.default.findAll();
    if (!categorias) {
        return res.status(404).json({ msg: 'No se encontraron categorias' });
    }
    categorias.map(cat => {
        delete cat.dataValues['created_at'];
        delete cat.dataValues['updated_at'];
    });
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
