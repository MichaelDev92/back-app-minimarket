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
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
/* models import */
const cliente_1 = __importDefault(require("../models/cliente"));
const session_cliente_1 = __importDefault(require("../models/session_cliente"));
/** utils import */
const util_1 = require("../utils/util");
dotenv_1.default.config();
const getAuthentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(500).json(result['errors']);
    }
    const { nit, password } = req.body;
    const client = yield cliente_1.default.findOne({
        where: {
            nit: nit
        }
    });
    if (!client) {
        return res.status(412).json({
            msg: 'Negocio no encontrado.'
        });
    }
    if ((client === null || client === void 0 ? void 0 : client.dataValues['estado']) !== 1) {
        return res.status(412).json({
            msg: 'Negocio inhabilitado y/o eliminado, consulte el administrador del sistema.'
        });
    }
    const sessionActiva = yield session_cliente_1.default.findOne({
        where: {
            cliente_id: client === null || client === void 0 ? void 0 : client.dataValues['id'],
            estado: 1
        }
    });
    if (sessionActiva) {
        return res.status(406).json({ msg: 'Su sesión aún sigue activa' });
    }
    try {
        const userPass = client === null || client === void 0 ? void 0 : client.get('password');
        //Compare password
        return bcrypt_1.default.compare(password, userPass).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result) {
                client === null || client === void 0 ? true : delete client.dataValues['password'];
                client === null || client === void 0 ? true : delete client.dataValues['estado'];
                client === null || client === void 0 ? true : delete client.dataValues['created_at'];
                client === null || client === void 0 ? true : delete client.dataValues['updated_at'];
                const token = (0, util_1.generarToken)({ client: client === null || client === void 0 ? void 0 : client.dataValues }, req.url);
                const refreshToken = (0, util_1.generarRefreshToken)({ client: client === null || client === void 0 ? void 0 : client.dataValues }, req.url);
                const decodedJWT = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                yield session_cliente_1.default.create({
                    cliente_id: client === null || client === void 0 ? void 0 : client.dataValues['id'],
                    fecha_expiracion: new Date((decodedJWT === null || decodedJWT === void 0 ? void 0 : decodedJWT.exp) * 1000),
                    token: token,
                    refresh_token: refreshToken,
                    estado: 1
                });
                res.status(200).json({ client, token, refreshToken });
            }
            else {
                res.status(412).json({
                    msg: 'Password incorrecto'
                });
            }
        }));
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Error al momento de obtener token de usuario'
        });
    }
});
exports.default = getAuthentication;
