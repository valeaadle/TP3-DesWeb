const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'productos.json');

// Leer productos iniciales
let productos = [];

try {
  productos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
} catch (err) {
  console.error("Error leyendo productos.json, usando array vacío", err);
  productos = [];
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