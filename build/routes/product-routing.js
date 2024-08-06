"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const util_1 = require("../utils/util");
const product_controller_1 = require("../controllers/product-controller");
const router = (0, express_1.Router)();
router.get('/');
router.get('/getByCategory');
router.post('/');
router.put('/');
router.put('/delete');
router.get('/categories', [], util_1.validateToken, product_controller_1.getCategories);
router.get('/categoryId', [(0, express_validator_1.query)('id', 'No se encuentra el parametro id en la peticion').exists], util_1.validateToken, product_controller_1.getCategoryById);
router.post('/categories', [
    (0, express_validator_1.body)('descripcion', '').exists(),
    (0, express_validator_1.body)('estado', '').exists()
], util_1.validateToken, product_controller_1.addCategory);
exports.default = router;
