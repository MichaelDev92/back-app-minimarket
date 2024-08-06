import { Router } from "express";
import { body, query } from "express-validator";
import { validateToken } from "../utils/util";
import { deleteCliente, getClienteByNit, getClientes, postCliente, putCliente } from "../controllers/client-controller";

const router = Router();

router.get('/', [
    query('nombres', 'El parametro nombres no se encuentra presente en la peticion').exists(),
    query('apellidos', 'El parametro apellidos no se encuentra presente en la peticion').exists(),
    query('numero_documento','El parametro numero documento no se encuentra presente en la peticion').exists(),
    query('correo', 'El parametro correo no se encuentra presente en la peticion').exists(),
    query('celular', 'El parametro celular no se encuentra presente en la peticion').exists()
                ], validateToken ,getClientes);

router.get('/getByNit', [
    query('id', 'El parametro id no se encuentra presente en la peticion').exists()
                ], validateToken, getClienteByNit);
router.post('/', [
    body('nit', 'El nit no está presente en la petición').exists(),
    body('nombre', 'El nombre no está presente en la petición').exists(),
    body('correo', 'El correo no está presente en la petición').exists(),
    body('password', 'El password no está presente en la petición').exists(),
    body('telefono', 'El telefono no está presente en la petición').exists(),
    body('estado', 'El estado no está presente en la petición').exists(),
                    ],postCliente);
router.put('/', [],validateToken, putCliente);
router.put('/delete', 
    query('nombres', 'El parametro nombres no se encuentra presente en la peticion').exists(), validateToken, deleteCliente);


export default router;