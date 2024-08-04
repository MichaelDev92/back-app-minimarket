import { Router } from "express";
import { body } from "express-validator";
import getAuthentication from "../controllers/auth-controller";

const router =  Router();

router.post('/',[
    body('nit', 'El nit no está presente en la petición').exists(),
    body('password', 'El password no está presente en la petición').exists()
], getAuthentication);

export default router;