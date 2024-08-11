/* import fs from 'fs';
import { productsManager } from './productsManager.js';

export class cartManager{
    static path
    static async get(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:'utf-8'}))
        }else{
            return []
        }
    };
    static async add(){
        const cart = await this.get();
        const product = productsManager.getById(req.params.id);
        let idCart = 1;
        if(cart.length > 0){
            idCart = Math.max(...cart.map(item => item.id)) + 1;
        };
        cart.push({...product, id: idCart, quantity:1});
        await fs.promises.writeFile(this.path, JSON.stringify(cart), {encoding:'utf-8'});
        return cart;        
    }
    static async update(id, product = {}){
        const cart = await this.get();
        const index = cart.findIndex(i=>i.id === id);
        if(index === -1){
            throw new Error('El producto no existe en el carrito');
        };
        product = {...cart[index].quantity += 1}
        await fs.promises.writeFile(this.path, JSON.stringify(cart), {encoding:'utf-8'});
        return product; 
    }
} */