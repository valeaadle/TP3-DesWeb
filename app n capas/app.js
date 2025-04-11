const express = require('express');
const app = express();
const productRoutes = require('./presentation/productRoutes');

// Configuración
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para parsear JSON

// Rutas - Asegúrate que productRoutes sea un router válido
app.use('/', productRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('App de 3 capas funcionando en http://localhost:3000');
});