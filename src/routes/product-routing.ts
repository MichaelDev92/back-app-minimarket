import { Router } from "express";
import { body, query } from "express-validator";
import { validateToken } from "../utils/util";
import { getCategories, getCategoryById } from "../controllers/product-controller";

const router = Router();

router.get('/');
router.get('/getByCategory');
router.post('/');
router.put('/');
router.put('/delete');
router.get('/categories',[],validateToken, getCategories);
router.get('/categoryId',[query('id','No se encuentra el parametro id en la peticion').exists],validateToken, getCategoryById);
router.post('/categories',[body],validateToken, getCategories);

export default router;