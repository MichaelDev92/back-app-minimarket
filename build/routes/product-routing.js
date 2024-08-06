"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const util_1 = require("../utils/util");
const product_controller_1 = require("../controllers/product-controller");
const router = (0, express_1.Router)();
router.get('/', util_1.validateToken, product_controller_1.getProducts);
router.get('/getByCategory', util_1.validateToken, product_controller_1.getProductsByCategory);
router.post('/', [
    (0, express_validator_1.body)('nombre').not().isEmpty().withMessage('Nombre es requerido.'),
    (0, express_validator_1.body)('valor').not().isEmpty().withMessage('Valor es requerido.'),
    (0, express_validator_1.body)('tipo_producto').not().isEmpty().withMessage('Tipo Producto es requerido.'),
    (0, express_validator_1.body)('caracteristicas').not().isEmpty().withMessage('Caracteristicas es requerido.'),
    (0, express_validator_1.body)('stock').not().isEmpty().withMessage('stock es requerido.'),
    (0, express_validator_1.body)('images').not().isEmpty().withMessage('Images es requerido.'),
    (0, express_validator_1.body)('subtotal').not().isEmpty().withMessage('Subtotal es requerido.'),
    (0, express_validator_1.body)('iva').not().isEmpty().withMessage('Iva es requerido.'),
    (0, express_validator_1.body)('estado').not().isEmpty().withMessage('Estado es requerido.'),
], util_1.validateToken, product_controller_1.addProduct);
router.put('/', util_1.validateToken, product_controller_1.updateProduct);
router.put('/delete', util_1.validateToken, product_controller_1.deleteProduct);
router.get('/categories', [], util_1.validateToken, product_controller_1.getCategories);
router.get('/categoryId', [(0, express_validator_1.query)('id', 'No se encuentra el parametro id en la peticion').exists], util_1.validateToken, product_controller_1.getCategoryById);
router.post('/categories', [
    (0, express_validator_1.body)('descripcion', '').exists(),
    (0, express_validator_1.body)('estado', '').exists()
], util_1.validateToken, product_controller_1.addCategory);
exports.default = router;
