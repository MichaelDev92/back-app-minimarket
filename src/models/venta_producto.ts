import { DataTypes } from "sequelize";
import db from "../db/connection";


const VentaProducto = db.define('VentaProducto',{
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
    },
    fecha_venta:{
        type: DataTypes.DATE,
        field: 'fecha_venta'
    },
    valor_total:{
        type: DataTypes.DOUBLE,
        field: 'valor_total'
    },
    valor_subtotal:{
        type: DataTypes.DOUBLE,
        field: 'valor_subtotal'
    },
    iva:{
        type: DataTypes.DOUBLE,
        field: 'iva'
    },
    usuario_final_id:{
        type: DataTypes.INTEGER,
        field: 'usuario_final_id'
    },
    cliente_id:{
        type: DataTypes.INTEGER,
        field: 'cliente_id'
    },
    estado:{
        type: DataTypes.INTEGER,
        field: 'estado'
    },
    created_at:{
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at:{
        type: DataTypes.DATE,
        field: 'updated_at'
    }
},{tableName: 'venta_producto'});

export default VentaProducto;