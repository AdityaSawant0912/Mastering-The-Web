const express = require('express');
const path = require('path')
const productController = require('../controllers/productController');

const router = express.Router();
router
    .route("")
    .get(productController.getProducts)
    
router
    .route("/checkout")
    .get(productController.getCheckout)
    .post(productController.postCheckout)

router
    .route("/create")
    .get(productController.getProductCreate)
    .post(productController.postProductCreate)

router
    .route("/:id")
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    
router
    .route("/edit/:id")
    .get(productController.getProductEdit)
    .post(productController.postProductEdit)
    
    
router.use(express.static(path.join(__dirname, 'public')))

module.exports = router;