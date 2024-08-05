import { Request, Response } from "express";
import { Result, validationResult }  from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

/* models import */
import Cliente from "../models/cliente";
import SessionCliente from "../models/session_cliente";

/** utils import */
import { generarToken, generarRefreshToken } from "../utils/util";

dotenv.config();

const getAuthentication = async (req: Request, res: Response)=>{

    const result : Result<any> = validationResult(req);   

    if(!result.isEmpty()){
        return res.status(500).json(result['errors']);
    }

    const {nit, password} = req.body;

    const client = await Cliente.findOne({
        where:{
            nit: nit
        }
    });

    if(!client){
        return res.status(412).json({
            msg: 'Negocio no encontrado.'
        });
    }

    if(client?.dataValues['estado']!==1){
        return res.status(412).json({
            msg: 'Negocio inhabilitado y/o eliminado, consulte el administrador del sistema.'
        });
    }

    const sessionActiva = await SessionCliente.findOne({
        where:{
            cliente_id: client?.dataValues['id'], 
            estado: 1
        }
    });

    if(sessionActiva){
        return res.status(406).json({msg: 'Su sesión aún sigue activa'})
    }

    try {
        const userPass = <any>client?.get('password');
        
        //Compare password
        return bcrypt.compare(password, userPass).then(async (result)=>{
            if(result){
                
                delete client?.dataValues['password'];
                delete client?.dataValues['estado'];
                delete client?.dataValues['created_at'];
                delete client?.dataValues['updated_at'];

                const token = generarToken({client: client?.dataValues},req.url);
                const refreshToken = generarRefreshToken({client: client?.dataValues},req.url);
                const decodedJWT = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
                await SessionCliente.create({
                                            cliente_id: client?.dataValues['id'],
                                            fecha_expiracion: new Date(decodedJWT?.exp * 1000),
                                            token: token,
                                            refresh_token: refreshToken,
                                            estado: 1
                                        })

                res.status(200).json({client, token, refreshToken});

            } else{

               res.status(412).json({
                    msg: 'Password incorrecto'
                })
            }
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error al momento de obtener token de usuario'
        });
    }
}

export default getAuthentication;