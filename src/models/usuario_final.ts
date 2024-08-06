import { DataTypes } from "sequelize";
import db from "../db/connection";


const UsuarioFinal = db.define('UsuarioFinal',{
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(150),
        field: 'nombre'
    },
    documento:{
        type: DataTypes.INTEGER,
        field: 'documento'
    },
    tipo_documento:{
        type: DataTypes.INTEGER,
        field: 'tipo_documento'
    },
    telefono:{
        type: DataTypes.STRING(50),
        field: 'telefono'
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
},{tableName: 'usuario_final'});

export default UsuarioFinal;