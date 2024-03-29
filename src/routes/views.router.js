/*IMPORTS*/
const express = require('express');
const ProductManager = require('../ProductManager.js');

/*VARS*/
const router = express.Router();
const productManager = new ProductManager();

router.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realtimeproducts', {title: "WILLY Ecommerce", products: products} )
});

router.post('/realtimeproducts', (req, res) => {
   const {title, description, price, thumbnail, code, stock} = req.body; 
   try {
    const newProduct = productManager.addProduct(title, description, price, thumbnail, code, stock);
    io.emit('product-created', newProduct);
    res.redirect('/realtimeproducts');
   } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al crear el producto');
   }
});

module.exports = router;