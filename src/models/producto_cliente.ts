import { DataTypes } from "sequelize";
import db from "../db/connection";


const ProductoCliente = db.define('ProductoCliente',{
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
    },
    producto_id:{
        type: DataTypes.INTEGER,
        field: 'producto_id'
    },
    cliente_id:{
        type: DataTypes.INTEGER,
        field: 'cliente_id'
    },
    created_at:{
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at:{
        type: DataTypes.DATE,
        field: 'updated_at'
    }
},{tableName: 'producto_cliente'});

export default ProductoCliente;