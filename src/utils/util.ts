import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = (req: Request, res: Response, next: NextFunction) => { 

    const headerToken = req.headers['authorization'];
    const urlRequested = req.url;
    let keyName = '';

    console.log("header token: ",headerToken, " url solicitada: ", urlRequested, " body:", req.body);


    if(urlRequested.includes('/sysapi/') || urlRequested.includes('SYS')){
        keyName = process.env.SYS_KEY || '%SYS#KEY%';
    }else{
        keyName = process.env.STORE_KEY || '#STORE$KEY^';
    }

    if(headerToken !== undefined && headerToken.startsWith('Bearer ')){

        try {
            const bearerToken = headerToken.slice(7);
    
            jwt.verify(bearerToken, keyName, (err: any, _decoded: any) => {
                if (err instanceof TokenExpiredError) {
                  return res.status(401).json({ error: 'El jwt ha expirado' });
                }
                if (err instanceof NotBeforeError) {
                  return res.status(401).json({ error: 'El jwt no está activo' });
                }
                if (err instanceof JsonWebTokenError) {
                  return res.status(401).json({ error: 'JWT corrupto' });
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

    const refreshToken : string = <string>req.headers['refreshtoken'];
    const urlRequested = req.baseUrl;

    if(!refreshToken){
       return res.status(401).json({msg: 'El Token de actualización no se encuentra en el header'});
    }

    const keyName = urlRequested.includes('/sysapi/') ? process.env.SYS_KEY_REFRESH || '%SYS#KEY%R3' : process.env.STORE_KEY_REFRESH || '#STORE$KEY^R3';

    if(refreshToken !== undefined && refreshToken.startsWith('Bearer ')){

        try {

            const bearerToken: string = refreshToken?.slice(7)!;

            jwt.verify(bearerToken, keyName, (error: any, _decoded: any)=>{

                if (error instanceof TokenExpiredError) {
                    return res.status(401).json({ error: 'El jwt ha expirado' });
                }
                if (error instanceof NotBeforeError) {
                    return res.status(401).json({ error: 'El jwt no está activo' });
                }
                if (error instanceof JsonWebTokenError) {
                    return res.status(401).json({ error: 'JWT corrupto' });
                }

                return;
            });

            const decoded = jwt.decode(bearerToken, {complete: true}) as any;

            const payload = decoded.payload;

            const token = generarToken({user: payload.user, store: payload.store}, urlRequested);

            return res.status(200).json({token});

        } catch (error) {
            return res.status(400).json({error: 'Token no válido'})
        }
    }else{
        return res.status(403).json({
            error: 'Acceso denegado'
        });
    }
}

const generarToken = (payload: any, urlRequested: any) =>{

    const keyName = urlRequested.includes('/sysapi/') ? process.env.SYS_KEY || '%SYS#KEY%' : process.env.STORE_KEY || '#STORE$KEY^';

    return jwt.sign(payload, keyName, {expiresIn: '15m'});
}

const generarRefreshToken = (payload: any, urlRequested: any) =>{
    
    const keyName = urlRequested.includes('/sysapi/') ? process.env.SYS_KEY_REFRESH || '%SYS#KEY%R3' : process.env.STORE_KEY_REFRESH || '#STORE$KEY^R3';

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