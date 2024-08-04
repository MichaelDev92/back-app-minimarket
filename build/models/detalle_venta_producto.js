"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DetalleVentaProducto = connection_1.default.define('DetalleVentaProducto', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
    },
    venta_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'venta_id'
    },
    producto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'producto_id'
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'cantidad'
    },
    valor: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'valor'
    },
    subtotal: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'subtotal'
    },
    iva: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'iva'
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at'
    }
}, { tableName: 'detalle_venta_producto' });
exports.default = DetalleVentaProducto;
