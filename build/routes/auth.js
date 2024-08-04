"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.body)('nit', 'El nit no está presente en la petición').exists(),
    (0, express_validator_1.body)('password', 'El password no está presente en la petición').exists()
], auth_controller_1.default);
exports.default = router;
