import React from 'react';

const ResumenCompra = ({ cantidadProductos, totalGasto }) => {
  return (
    <div>
      <p>Productos en carrito: {cantidadProductos}</p> <p>Total: ${totalGasto}</p>  
    
    </div>
  );
};

export default ResumenCompra;