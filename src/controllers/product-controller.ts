import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import db from "../db/connection";
import { crearFechaFormateada } from "../utils/util";
import TipoProducto from "../models/tipo_producto";
import Cliente from "../models/cliente";
import ProductoCliente from "../models/producto_cliente";
import Producto from "../models/producto";
import path from "path";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';



export const getProducts = async (req: Request, res: Response) =>{

    const token = <string> req.headers['authorization']?.slice(7).split('.')[1]

    console.log("token data client: ", token);

    const tokenDecoded = JSON.parse(Buffer.from(token, 'base64').toString());

    let _id = tokenDecoded.client.id;

    let productos = null;

    db.query('CALL ListarProductosCliente(:id)', 
    {replacements: { id: _id}})
        .then( response =>{
            productos = response;
            res.status(200).json({productos});
        })
        .catch(error =>{
            res.status(412).json({msg: error});
        });
    
}

export const getProductsByCategory = async (req: Request, res: Response) =>{
    let {body} = req;
    console.log(body);

    res.status(200);
}

export const addProduct = async (req: Request, res: Response) =>{
    
    const token = <string> req.headers['authorization']?.slice(7).split('.')[1]

    console.log("token data client: ", token);

    const tokenDecoded = JSON.parse(Buffer.from(token, 'base64').toString());

    let {body} = req;

    const dataImages = body.images;

    const fechaHoy = crearFechaFormateada();

    body.images = "";
    let imagesDir = "";

    let fullBody = {
        ...body,
        created_at: fechaHoy,
        updated_at: fechaHoy
    }

    const productOK = await Producto.create(fullBody);

    if(!productOK){
        return res.status(412).json({msg: "Error al crear producto"});
    }
    const directdir = path.resolve( __dirname, '../public');
    const targetPath = path.join(directdir, tokenDecoded.client.nit, String(productOK.dataValues['id']) )
    const dir = path.resolve(targetPath);

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
        console.log(`directorio ${dir} creado.`)
    }else console.log(`ya existe el directorio ${dir}`);

    if(dataImages !== "" && dataImages.includes('!')){
        const images = dataImages.split(',');
    
        images.map((img:any) =>{
            const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const imgUUID = uuidv4();
            const simplifiedUUID = imgUUID.replace('-','');
            const imgPath = path.join(dir, simplifiedUUID + '.jpg');
            imagesDir += imgPath + ",";
            fs.writeFileSync(imgPath, buffer);
        });

        const updatedProductImages = await Producto.update({images: imagesDir},{
            where: {id: productOK.dataValues['id']}
        });
    
        console.log(updatedProductImages);
    }else if(dataImages !== ""){
        const base64Data = dataImages.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const imgUUID = uuidv4();
        const simplifiedUUID = imgUUID.replace("-","");
        const imgPath = path.join(dir, simplifiedUUID + ".jpg");
        fs.writeFileSync(imgPath, buffer);

        const updatedProductImages = await Producto.update({images: imgPath},{
            where: {id: productOK.dataValues['id']}
        });
    
        console.log(updatedProductImages);
    }else console.log("no hay imagenes para subir");


    const client = await Cliente.findOne({
        where: {id: tokenDecoded.client.id}
    })

    if(!client){
        return res.status(412).json({msg: "Cliente no encontrado"});
    }

    let bodyProductClient = {
        cliente_id: client.dataValues['id'],
        producto_id: productOK.dataValues['id']
    }

    const productClient = ProductoCliente.create(bodyProductClient);

    if(!productClient){
        return res.status(412).json({msg: "Error al crear producto cliente"});
    }

    return res.status(200).json({msg: 'Producto creado con éxito.'})
}

export const updateProduct = async (req: Request, res: Response) =>{
    let {body} = req;
    console.log(body);

    res.status(200);
}

export const deleteProduct = async (req: Request, res: Response) =>{
    let {body} = req;
    console.log(body);

    res.status(200);
}

export const getCategories = async(_req: Request, res: Response) =>{

    const categorias = await TipoProducto.findAll();

    if(!categorias){
        return res.status(404).json({msg: 'No se encontraron categorias'});
    }

    categorias.map(cat =>{
        delete cat.dataValues['created_at'];
        delete cat.dataValues['updated_at'];
    });
    
    return res.status(202).json({categorias});
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