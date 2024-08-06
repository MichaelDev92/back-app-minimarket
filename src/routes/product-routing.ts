import { Router } from "express";
import { body, query } from "express-validator";
import { validateToken } from "../utils/util";
import { addCategory, addProduct, deleteProduct, getCategories, getCategoryById, getProducts, getProductsByCategory, updateProduct } from '../controllers/product-controller';

const router = Router();

router.get('/',validateToken, getProducts);
router.get('/getByCategory', validateToken, getProductsByCategory);
router.post('/',[
    body('nombre').not().isEmpty().withMessage('Nombre es requerido.'),
    body('valor').not().isEmpty().withMessage('Valor es requerido.'),
    body('tipo_producto').not().isEmpty().withMessage('Tipo Producto es requerido.'),
    body('caracteristicas').not().isEmpty().withMessage('Caracteristicas es requerido.'),
    body('stock').not().isEmpty().withMessage('stock es requerido.'),
    body('images').not().isEmpty().withMessage('Images es requerido.'),
    body('subtotal').not().isEmpty().withMessage('Subtotal es requerido.'),
    body('iva').not().isEmpty().withMessage('Iva es requerido.'),
    body('estado').not().isEmpty().withMessage('Estado es requerido.'),
], validateToken, addProduct);
router.put('/', validateToken, updateProduct);
router.put('/delete', validateToken, deleteProduct);
router.get('/categories',[],validateToken, getCategories);
router.get('/categoryId',[query('id','No se encuentra el parametro id en la peticion').exists],validateToken, getCategoryById);
router.post('/categories',[
                            body('descripcion','').exists(),
                            body('estado','').exists()
                        ],
                        validateToken, addCategory);

export default router;