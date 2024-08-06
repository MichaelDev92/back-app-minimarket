"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TipoProducto = connection_1.default.define('TipoProducto', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(100),
        field: 'descripcion'
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
}, { tableName: 'tipo_producto' });
exports.default = TipoProducto;
