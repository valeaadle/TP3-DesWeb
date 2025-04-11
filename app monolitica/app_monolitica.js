// app_monolitica_completa.js
const express = require('express');
const app = express();
const PORT = 3000;

// ==============================================
// BASE DE DATOS EN MEMORIA + LÓGICA DE NEGOCIO
// ==============================================
let productos = [
  { id: 1, nombre: "Libro de Machine Learning", precio: 29.99 },
  { id: 2, nombre: "Silla gamer", precio: 189.99 }
];

function agregarProducto(nombre, precio) {
  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  const nuevoProducto = { id: nuevoId, nombre, precio };
  productos.push(nuevoProducto);
  return nuevoProducto;
}

function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
}

// ==============================================
// INTERFAZ WEB COMPLETA (Todo en un solo archivo)
// ==============================================
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta principal con formulario y lista
app.get('/', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>App Monolítica</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        form { margin: 20px 0; }
        input, button { padding: 8px; margin: 5px; }
      </style>
    </head>
    <body>
      <h1>Gestiona tus productos! (Monolítica)</h1>
      
      <h2>Agregar producto</h2>
      <form action="/productos" method="POST">
        <input type="text" name="nombre" placeholder="Nombre" required>
        <input type="number" name="precio" placeholder="Precio" step="0.01" required>
        <button type="submit">Agregar</button>
      </form>
      
      <h2>Lista de productos</h2>
      <table>
        <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acción</th></tr>
  `;

  // Listar productos
  productos.forEach(producto => {
    html += `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td>
          <form action="/productos/${producto.id}?_method=DELETE" method="POST" style="display:inline;">
            <button type="submit">Eliminar</button>
          </form>
        </td>
      </tr>
    `;
  });

  html += `
      </table>
    </body>
    </html>
  `;
  res.send(html);
});

// API REST (también en el mismo archivo)
app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  const producto = agregarProducto(nombre, parseFloat(precio));
  res.redirect('/');
});

app.post('/productos/:id', (req, res) => {
  eliminarProducto(parseInt(req.params.id));
  res.redirect('/');
});

// ==============================================
// INICIO DEL SERVIDOR
// ==============================================
app.listen(PORT, () => {
  console.log(`App monolítica funcionando en http://localhost:${PORT}`);
});

// ==============================================
// ANÁLISIS (como requiere la consigna)
// ==============================================
/*
¿POR QUÉ ES MONOLÍTICA?
1. Todo el código está en un solo archivo: base de datos, lógica de negocio y presentación.
2. No hay separación de responsabilidades (frontend, backend y datos mezclados).
3. La interfaz web y la API están acopladas en el mismo módulo.

DESVENTAJAS:
1. Dificultad para escalar: A medida que crece la aplicación, el archivo se vuelve muy grande y complejo.
2. Acoplamiento fuerte: Cambios en la interfaz pueden afectar la lógica de negocio y viceversa.
3. Dificultad para trabajar en equipo: Múltiples desarrolladores trabajando en el mismo archivo.
4. Problemas para hacer testing: No se pueden testear componentes de forma aislada.
5. Baja reutilización: La lógica está atada a esta implementación específica.
6. Rendimiento: Todo corre en el mismo proceso, sin posibilidad de escalar componentes individuales.
*/