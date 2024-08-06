import { Router } from "express";
import { body } from "express-validator";
import {getAuthentication, getNit, logout} from "../controllers/auth-controller";
import { validateToken } from "../utils/util";

const router =  Router();

router.post('/',[
    body('nit', 'El nit no está presente en la petición').exists(),
    body('password', 'El password no está presente en la petición').exists()
], getAuthentication);

router.post('/getNit',[body('nit', 'El nit no está presente en la petición').exists()], getNit);
router.post('/logout',[], validateToken, logout);

export default router;