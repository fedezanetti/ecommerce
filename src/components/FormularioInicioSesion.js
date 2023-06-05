import React, { useState } from 'react';
import axios from 'axios';

const FormularioInicioSesion = ({ onAdminLogin, onRegistro, onUsuario }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleUsuarioChange = (event) => {
    setUsuario(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleInicioSesion = (event) => {
    event.preventDefault();

    const datosUsuario = {
      usuario: usuario,
      contrasena: contrasena,
    };
    
  console.log('Datos de usuario:', datosUsuario);

    // Send the data to the server to log in
    axios
    .post('http://localhost:5000/api/inicio-sesion', datosUsuario)
    .then((response) => {
      console.log(response.data);
      onUsuario(usuario);
      setUsuario('');
      setContrasena('');
      if (response.data.isAdmin) {
        onAdminLogin(true, usuario);
       
      }
    })
    .catch((error) => {
      console.error('Error al iniciar sesión:', error);
    });
};

  const handleRegistro = (event) => {
    event.preventDefault();

    const datosUsuario = {
      usuario: usuario,
      contrasena: contrasena,
    };

    // Send the data to the server to register a new user
    fetch('http://localhost:5000/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        onRegistro();
        setUsuario('');
        setContrasena('');
        
        // Call the callback function to handle successful registration
        
      })
      .catch((error) => {
        console.error('Error al registrar el usuario:', error);
      });
  };

  return (
    <form>
      <div>
        <label>Usuario:</label>
        <input type="text" value={usuario} onChange={handleUsuarioChange} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={contrasena} onChange={handleContrasenaChange} />
      </div>
      <button type="button" onClick={handleInicioSesion}>
        Iniciar sesión
      </button>
      <button type="button" onClick={handleRegistro}>
        Registrarse
      </button>
    </form>
  );
};

export default FormularioInicioSesion;