import fs from 'fs';
import { productsManager } from './productsManager.js';

export class cartManager {
    static path

    static async getCart() {
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } else {
            return [];
        }
    }
    static async addProductToCart(product={}) {
        const cart = await this.getCart();
        let cId = 1;
        let quantity = 1;
        if (cart.length > 0) {
            cId = Math.max(...cart.map(item => item.id)) + 1;
        }
        let newCartProduct = {
            cId,
            quantity,
            ...product
        }
        cart.push(newCartProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, '\t'), {encoding:'utf-8'});
        return newCartProduct;
    }
    static async updateQuantity(cId, pId) {
        const cart = await this.getCart();
        const productIndex = cart.findIndex(p=>p.cId === cId && p.pId === pId);
        if(productIndex === -1){
            throw new Error('El producto no existe en el carrito');
        }
        cart[productIndex].quantity =+ 1;
        await fs.promises.writeFile(this.path, JSON.stringify(cart), {encoding:'utf-8'});
        return cart[productIndex];
    }
}