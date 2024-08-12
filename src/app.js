import express from 'express';
import { router as productsRouter} from "./routes/productsrouter.js";
import { router as cartRouter } from './routes/cartRouter.js'

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.get('/', async(rep, res)=>{
    res.setHeader("Content-Type", "text/plain")
    res.status(200).send("Bienvenido Dani tu puedes")
});

const server = app.listen(PORT, ()=>{
    console.log(`El servidor ${PORT} esta en linea`);
});