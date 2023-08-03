const { v4: uuidv4 } = require('uuid');
const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    let products = await Product.findAll()
    let user = null
    if(req.session)
        user = req.session.user
    res.status(200).render('product', { products, user })
}
exports.getProductById = async (req, res) => {
    const id = req.params.id
    const product = await Product.findByID(id)
    let user = null
    if (req.session)
        user = req.session.user
    if (product[0])
        res.status(200).render('product', { products: product, user })
    else
        res.status(404).redirect("/product")
}
exports.getCheckout = async  (req, res) => {
    let user = null
    if (req.session)
        user = req.session.user
    // read cookie name 'cart'
    let cart = eval(req.cookies.cart)
    if(!cart) return res.status(404).redirect("/product")
    let products = []
    for (let i = 0; i < cart.length; i++) {
        let product = await Product.findByID(cart[i])
        products.push(product[0])
    }
    res.status(200).render('checkout', { products, user })
}

exports.postCheckout = async (req, res) => {
    // read cookie name 'cart'
    let cart = eval(req.cookies.cart)
    if(!cart) return res.status(404).redirect("/product")
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
        let product = await Product.buy(cart[i]) 
        console.log(product);
    }
    res.status(200).json({message: "Checkout success"})
}

exports.getProductCreate = (req, res) => {
    let user = null
    if (req.session)
        user = req.session.user
    res.status(200).render('product-create', { user })
}

exports.postProductCreate = async (req, res) => {
    const { name, price, description, image_link, qty } = req.body
    let id = uuidv4().slice(0, 16);
    console.log(req.session);
    if(!req.session.user) return res.status(401).redirect("/login")
    if(req.session.user.role != "seller") return res.status(401).redirect("/login")
    let owner = req.session.user.id
    
    let product = new Product({ id, owner, name, price, description, image_link, qty })
    let result = await product.save()
    if (result[0].affectedRows == 1) {
        return res.status(201).redirect("/product")
    }else {
        return res.status(500).redirect("/product/create")
    }
}

exports.getProductEdit = async (req, res) => {
    const id = req.params.id
    let user = null
    if (req.session)
        user = req.session.user
    const product = await  Product.findByID(id)
    console.log(product[0]);
    if (product[0])
    res.status(200).render('product-edit', { product: product[0], user })
    else
    res.status(404).redirect("/product")
}

exports.postProductEdit = async (req, res) => {
    const { name, price, description, image_link, qty } = req.body
    console.log(req.body);
    const id = req.params.id
    let result = await Product.update(id, { name, price, description, image_link, qty })
    if (result[0].affectedRows == 1) {
        return res.status(201).redirect("/product")
    }else {
        return res.status(500).redirect("/product/edit/" + id)
    }
}

exports.deleteProductById = async (req, res) => {
    const id = req.params.id
    if (!req.session.user) return res.status(401).redirect("/login")
    console.log('session');
    if (req.session.user.role != "seller") return res.status(401).redirect("/login")
    let owner = req.session.user.id
    let result = await Product.delete(id, owner)
    if (result[0].affectedRows == 1) 
        return res.status(201).json({ message: "Product deleted" })
    else 
        return res.status(500).json({ message: "Product not deleted"})
        
}