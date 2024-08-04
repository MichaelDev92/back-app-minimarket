"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const SessionCliente = connection_1.default.define('SessionCliente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
    },
    cliente_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'cliente_id'
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
        field: 'token'
    },
    refresh_token: {
        type: sequelize_1.DataTypes.TEXT,
        field: 'refresh_token'
    },
    fecha_expiracion: {
        type: sequelize_1.DataTypes.DATE,
        field: 'fecha_expiracion'
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'estado'
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at'
    }
}, { tableName: 'session_cliente' });
exports.default = SessionCliente;
