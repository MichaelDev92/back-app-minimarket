"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Producto = connection_1.default.define('Producto', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        field: 'nombre',
    },
    valor: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'valor',
    },
    tipo_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'tipo_producto',
    },
    caracteristicas: {
        type: sequelize_1.DataTypes.TEXT,
        field: 'caracteristicas',
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'stock',
    },
    subtotal: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'subtotal',
    },
    iva: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'iva',
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
}, { tableName: 'producto' });
exports.default = Producto;
