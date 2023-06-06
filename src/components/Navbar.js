import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';



const NavigationBar = ({ onCategoriaClick, onEstadoClick, onCerrarSesion, usuarioLogueado, onMostrarCarrito}) => {



const handleCerrarSesion = () => {
  onCerrarSesion();
  }; 
 
 const  handleEstadoClick = (estado, estado2) => {
    onEstadoClick(estado, estado2);
 }

 const handleCategoriaClick = (categoria) => {
    console.log('Categoría seleccionada:', categoria);
    onCategoriaClick(categoria);
 }

 const handleMostrarCarrito = () => {
  onMostrarCarrito();
};

  return (
    <Navbar bg='light' expand='md'>
      <Navbar.Brand onClick={() => handleCategoriaClick('home')}>Mi Ecommerce</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link onClick={() => handleCategoriaClick('categoria 1')}>Categoría 1</Nav.Link>
          <Nav.Link onClick={() => handleCategoriaClick('categoria 2')}>Categoría 2</Nav.Link>
          <Nav.Link onClick={() => handleCategoriaClick('categoria 3')}>Categoría 3</Nav.Link>
        </Nav>
        <Nav>
        {!usuarioLogueado ? (
          <Nav.Link onClick={()=> handleEstadoClick(true, false)}>Iniciar sesión</Nav.Link>
          ) : null}
         {usuarioLogueado ? (
          <>
          <Nav.Link onClick={handleCerrarSesion}>Cerrar sesión</Nav.Link>
          <Nav.Link onClick={handleMostrarCarrito}>Carrito</Nav.Link>
          </>
          ) : null}
        </Nav>
       
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;