"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearFechaFormateada = exports.generarRefreshToken = exports.generarToken = exports.refreshToken = exports.validateToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    const urlRequested = req.url;
    let keyName = '';
    console.log("header token: ", headerToken, " url solicitada: ", urlRequested, " body:", req.body);
    if (urlRequested.includes('/sysapi/') || urlRequested.includes('SYS')) {
        keyName = process.env.SYS_KEY || '%SYS#KEY%';
    }
    else {
        keyName = process.env.STORE_KEY || '#STORE$KEY^';
    }
    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, keyName, (err, _decoded) => {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res.status(401).json({ error: 'El jwt ha expirado' });
                }
                if (err instanceof jsonwebtoken_1.NotBeforeError) {
                    return res.status(401).json({ error: 'El jwt no está activo' });
                }
                if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                    return res.status(401).json({ error: 'JWT corrupto' });
                }
                return next();
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Token no válido' });
        }
    }
    else {
        res.status(401).json({
            error: 'Acceso denegado'
        });
    }
};
exports.validateToken = validateToken;
const refreshToken = (req, res) => {
    const refreshToken = req.headers['refreshtoken'];
    const urlRequested = req.baseUrl;
    if (!refreshToken) {
        return res.status(401).json({ msg: 'El Token de actualización no se encuentra en el header' });
    }
    const keyName = urlRequested.includes('/sysapi/') ? process.env.SYS_KEY_REFRESH || '%SYS#KEY%R3' : process.env.STORE_KEY_REFRESH || '#STORE$KEY^R3';
    if (refreshToken !== undefined && refreshToken.startsWith('Bearer ')) {
        try {
            const bearerToken = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, keyName, (error, _decoded) => {
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res.status(401).json({ error: 'El jwt ha expirado' });
                }
                if (error instanceof jsonwebtoken_1.NotBeforeError) {
                    return res.status(401).json({ error: 'El jwt no está activo' });
                }
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    return res.status(401).json({ error: 'JWT corrupto' });
                }
                return;
            });
            const decoded = jsonwebtoken_1.default.decode(bearerToken, { complete: true });
            const payload = decoded.payload;
            const token = generarToken({ user: payload.user, store: payload.store }, urlRequested);
            return res.status(200).json({ token });
        }
        catch (error) {
            return res.status(400).json({ error: 'Token no válido' });
        }
    }
    else {
        return res.status(403).json({
            error: 'Acceso denegado'
        });
    }
};
exports.refreshToken = refreshToken;
const generarToken = (payload, urlRequested) => {
    const keyName = urlRequested.includes('/sysapi/') ? process.env.SYS_KEY || '%SYS#KEY%' : process.env.STORE_KEY || '#STORE$KEY^';
    return jsonwebtoken_1.default.sign(payload, keyName, { expiresIn: '15m' });
};
exports.generarToken = generarToken;
const generarRefreshToken = (payload, urlRequested) => {
    const keyName = urlRequested.includes('/sysapi/') ? process.env.SYS_KEY_REFRESH || '%SYS#KEY%R3' : process.env.STORE_KEY_REFRESH || '#STORE$KEY^R3';
    const refreshToken = jsonwebtoken_1.default.sign(payload, keyName, { expiresIn: '2h' });
    return refreshToken;
};
exports.generarRefreshToken = generarRefreshToken;
const crearFechaFormateada = () => {
    const fechaHoy = new Date();
    let year = fechaHoy.getFullYear();
    let month = fechaHoy.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    let day = fechaHoy.getDate();
    day = ('0' + day).slice(-2);
    let hour = fechaHoy.getHours();
    hour = ('0' + hour).slice(-2);
    let minute = fechaHoy.getMinutes();
    minute = ('0' + minute).slice(-2);
    let second = fechaHoy.getSeconds();
    second = ('0' + second).slice(-2);
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};
exports.crearFechaFormateada = crearFechaFormateada;
