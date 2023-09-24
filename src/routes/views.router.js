/*IMPORTS*/
const express = require('express');
const ProductManager = require('../ProductManager.js');

/*VARS*/
const router = express.Router();
const productManager = new ProductManager();

router.get('/home', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', {title: "WILLY Ecommerce", products: products} )
});

module.exports = router;