/* import express from 'express';

const app = express();

import {router as productsRouter} from './routes/productsRouter.js'
import { router as cartRouter} from './routes/cartRouter.js';
import { cartManager } from './dao/cartManager.js';
import { productsManager } from './dao/productsManager.js';

productsManager.path = './data/products.json';
cartManager.path = './data/cart.json';

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.setHeader("Content-Type", "text/plain")
    res.status(200).send("Bienvenido Dani tu puedes")
})

const server = app.listen(PORT, ()=>{
    console.log(`El servidor ${PORT} esta en linea`);
}) */
import express from 'express';
import {productsManager} from './dao/productsManager.js';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
productsManager.path = './src/data/products.json';

app.get('/', async(rep, res)=>{
    res.setHeader("Content-Type", "text/plain")
    res.status(200).send("Bienvenido Dani tu puedes")
});

app.get('/api/products', async(req, res)=>{
    let products
    try {
        products = await productsManager.getProducts();
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({error: 'Error inesperado al obtener los productos'});
    }
    let{limit, skip} = req.query;
    if (limit) {
        limit = Number(limit);
        if (isNaN(limit)) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({error: 'el limite debe ser númerico'});
        }
    }else{
        limit = products.length;
    }
    if (skip) {
        skip = Number(skip);
        if (isNaN(skip)) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({error: 'el skip debe ser númerico'});
        }
    }else{
        skip = 0;
    }
    let resultado = products.slice(skip, skip + limit);
    res.setHeader("Content-Type", "application/json")
    return res.status(200).json({resultado});
});
app.get('/api/products/:id', async (req, res) => {
    let{id} = req.params;
    id = Number(id);
    if (isNaN(id)) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({error: 'El id debe ser un número'});
    }
    let products
    try {
        products = await productsManager.getProducts();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({error: 'el skip debe ser númerico'});
    }
    let product = products.find(p => p.id === id);
    if (!product) {
        res.setHeader("Content-Type", "application/json")
        return res.status(404).json({error: 'Producto no encontrado'});
    }
    res.setHeader("Content-Type", "application/json")
    return res.status(200).json({product});
});

app.post('/api/products/', async (req, res) => {
    let {title, description, code, price, status, stock, category} = req.body;
    if (!title ||!description ||!code ||!price ||!status ||!stock ||!category) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({error: 'Todos los campos son obligatorios'});
    };
    let products = await productsManager.getProducts();
    let existe = products.find(p=>p.title === title);
    if (existe) {
        res.setHeader("Content-Type", "application/json")
        return res.status(409).json({error: 'El producto ya existe'});
    };
    try {
        let newProduct = await productsManager.addProducts({title, description, code, price, status, stock, category});
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json({newProduct});
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({error: 'Error inesperado al crear el producto'});
    }
});

app.put('/api/products/:id', async (req, res) => {
    let{id} = req.params;
    id = Number(id);
    if (isNaN(id)) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({error: 'El id debe ser un número'});
    }
    let products
    try {
        products = await productsManager.getProducts();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({error: 'el skip debe ser númerico'});
    }
    let product = products.find(p => p.id === id);
    if (!product) {
        res.setHeader("Content-Type", "application/json")
        return res.status(404).json({error: 'Producto no encontrado'});
    }
    let {...productModify} = req.body;
    delete productModify.id;

    if (productModify.title) {
        let existe = products.find(p=>p.title.toLowerCase()===productModify.title.toLowerCase() && p.id!==id)
        if (existe) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({error: 'El producto ya existe'});
        }
    }
    try {
        let productUpdate = await productsManager.upDateProduct(id, productModify);
        res.setHeader("Content-Type", 'application/json')
        return res.status(200).json({productUpdate});
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({error: 'Error inesperado al modificar el producto'});
    }
});

app.delete('/api/products/:id', async (req, res) => {
    let{id} = req.params;
    id = Number(id);
    if (isNaN(id)) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({error: 'El id debe ser un número'});
    }
    try {
        let deletedProduct = await productsManager.deleteProduct(id);
        res.setHeader("Content-Type", 'application/json')
        return res.status(200).json({deletedProduct});
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({error: 'Error inesperado al eliminar el producto'});
    }
});

const server = app.listen(PORT, ()=>{
    console.log(`El servidor ${PORT} esta en linea`);
});