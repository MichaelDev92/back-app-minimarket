import { DataTypes } from "sequelize";
import db from "../db/connection";


const DetalleVentaProducto = db.define('DetalleVentaProducto',{
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    venta_id:{
        type: DataTypes.INTEGER,
        field: 'venta_id'
    },
    producto_id:{
        type: DataTypes.INTEGER,
        field: 'producto_id'
    },
    cantidad:{
        type: DataTypes.INTEGER,
        field: 'cantidad'
    },
    valor:{
        type: DataTypes.DOUBLE,
        field: 'valor'
    },
    subtotal:{
        type: DataTypes.DOUBLE,
        field: 'subtotal'
    },
    iva:{
        type: DataTypes.DOUBLE,
        field: 'iva'
    },
    created_at:{
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at:{
        type: DataTypes.DATE,
        field: 'updated_at'
    }
},{tableName: 'detalle_venta_producto'});

export default DetalleVentaProducto;