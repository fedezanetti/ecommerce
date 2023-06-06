import React from 'react';
import Imagen from './Imagen';

const Resultados = ({ imagenes, onAgregarAlCarrito }) => {
  return (
    <div>
      {imagenes.map((imagen) => (
        <Imagen key={imagen.id} imagen={imagen} onAgregarAlCarrito={onAgregarAlCarrito} />
      ))}
    </div>
  );
};

export default Resultados;