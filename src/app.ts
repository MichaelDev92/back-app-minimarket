import express, {Application} from 'express';
import cors  from 'cors';
import http from 'http';
import  db  from './db/connection';
import BodyParser from 'body-parser';
import dotenv from "dotenv";


/* importing routes */
import auth from './routes/auth';
import clientRouting from './routes/client-routing';
import productRouting from './routes/product-routing'

dotenv.config(); 

class Server{

    private app: Application;
    private port?: number;
    private server: http.Server;
    private apiPaths = {
        clients: '/api/clients',
        auth: '/api/auth',
        products: '/api/products'
    }

    constructor() {
        this.app = express();
        this.app.use(BodyParser.urlencoded({extended: false}));
        this.app.use(BodyParser.json());
        console.log("desde app.ts env: ", process.env.PORT)
        this.port = Number(process.env.PORT || '8080');
        this.server = new http.Server(this.app);
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares(){

        // CORS features
        this.app.use(cors({
            origin: (origin, callback)=>{
                const ACCEPTED_ORIGINS = [
                    'http://localhost:5173',
                ];

                if(ACCEPTED_ORIGINS.map(item => item === origin)){
                    return callback(null, true);
                }

                if(!origin){
                    return callback(null, true);
                }

                return callback(new Error('Not allowed by cors'));
            }
        }));

        // Body reading 
        this.app.use(express.json());

        // Gives use to Express the public folder
        this.app.use(express.static('public'))
    }

    routes(){
        // API routes
        this.app.use(this.apiPaths.clients, clientRouting);
        this.app.use(this.apiPaths.auth, auth);
        this.app.use(this.apiPaths.products, productRouting);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('Database connected...');
        }catch(error: any){
            throw new Error(error);
        }
    }
}

export default Server;

