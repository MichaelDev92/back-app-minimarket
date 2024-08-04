import  express from 'express';

const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json

const PORT = 3000;

app.get('/ping', (_req, res)=>{
    console.log('someone pinged here!!!');
    res.send('pong');
});

app.listen(PORT, ()=>{
    console.log('sever up on...', PORT);
})

// import dotenv from "dotenv";
// import Server from "./app";
// dotenv.config();
// const server = new Server();
// server.listen();
