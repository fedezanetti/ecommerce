import React, { useState, useEffect } from 'react';
import Resultados from "./Resultados"
import NavigationBar from './Navbar';
import '../styles.css';
import FormularioInicioSesion from './FormularioInicioSesion';
import FormularioCreacionProductos from './FormularioCreacionProductos';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoria] = useState(null);
  const [mostrarFormulario, setFormulario] = useState(false);
  const [mostrarResultados, setResultados] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleUsuarioLogin = (usuarioformulario) => {
    setFormulario(false);
    setRegistroExitoso(true);
    setResultados(true);
    setUsuario(usuarioformulario)
   
  };

  const handleAdminLogin = (adminStatus, usuarioformulario) => {
    setEsAdmin(adminStatus);
    setFormulario(true);
    setUsuario(usuarioformulario);
  };

  const handleRegistroExitoso = (usuarioadmin) => {
    setFormulario(false);
    setRegistroExitoso(true);
    setResultados(true);
    
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
    } else {
      setCategoria(categoria);
    }
    setResultados(true);
    setFormulario(false);
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
        setProductos(data);
      })
      .catch((error) => console.error('Error al obtener los productos:', error));
  };


return (
  <div className='app container'>
    <NavigationBar onCategoriaClick={handleCategoriaClick} onEstadoClick={handleEstadoClick} onCerrarSesion={handleCerrarSesion} />
    {usuario && <h1>Hola: {usuario}</h1>}
    {mostrarFormulario && esAdmin ? (
      <FormularioCreacionProductos  onProductoCargado={handleProductoCargado}/>
    ) : mostrarFormulario ? (
      <FormularioInicioSesion onAdminLogin={handleAdminLogin}  onRegistro={handleRegistroExitoso} onUsuario={handleUsuarioLogin}/>
    ) : (
      <div>
        
       
        {mostrarResultados && <Resultados key={productosFiltrados.id} imagenes={productosFiltrados} />}
      </div>
    )}
  </div>
);
};

export default App;






