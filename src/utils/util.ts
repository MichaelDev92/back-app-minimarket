import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import SessionCliente from "../models/session_cliente";

dotenv.config();

const validateToken = (req: Request, res: Response, next: NextFunction) => { 

    const headerToken = req.headers['authorization'];
    const urlRequested = req.url;
    let keyName = '';

    console.log("header token: ",headerToken, " url solicitada: ", urlRequested, " body:", req.body);


    if(urlRequested.includes('/api/') || urlRequested.includes('SYS')){
        keyName = process.env.SYS_KEY || '%SYS#KEY%';
    }else{
        keyName = process.env.STORE_KEY || '#STORE$KEY^';
    }

    if(headerToken !== undefined && headerToken.startsWith('Bearer ')){

        try {
            const bearerToken = headerToken.slice(7);
            const tokenDecoded = JSON.parse(Buffer.from(bearerToken.split('.')[1], 'base64').toString());
    
            jwt.verify(bearerToken, keyName, async (err: any, _decoded: any) => {
                if (err instanceof TokenExpiredError) {
                    const active = await SessionCliente.findOne({
                        where: {
                            cliente_id: tokenDecoded.client.id,
                            estado: 1
                        }                        
                    });

                    if(active){
                        await SessionCliente.update({estado: 2},{
                            where: {
                                cliente_id: tokenDecoded.client.id
                            }
                        });
                    }
                    //console.log("desde validate token: ", tokenDecoded);
                    //refreshToken(req, res);
                  return res.status(401).json({ msg: 'El jwt ha expirado' });
                }
                if (err instanceof NotBeforeError) {
                  return res.status(401).json({ msg: 'El jwt no está activo' });
                }
                if (err instanceof JsonWebTokenError) {
                  return res.status(401).json({ msg: 'JWT corrupto' });
                }

                return next();
              });

        } catch (error) {
            res.status(400).json({error: 'Token no válido'})
        }

    }else{
        res.status(401).json({
            error: 'Acceso denegado'
        })
    }
    
}

const refreshToken = (req: Request, res: Response)=>{

    const refreshToken : string = <string>req.headers['refresh-token'];
    const urlRequested = req.baseUrl;

    if(!refreshToken){
       return res.status(401).json({msg: 'El Token de actualización no se encuentra en el header'});
    }

    const keyName = urlRequested.includes('/api/') ? process.env.SYS_KEY_REFRESH || '%SYS#KEY%R3' : process.env.STORE_KEY_REFRESH || '#STORE$KEY^R3';

    if(refreshToken !== undefined && refreshToken.startsWith('Bearer ')){

        try {

            const bearerToken: string = refreshToken?.slice(7)!;
            const tokenDecoded = JSON.parse(Buffer.from(bearerToken.split('.')[1], 'base64').toString());

            jwt.verify(bearerToken, keyName, async (error: any, _decoded: any)=>{

                if (error instanceof TokenExpiredError) {
                    const active = await SessionCliente.findOne({
                        where: {
                            cliente_id: tokenDecoded.client.id,
                            estado: 1
                        }                        
                    });

                    if(active){
                        await SessionCliente.update({estado: 2},{
                            where: {
                                cliente_id: tokenDecoded.client.id
                            }
                        });
                    }
                    return res.status(401).json({ msg: 'El jwt ha expirado' });
                }
                if (error instanceof NotBeforeError) {
                    return res.status(401).json({ msg: 'El jwt no está activo' });
                }
                if (error instanceof JsonWebTokenError) {
                    return res.status(401).json({ msg: 'JWT corrupto' });
                }

                return;
            });

            const decoded = jwt.decode(bearerToken, {complete: true}) as any;

            const payload = decoded.payload;

            const token = generarToken({client: payload.client}, urlRequested);

            return res.status(200).json({token});

        } catch (error) {
            return res.status(400).json({msg: 'Token no válido'})
        }
    }else{
        return res.status(403).json({
            msg: 'Acceso denegado'
        });
    }
}

const generarToken = (payload: any, urlRequested: any) =>{

    const keyName = urlRequested.includes('/api/') ? process.env.SYS_KEY || '%SYS#KEY%' : process.env.STORE_KEY || '#STORE$KEY^';

    return jwt.sign(payload, keyName, {expiresIn: '45m'});
}

const generarRefreshToken = (payload: any, urlRequested: any) =>{
    
    const keyName = urlRequested.includes('/api/') ? process.env.SYS_KEY_REFRESH || '%SYS#KEY%R3' : process.env.STORE_KEY_REFRESH || '#STORE$KEY^R3';

    const refreshToken = jwt.sign(payload, keyName, {expiresIn: '2h'});

    return refreshToken;
}


const crearFechaFormateada = () => {
    const fechaHoy = new Date();

    let year = fechaHoy.getFullYear();

    let month: any = fechaHoy.getMonth();
    month = ('0'+ (month+1)).slice(-2);

    let day: any = fechaHoy.getDate();
    day = ('0' + day).slice(-2);

    let hour: any = fechaHoy.getHours();
    hour = ('0' + hour).slice(-2);

    let minute: any = fechaHoy.getMinutes();
    minute = ('0' + minute).slice(-2);

    let second: any = fechaHoy.getSeconds();
    second = ('0' + second).slice(-2);


    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    
}

export {validateToken, refreshToken, generarToken, generarRefreshToken, crearFechaFormateada};