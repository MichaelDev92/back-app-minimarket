import { DataTypes } from "sequelize";
import db from "../db/connection";


const Producto = db.define('Producto', {
    id:{
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        field: 'nombre',
    },
    valor:{
        type: DataTypes.DOUBLE,
        field: 'valor',
    },
    tipo_producto:{
        type: DataTypes.INTEGER,
        field: 'tipo_producto',
    },
    caracteristicas:{
        type: DataTypes.TEXT,
        field: 'caracteristicas',
    },
    stock:{
        type: DataTypes.INTEGER,
        field: 'stock',
    },
    subtotal:{
        type: DataTypes.DOUBLE,
        field: 'subtotal',
    },
    iva:{
        type: DataTypes.DOUBLE,
        field: 'iva',
    },
    estado:{
        type: DataTypes.INTEGER,
        field: 'estado',
    },
    created_at:{
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at:{
        type: DataTypes.DATE,
        field: 'updated_at'
    }
}, {tableName: 'producto'});

export default Producto;