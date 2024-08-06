"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const UsuarioFinal = connection_1.default.define('UsuarioFinal', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(150),
        field: 'nombre'
    },
    documento: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'documento'
    },
    tipo_documento: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'tipo_documento'
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(50),
        field: 'telefono'
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
}, { tableName: 'usuario_final' });
exports.default = UsuarioFinal;
