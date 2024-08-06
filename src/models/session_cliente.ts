import { DataTypes } from "sequelize";
import db from "../db/connection";


const SessionCliente = db.define('SessionCliente',{
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    cliente_id:{
        type: DataTypes.INTEGER,
        field: 'cliente_id'
    },
    token:{
        type: DataTypes.TEXT,
        field: 'token'
    },
    refresh_token:{
        type: DataTypes.TEXT,
        field: 'refresh_token'
    },
    fecha_expiracion:{
        type: DataTypes.DATE,
        field: 'fecha_expiracion'
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
},{tableName: 'session_cliente'});

export default SessionCliente;