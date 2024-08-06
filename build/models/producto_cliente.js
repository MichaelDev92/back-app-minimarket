"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ProductoCliente = connection_1.default.define('ProductoCliente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    producto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'producto_id'
    },
    cliente_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'cliente_id'
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at'
    }
}, { tableName: 'producto_cliente' });
exports.default = ProductoCliente;
