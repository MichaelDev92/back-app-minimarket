"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cliente = connection_1.default.define('Cliente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    nit: {
        type: sequelize_1.DataTypes.STRING,
        field: 'nit',
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        field: 'nombre',
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        field: 'correo',
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        field: 'password',
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        field: 'telefono',
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'estado',
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at'
    }
}, { tableName: 'cliente' });
exports.default = Cliente;
