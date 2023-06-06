import React from "react";

const Imagen = ({ imagen, onAgregarAlCarrito }) => {
  console.log(imagen); 
  const { categoria, nombre, precio, imagenURL } = imagen;

  const handleComprarClick = () => {
    // Lógica para agregar el producto al carrito
    
    onAgregarAlCarrito(imagen);
    console.log('Producto comprado:', imagen);
  };

  return (
  
       <div className="col-12 col-sm-6 col-md-4 mb-4 col-lg-3" >
            <div className="card">
      <img src={imagenURL} alt={nombre} className="card-img-top" />
      <div className="card-body">
      <p  className="card-text">{nombre}</p>
      <p className="card-text">Precio: ${precio}</p>
      <p className="card-text">{categoria}</p>
      <button onClick={handleComprarClick} className="btn btn-primary">
             Comprar
      </button>
    </div> 
    </div>
    </div>
  )
}

export default Imagen;