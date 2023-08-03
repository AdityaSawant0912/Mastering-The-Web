const db = require("../config/db");

class Product{
    constructor(product) {
        this.id = product.id;
        this.owner = product.owner;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.qty = product.qty;
        this.image_link = product.image_link;
        this.delete = 0; // 1 = deleted, 0 = not deleted
    }
    
    async save() {
        let query = `INSERT INTO product (product_id, product_owner, product_name, product_description, product_price, product_qty, product_image_link, product_delete) VALUES ('${this.id}', '${this.owner}', '${this.name}', '${this.description}', '${this.price}', '${this.qty}', '${this.image_link}', '${this.delete}')`;
        let result = await db.execute(query);
        return result;
    }
    
    static async findAll() {
        let query = `SELECT * FROM product WHERE product_delete = 0`;
        let result = await db.execute(query);
        return result[0];    
    }
    
    static async findByID(id) {
        let query = `SELECT * FROM product WHERE product_id = '${id}' AND product_delete = 0`;
        let result = await db.execute(query);
        return result[0];
    }
    
    static async findByOwner(owner) {
        let query = `SELECT * FROM product WHERE product_owner = '${owner}' AND product_delete = 0`;
        let result = await db.execute(query);
        return result[0];
    }
    
    static async update(id, product) {
        let query = `UPDATE product SET product_name = '${product.name}', product_description = '${product.description}', product_price = '${product.price}', product_qty = '${product.qty}', product_image_link = '${product.image_link}' WHERE product_id = '${id}'`;
        let result = await db.execute(query);
        return result;
    }
    
    static async buy(id) {
        let query = `UPDATE product SET product_qty = product_qty - 1 WHERE product_id = '${id}'`;
        return await db.execute(query);
    }
    
    static async delete(id, owner) {
        let query = `UPDATE product SET product_delete = 1 WHERE product_id = '${id}' AND product_owner = '${owner}'`;
        let result = await db.execute(query);
        return result;
    }
    
}

module.exports = Product;