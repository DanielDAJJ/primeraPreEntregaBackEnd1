/* import { Router } from 'express';
import { productsManager } from '../dao/productsManager.js';

export const router=Router()

router.get('/', async (req, res) => {
    try {
        let products = await productsManager.get();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json(`Un error inesperado ha ocurrido, estamos trabajando por arreglarlo,${detalle.error}`);
    }
});

router.get('/:id', async (req, res) => {
    let {id} = req.params;
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un id numérico`})
    };
    let products = await productsManager.get()
    let product = products.find(p => p.id === id);
    if (!product) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({error:`Producto con id:${id} no encontrado`});
    };
    res.setHeader('Content-Type','application/json')
    res.status(200).json(product)
});
router.post('/', async (req, res)=>{
    const {title, description, code, price, status, stock, category} = req.body;
    try {
        let newProduct = await productsManager.create({title, description, code, price, status, stock, category});
        res.setHeader('Content-Type','application/json');
        return res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {error:`Un error inesperado ha ocurrido, estamos trabajando por arreglarlo,${detalle.error}`}
        )
    }
})
 */