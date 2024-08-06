import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
// import db from "../db/connection";
import { crearFechaFormateada } from "../utils/util";
// import bcrypt from 'bcrypt';
// import Producto from "../models/producto";
import TipoProducto from "../models/tipo_producto";
import Cliente from "../models/cliente";
import ProductoCliente from "../models/producto_cliente";



export const getProducts = async (req: Request, res: Response) =>{

    const token = <string> req.headers['authorization']?.slice(7).split('.')[1]

    const tokenDecoded = JSON.parse(Buffer.from(token, 'base64').toString());

    const cliente = await Cliente.findOne({
        where: { nit: tokenDecoded.nit }
    });


    const products = await ProductoCliente.findAll({
        where: { cliente_id: cliente?.dataValues['id'] }
    });

    if(!products){
        return res.status(404).json({ message: 'No hay productos' });
    }

    
    if (!cliente) {
        return res.status(412).json({ message: 'No autorizado' });
    }

    const categorias = await TipoProducto.findAll();

    if(!categorias){
        return res.status(404).json({msg: 'No se encontraron categorias'});
    }else return res.status(202).json({categorias});
    
}

// export const getProductsByCategory = async (req: Request, res: Response) =>{
    
// }

// export const addProduct = async (req: Request, res: Response) =>{
    
// }

// export const updateProduct = async (req: Request, res: Response) =>{
    
// }

// export const deleteProduct = async (req: Request, res: Response) =>{
    
// }

export const getCategories = async(_req: Request, res: Response) =>{

    const categorias = await TipoProducto.findAll();

    if(!categorias){
        return res.status(404).json({msg: 'No se encontraron categorias'});
    }else return res.status(202).json({categorias});
}

export const getCategoryById = async(req: Request, res: Response) =>{

    const results = validationResult(req);

    if(!results.isEmpty()){
        return res.status(400).json(results.array);
    }

    const categoria = await TipoProducto.findOne({
        where:{
            id: req.query.id
        }
    });

    if(!categoria){
        return res.status(404).json({message: 'No se encontró categoria'});
    }else{
        return res.status(202).json({categoria});
    }
}

export const addCategory = async(req: Request, res: Response)=>{

    const result : Result<any> = validationResult(req);   

    if(!result.isEmpty()){
        return res.status(500).json(result['errors']);
    }

    const exist = await TipoProducto.findOne({
        where: {
            descripcion: req.body.descripcion
        }
    });

    if(exist){
        return res.status(400).json({message: 'Ya existe una categoria con este mismo nombre'});
    }

    const fechaHoy = crearFechaFormateada();

    try {

        const completebody = {...req.body, created_at: fechaHoy, updated_at: fechaHoy};
        
        const categoria = await TipoProducto.create(completebody);
    
        if(!categoria){
            return res.status(500).json({message: 'Error al crear categoria'});
        }

        return res.status(200).json({categoria, msg: 'Categoria creada con éxito.'});

    } catch (error) {
        return res.status(412).json({msg: error});
    }

}