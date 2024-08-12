import { Router } from 'express';
import { cartManager } from '../dao/cartManager.js';

export const router = Router();
cartManager.path = './src/data/cart.json';

router.get('/', async (req, res) => {
    let cart
    try {
        cart = cartManager.getCart();
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({error: 'Error inesperado al obtener los productos'});
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({cart});
});
router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    cid = Number(cid);
    if (isNaN(cid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({error: 'El id del carrito debe ser un número'});
    };
    let cart
    try {
        cart = await cartManager.getCart();
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({error: 'Error inesperado al obtener los productos'});
    };
    let cartProduct = cart.find(cP=>cP.cid === cid);
    if (!cartProduct) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(404).json({error: 'El carrito no existe'});
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({cartProduct});
});

router.post('/', async (req, res) => {
    let{id, title} = req.body;
    id = Number(id);
    title = String(title);
    if (isNaN(id) || !title) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({error: 'Los campos id y title son obligatorios'});
    }
    try {
        let newCartProduct = await cartManager.addProductToCart({id, title});
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({newCartProduct});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({error: 'Error inesperado al agregar el producto al carrito'});
    }
});
router.post('/:cid/product/:id', async (req, res) => {

});