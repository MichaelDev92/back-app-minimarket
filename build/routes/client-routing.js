"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const util_1 = require("../utils/util");
const client_controller_1 = require("../controllers/client-controller");
const router = (0, express_1.Router)();
router.get('/', [
    (0, express_validator_1.query)('nombres', 'El parametro nombres no se encuentra presente en la peticion').exists(),
    (0, express_validator_1.query)('apellidos', 'El parametro apellidos no se encuentra presente en la peticion').exists(),
    (0, express_validator_1.query)('numero_documento', 'El parametro numero documento no se encuentra presente en la peticion').exists(),
    (0, express_validator_1.query)('correo', 'El parametro correo no se encuentra presente en la peticion').exists(),
    (0, express_validator_1.query)('celular', 'El parametro celular no se encuentra presente en la peticion').exists()
], util_1.validateToken, client_controller_1.getClientes);
router.get('/getByNit', [
    (0, express_validator_1.query)('id', 'El parametro id no se encuentra presente en la peticion').exists()
], util_1.validateToken, client_controller_1.getClienteByNit);
router.post('/', [
    (0, express_validator_1.body)('nit', 'El nit no está presente en la petición').exists(),
    (0, express_validator_1.body)('nombre', 'El nombres no está presente en la petición').exists(),
    (0, express_validator_1.body)('correo', 'El nombres no está presente en la petición').exists(),
    (0, express_validator_1.body)('password', 'El nombres no está presente en la petición').exists(),
    (0, express_validator_1.body)('telefono', 'El nombres no está presente en la petición').exists(),
    (0, express_validator_1.body)('estado', 'El nombres no está presente en la petición').exists(),
], client_controller_1.postCliente);
router.put('/', [], util_1.validateToken, client_controller_1.putCliente);
router.put('/delete', (0, express_validator_1.query)('nombres', 'El parametro nombres no se encuentra presente en la peticion').exists(), util_1.validateToken, client_controller_1.deleteCliente);
exports.default = router;
