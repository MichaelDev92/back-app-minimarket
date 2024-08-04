"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!!');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log('sever up on...', PORT);
});
// import dotenv from "dotenv";
// import Server from "./app";
// dotenv.config();
// const server = new Server();
// server.listen();
