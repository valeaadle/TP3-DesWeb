
## Identificación de capas en el código

1. **Capa de Presentación** (`/presentation`):
   - `productRoutes.js`: Define las rutas HTTP y comunica con la capa de negocio.
   - Ejemplo:
     ```javascript
     router.get('/', (req, res) => {
       const productos = productService.getProducts(); // Llama al servicio
       res.render('productos', { productos }); // Renderiza vista
     });
     ```

2. **Capa de Negocio** (`/business`):
   - `productService.js`: Contiene reglas de negocio (validaciones, cálculos).
   - Ejemplo:
     ```javascript
     addProduct: (datos) => {
       if (!datos.nombre) throw new Error('Nombre es requerido');
       return productModel.add(datos); // Llama al modelo
     }
     ```

3. **Capa de Datos** (`/data`):
   - `productModel.js`: Gestiona el almacenamiento (lectura/escritura del JSON).
   - Ejemplo:
     ```javascript
     add: (producto) => {
       productos.push(producto); // Agrega a la "base de datos"
       saveToFile(); // Persiste en disco
     }
     ```

## Ventajas vs Arquitectura Monolítica

✅ **Mantenibilidad**:
   - Cada capa puede modificarse sin afectar a las otras.  
   - Ejemplo: Cambiar de JSON a MySQL solo requiere modificar `productModel.js`.

✅ **Escalabilidad**:
   - Puedes escalar capas independientemente (ej: añadir más servidores solo para la lógica de negocio).

✅ **Testabilidad**:
   - Cada componente se prueba aisladamente:
     ```javascript
     // Ejemplo test unitario para productService
     test('addProduct valida nombre', () => {
       expect(() => productService.addProduct({ precio: 10 })).toThrow();
     });
     ```

✅ **Trabajo en equipo**:
   - Diferentes desarrolladores pueden trabajar simultáneamente en:
     - Frontend (presentación)
     - Reglas de negocio
     - Base de datos

✅ **Reutilización**:
   - La capa de negocio puede usarse con:
     - API REST
     - GraphQL
     - Aplicación móvil (si se expone como servicio)
