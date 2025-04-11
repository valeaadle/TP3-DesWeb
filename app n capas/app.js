const express = require('express');
const path = require('path');
const app = express();
const productRoutes = require('./presentation/productRoutes');

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use('/', productRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('App funcionando en http://localhost:3000');
});