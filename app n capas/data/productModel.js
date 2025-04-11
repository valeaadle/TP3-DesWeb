const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'productos.json');

// Cargar o inicializar datos
let productos = [];
try {
  productos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
} catch (err) {
  console.error("Error leyendo productos.json. Inicializando con array vacío.");
  productos = [
    { id: 1, nombre: "Libro de Node.js", precio: 29.99 },
    { id: 2, nombre: "Teclado mecánico", precio: 89.99 }
  ];
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
}

function saveToFile() {
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
}

module.exports = {
  getAll: () => productos,
  add: (producto) => {
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const nuevoProducto = { ...producto, id: nuevoId };
    productos.push(nuevoProducto);
    saveToFile();
    return nuevoProducto;
  },
  delete: (id) => {
    productos = productos.filter(p => p.id !== id);
    saveToFile();
  }
};