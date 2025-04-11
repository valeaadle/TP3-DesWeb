const express = require('express');
const router = express.Router(); // <-- ¡ESTA LÍNEA FALTABA!
const productService = require('../business/productService');

// Ruta principal
router.get('/', (req, res) => {
  const productos = productService.getProducts();
  res.render('productos', { 
    productos,
    error: null // Asegura que error siempre esté definido
  });
});

// API REST
router.get('/api/productos', (req, res) => {
  res.json({ 
    success: true, 
    data: productService.getProducts() 
  });
});

router.post('/api/productos', (req, res) => {
  try {
    const producto = productService.addProduct(req.body);
    res.json({ success: true, producto });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Formularios tradicionales
router.post('/productos', (req, res) => {
  try {
    productService.addProduct(req.body);
    res.redirect('/');
  } catch (error) {
    res.render('productos', { 
      productos: productService.getProducts(),
      error: error.message 
    });
  }
});

router.post('/productos/:id/delete', (req, res) => {
  productService.deleteProduct(req.params.id);
  res.redirect('/');
});

module.exports = router;