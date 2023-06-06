import React, { useState, useEffect } from 'react';
import Resultados from "./Resultados"
import NavigationBar from './Navbar';
import '../styles.css';
import FormularioInicioSesion from './FormularioInicioSesion';
import FormularioCreacionProductos from './FormularioCreacionProductos';
import Carrito from './Carrito';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResumenCompra from './ResumenCompra';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoria] = useState(null);
  const [mostrarFormulario, setFormulario] = useState(false);
  const [mostrarResultados, setResultados] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);



  const handleUsuarioLogin = (usuarioformulario) => {
    setFormulario(false);
    setRegistroExitoso(true);
    setResultados(true);
    setUsuario(usuarioformulario)
    setUsuarioLogueado(true);
   
  };

  const handleAgregarAlCarrito  = (producto) => {
    if (!usuarioLogueado) {
      setFormulario(true);
    } else {
      setCarrito((prevCarrito) => [...prevCarrito, producto]);
      setCantidadProductos((prevCantidad) => prevCantidad + 1);
      setTotalGasto((prevTotal) => prevTotal + producto.precio);
    }
  };

  const handleMostrarCarrito = () => {
    setMostrarCarrito(true);
  };

  const handleAdminLogin = (adminStatus, usuarioformulario) => {
    setEsAdmin(adminStatus);
    setFormulario(true);
    setUsuario(usuarioformulario);
    setUsuarioLogueado(true);
  };

  const handleRegistroExitoso = (usuarioadmin) => {
    setFormulario(false);
    setRegistroExitoso(true);
    setResultados(true);
    setUsuarioLogueado(true);
    
  };

  const handleEstadoClick = (estado, estado2) => {
    setFormulario(estado);
    setResultados(estado2);
  };

  const handleCategoriaClick = (categoria) => {
    if (categoria === "home") {
      setCategoria(null);
      setResultados(true);
      setFormulario(false);
      setMostrarCarrito(false);
    } else {
      setCategoria(categoria);
    }
    setResultados(true);
    setFormulario(false);
    setMostrarCarrito(false);
  };

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.categoria === categoriaSeleccionada)
    : productos;

  useEffect(() => {
    // Llamada a la API para obtener los productos
    fetch('http://localhost:5000/api/productos')
      .then((response) => {
        console.log('Respuesta de la API:', response);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos:', data);
        setProductos(data);
      })
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  const handleCerrarSesion = () => {
    // Restablece el estado de usuario y esAdmin a los valores predeterminados
    setUsuario('');
    setEsAdmin(false);
    setFormulario(true);
    setUsuarioLogueado(false);
    setCarrito ([]);
    setCantidadProductos(0);
    setTotalGasto(0);
  };

  const handleProductoCargado = () => {
    // Realiza una nueva llamada a la API para obtener los productos actualizados
    fetch('http://localhost:5000/api/productos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos:', data);
        setProductos((prevProductos) => [...prevProductos, ...data]);
      })
      .catch((error) => console.error('Error al obtener los productos:', error));
  };


  return (
    <Router>
      <div className='app container'>
        <NavigationBar
          onCategoriaClick={handleCategoriaClick}
          onEstadoClick={handleEstadoClick}
          onCerrarSesion={handleCerrarSesion}
          usuarioLogueado={usuarioLogueado}
          onMostrarCarrito={handleMostrarCarrito}
        />
        {usuarioLogueado && !mostrarFormulario && mostrarResultados && (
          <ResumenCompra cantidadProductos={cantidadProductos} totalGasto={totalGasto} /> )}
        {usuario && <h1>Hola: {usuario}</h1>}
        {mostrarFormulario && esAdmin ? (
          <FormularioCreacionProductos onProductoCargado={handleProductoCargado} />
        ) : mostrarFormulario ? (
          <FormularioInicioSesion
            onAdminLogin={handleAdminLogin}
            onRegistro={handleRegistroExitoso}
            onUsuario={handleUsuarioLogin}
          />
        ) : (
          <div>
            {mostrarCarrito && <Carrito productos={carrito} />}
            {!mostrarCarrito && mostrarResultados && (
              <Routes>
                
                <Route path="/" element={<Resultados imagenes={productosFiltrados} onAgregarAlCarrito={handleAgregarAlCarrito} />} />
                {/* Rest of the routes */}
              </Routes>
            )}
            
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;






