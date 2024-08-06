import { DataTypes } from "sequelize";
import db from "../db/connection";

const Cliente = db.define('Cliente',{
    id:{
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    nit:{
        type: DataTypes.STRING,
        field: 'nit',
    },
    nombre:{
        type: DataTypes.STRING,
        field: 'nombre',
    },
    correo:{
        type: DataTypes.STRING,
        field: 'correo',
    },
    password:{
        type: DataTypes.STRING,
        field: 'password',
    },
    telefono:{
        type: DataTypes.STRING,
        field: 'telefono',
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
},{tableName: 'cliente'});

export default Cliente;