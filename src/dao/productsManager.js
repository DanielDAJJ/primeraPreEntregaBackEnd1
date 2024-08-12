import fs from 'fs';
export class productsManager{
    static path
    static async getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } else {
            return [];
        }
    }
    static async addProducts(product = {}){
        let products = await this.getProducts();
        let id = 1;
        if (products.length > 0) {
            id = Math.max(...products.map(p=>p.id))+1;
        };
        let newProduct = {
            id,
            ...product
        }
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct
    }
    static async upDateProduct(id,productModify = {}){
        let products = await this.getProducts();
        let indiceProduct = products.findIndex(p=>p.id === id);
        if(indiceProduct === -1){
            throw new Error('Producto no encontrado');
        }
        products[indiceProduct] = {
            ...products[indiceProduct],
            ...productModify,
            id
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products[indiceProduct];
    }
    static async deleteProduct(id){
        let products = await this.getProducts();
        let indiceProduct = products.findIndex(p=>p.id === id);
        if(indiceProduct === -1){
            throw new Error('Producto no encontrado');
        }
        products.splice(indiceProduct, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products;
    }
}