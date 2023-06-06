import React from "react";


const Carrito = ({ productos }) => {
    return (
      <div>
        <h2>Carrito de compras</h2>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>{producto.nombre}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Carrito;