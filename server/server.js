const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Producto = require('./producto');
const Usuario = require('./user');
const bcrypt = require('bcrypt');

// Función para conectar a la base de datos y agregar productos
async function connectAndAddProducts() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a la base de datos');
    
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
  }
}

// Agregar productos a la base de datos
async function agregarProductos() {
  const producto4 = new Producto({
    nombre: 'producto 4',
    precio: 12,
    imagenURL: 'imagen4',
    categoria: 'categoria 3',
  });

  const producto1 = new Producto({
    nombre: 'producto 1',
    precio: 10,
    imagenURL: 'imagen1',
    categoria: 'categoria 1',
  });

  const producto2 = new Producto({
    nombre: 'producto 2',
    precio: 10,
    imagenURL: 'imagen2',
    categoria: 'categoria 2',
  });


  const producto3 = new Producto({
    nombre: 'producto 3',
    precio: 30,
    imagenURL: 'imagen3',
    categoria: 'categoria 3',
  });





  try {
    await Producto.insertMany([producto1,producto2, producto3, producto4])
    console.log('Producto agregado exitosamente');
  } catch (err) {
    console.log(err);
  }
}

// Conectar a la base de datos y agregar productos
connectAndAddProducts();

// Configuración de la aplicación Express
const app = express();
app.use(bodyParser.json());
app.use(cors());



// Rutas API
app.get('/api/productos', async (req, res) => {
  // Aquí puedes obtener los productos de tu base de datos y enviarlos como respuesta
  try {
    const productos = await Producto.find();
    res.json(productos);
    console.log("productos enviados");
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.post('/api/productos', async (req, res) => {
  const { nombre, precio, imagenURL, categoria } = req.body;

  try {
    // Crea una nueva instancia del modelo Producto
    const nuevoProducto = new Producto({
      nombre: nombre,
      precio: precio,
      imagenURL: imagenURL,
      categoria: categoria,
    });

    // Guarda el nuevo producto en la base de datos
    await nuevoProducto.save();

    res.status(201).json({ mensaje: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});


app.post('/api/registro', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ usuario });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({ usuario, contrasena });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

app.post('/api/inicio-sesion', async (req, res) => {
  const { usuario, contrasena } = req.body;
  console.log('Datos de inicio de sesión:', usuario, contrasena);

  try {
    // Verificar si el usuario existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ usuario });
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const esContraseñaValida = await bcrypt.compare(contrasena, usuarioExistente.contrasena);
    if (!esContraseñaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Enviar respuesta exitosa
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', isAdmin: usuarioExistente.isAdmin });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

app.post('/api/logout', async (req, res) => {
  // Aquí puedes realizar cualquier lógica necesaria para cerrar la sesión del usuario

  // Envía una respuesta exitosa
  res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
});

// Puerto del servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});