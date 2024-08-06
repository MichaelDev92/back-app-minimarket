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
exports.deleteCliente = exports.putCliente = exports.postCliente = exports.getClienteByNit = exports.getClientes = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const express_validator_1 = require("express-validator");
const connection_1 = __importDefault(require("../db/connection"));
const util_1 = require("../utils/util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (!results.isEmpty()) {
        return res.status(400).json(results.array);
    }
    let _nit = req.query.nombre;
    let _nombre = req.query.apellidos;
    let _correo = req.query.numero_documento;
    let _telefono = req.query.correo;
    let _estado = req.query.celular;
    let clientes = null;
    return connection_1.default.query('CALL ListarClientes(:nit, :nombre, :correo, :telefono, :estado)', { replacements: { nit: _nit, nombre: _nombre, correo: _correo, telefono: _telefono, estado: _estado } })
        .then(response => {
        clientes = response;
        if (clientes.length > 0) {
            return res.status(200).json({ clientes });
        }
        else {
            return res.status(500).json({ msg: 'No se encontraron resultados.' });
        }
    })
        .catch(error => {
        return res.status(400).json(error);
    });
});
exports.getClientes = getClientes;
const getClienteByNit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (!results.isEmpty()) {
        return res.status(500).json(results['errors'][0]);
    }
    let _nit = req.query.nit;
    const cliente = yield cliente_1.default.findOne({
        where: {
            nit: _nit
        }
    });
    if (cliente) {
        return res.status(200).json(cliente);
    }
    else {
        return res.status(500).json({ msg: 'No se pudo encontrar el cliente.' });
    }
});
exports.getClienteByNit = getClienteByNit;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(500).json(result['errors']);
    }
    let completeBody = {};
    const { body } = req;
    console.log(body);
    if (!body) {
        return res.status(500).json({ msg: 'El body de la petición no se encuentra presente.' });
    }
    const fechaHoy = (0, util_1.crearFechaFormateada)();
    try {
        const existeNit = yield cliente_1.default.findOne({
            where: {
                nit: body.nit
            }
        });
        if (existeNit) {
            return res.status(500).json({ msg: `El nit ${body.nit} ya está registrado para un cliente.` });
        }
        const existeCorreo = yield cliente_1.default.findOne({
            where: {
                correo: body.correo
            }
        });
        if (existeCorreo) {
            return res.status(500).json({ msg: `El correo ${body.correo} ya está registrado para un cliente.` });
        }
        const passhashed = yield bcrypt_1.default.hashSync(body.password, 10);
        body.password = passhashed;
        completeBody = Object.assign(Object.assign({}, body), { created_at: fechaHoy, updated_at: fechaHoy });
        const cliente = yield cliente_1.default.create(completeBody);
        return res.status(200).json({ cliente });
    }
    catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});
exports.postCliente = postCliente;
const putCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(500).json(result['errors'][0]);
    }
    const { body } = req;
    try {
        const cliente = yield yield cliente_1.default.findOne({
            where: {
                nit: body.nit
            }
        });
        if (!cliente) {
            return res.status(500).json({
                msg: `No existe el cliente`
            });
        }
        yield cliente.update(body);
        return res.status(200).json({
            cliente
        });
    }
    catch (error) {
        console.log("Error en put usuario...", error);
        return res.status(412).json({
            msg: error
        });
    }
});
exports.putCliente = putCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (!results.isEmpty()) {
        return res.status(400).json(results.array);
    }
    let nit = req.query.nit;
    const cliente = yield cliente_1.default.findOne({
        where: {
            numero_documento: nit
        }
    });
    if (!cliente) {
        return res.status(500).json({
            msg: `No existe el cliente`
        });
    }
    //Primera forma de eliminar un registro, físicamente
    //await cliente.destroy();
    //Segunda forma de eliminar un registro, modo lógico
    yield cliente.update({ estado: 2 });
    return res.status(200).json({ cliente });
});
exports.deleteCliente = deleteCliente;
