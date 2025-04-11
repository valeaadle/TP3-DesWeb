const express = require('express');
const router = express.Router();
const productService = require('../business/productService');

// Ruta principal
router.get('/', (req, res) => {
  const productos = productService.getProducts();
  res.render('productos', { productos });
});

// API REST
router.post('/productos', (req, res) => {
  try {
    const producto = productService.addProduct(req.body.nombre, req.body.precio);
    res.redirect('/');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/productos/:id/delete', (req, res) => {
  productService.deleteProduct(req.params.id);
  res.redirect('/');
});

module.exports = router; // <- Esto es crucial