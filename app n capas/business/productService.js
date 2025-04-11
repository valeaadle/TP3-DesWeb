const productModel = require('../data/productModel');

module.exports = {
  getProducts: () => productModel.getAll(),
  addProduct: (datos) => {
    // Validación
    if (!datos.nombre || isNaN(parseFloat(datos.precio))) {
      throw new Error('Nombre (string) y precio (number) son requeridos');
    }
    return productModel.add({
      nombre: String(datos.nombre),
      precio: parseFloat(datos.precio)
    });
  },
  deleteProduct: (id) => productModel.delete(parseInt(id))
};