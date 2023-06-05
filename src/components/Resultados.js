import React from 'react';
import Imagen from './Imagen';

const Resultados = ({ imagenes }) => {
  return (
    <div>
      {imagenes.map((imagen) => (
        <Imagen key={imagen.id} imagen={imagen} /> 
      ))}
    </div>
  );
};

export default Resultados;