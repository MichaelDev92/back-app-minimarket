import { DataTypes } from "sequelize";
import db from "../db/connection";


const TipoProducto = db.define('TipoProducto',{
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
    },
    descripcion:{
        type: DataTypes.STRING(100),
        field: 'descripcion'
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
},{tableName: 'tipo_producto'});

export default TipoProducto;