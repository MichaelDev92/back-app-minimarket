"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TipoDocumento = connection_1.default.define('TipoDocumento', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    fecha_venta: {
        type: sequelize_1.DataTypes.DATE,
        field: 'fecha_venta'
    },
    valor_total: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'valor_total'
    },
    valor_subtotal: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'valor_subtotal'
    },
    iva: {
        type: sequelize_1.DataTypes.DOUBLE,
        field: 'iva'
    },
    usuario_final_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'usuario_final_id'
    },
    cliente_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'cliente_id'
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
}, { tableName: 'tipo_documento' });
exports.default = TipoDocumento;
