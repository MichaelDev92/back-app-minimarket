import { Request, Response } from "express";
import Cliente from "../models/cliente";
import { Result, validationResult } from "express-validator";
import db from "../db/connection";
import { crearFechaFormateada } from "../utils/util";
import bcrypt from 'bcrypt';

export const getClientes = async(req: Request, res: Response) => {

    const results = validationResult(req);

    if(!results.isEmpty()){
        return res.status(400).json(results.array);
    }

    let _nit = req.query.nombre;
    let _nombre = req.query.apellidos;
    let _correo = req.query.numero_documento;
    let _telefono = req.query.correo;
    let _estado = req.query.celular;
    let clientes = null;

    return db.query('CALL ListarClientes(:nombres, :apellidos, :numero_documento, :correo, :celular)',
    {replacements: {nit: _nit, nombre: _nombre, correo: _correo, telefono: _telefono, estado: _estado}})
    .then(response =>{
        clientes = response;
        if(clientes.length > 0 ){
            return res.status(200).json({clientes});
        }else{
            return res.status(500).json({msg: 'No se encontraron resultados.'})
        }
    })
    .catch(error =>{
        return res.status(400).json(error);
    })
}

export const getClienteByNit = async(req: Request, res: Response) => {

    const results : Result<any> = validationResult(req);

    if(!results.isEmpty()){
        return res.status(500).json(results['errors'][0]);
    }

    let _nit = req.query.nit;

    const cliente = await Cliente.findOne({
        where:{
            nit: _nit
        }
    });

    if(cliente){
       return res.status(200).json(cliente);
    }else{
       return res.status(500).json({msg: 'No se pudo encontrar el cliente.'});
    }
}

export const postCliente = async(req: Request, res: Response) => {
    
    const result : Result<any> = validationResult(req);

    
    if(!result.isEmpty()){
        return res.status(500).json(result['errors']);
    }
    
    let completeBody = {};
    const { body } = req;
    console.log(body);
    
    if(!body){
        return res.status(500).json({msg: 'El body de la petición no se encuentra presente.'});
    }
    
    const fechaHoy = crearFechaFormateada();

    try {
        
        const existeNit = await Cliente.findOne({
            where:{
                nit: body.nit
            }
        });
        
        if(existeNit){
            return res.status(500).json({msg: `El nit ${body.nit} ya está registrado para un cliente.`})
        }

        const existeCorreo = await Cliente.findOne({
            where:{
                correo: body.correo
            }
        });
        
        if(existeCorreo){
            return res.status(500).json({msg: `El correo ${body.correo} ya está registrado para un cliente.`})
        }

        const passhashed = await bcrypt.hashSync(body.password, 10);

        body.password = passhashed;
        
        completeBody = {...body, created_at: fechaHoy, updated_at: fechaHoy};
        
        const cliente = await Cliente.create(completeBody);

        return res.status(200).json({cliente});
        
    } catch (error) {
        return res.status(500).json({
            msg: error
        });  
    }
}

export const putCliente = async(req: Request, res: Response) => {

    const result : Result<any> = validationResult(req);

    
    if(!result.isEmpty()){
        return res.status(500).json(result['errors'][0]);
    }

    const { body } = req;

    try {
        const cliente = await await Cliente.findOne({
            where:{
                nit: body.nit
            }
        });

        if(!cliente){
            return res.status(500).json({
                msg: `No existe el cliente`
            })
        }
        await cliente.update(body);

        return res.status(200).json({
            cliente
        });

    } catch (error) {
        console.log("Error en put usuario...", error);
        return res.status(412).json({
           msg: error
        });        
    }

}

export const deleteCliente = async(req: Request, res: Response) => {

    const results = validationResult(req);

    if(!results.isEmpty()){
        return res.status(400).json(results.array);
    }

    let nit  = req.query.nit;

    const cliente = await Cliente.findOne({
        where:{
            numero_documento: nit
        }
    });

    if(!cliente){
        return res.status(500).json({
            msg: `No existe el cliente`
        })
    }
    //Primera forma de eliminar un registro, físicamente
    //await cliente.destroy();

    //Segunda forma de eliminar un registro, modo lógico
    await cliente.update({estado: 2});

    return res.status(200).json({cliente});

}