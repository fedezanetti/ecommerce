import React, { useState } from 'react';

const FormularioCreacionProductos = ({onProductoCargado}) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenURL, setImagenURL] = useState('');
  const [categoria, setCategoria] = useState('');
  const [productoCargado, setProductoCargado] = useState(false);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleImagenURLChange = (event) => {
    setImagenURL(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio),
      imagenURL: imagenURL,
      categoria: categoria,
    };

    // Enviar los datos al servidor
    fetch('http://localhost:5000/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al crear el producto');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
        // Limpia los campos del formulario después de la creación exitosa
        setNombre('');
        setPrecio('');
        setImagenURL('');
        setCategoria('');
        setProductoCargado(true);
        onProductoCargado();
      })
      .catch((error) => {
        console.error('Error al crear el producto:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={handleNombreChange} />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" value={precio} onChange={handlePrecioChange} />
      </div>
      <div>
        <label>URL de la imagen:</label>
        <input type="text" value={imagenURL} onChange={handleImagenURLChange} />
      </div>
      <div>
        <label>Categoría:</label>
        <input type="text" value={categoria} onChange={handleCategoriaChange} />
      </div>
      <button type="submit">Crear producto</button>
      {productoCargado && <p>Producto cargado exitosamente</p>}

    </form>
  );
};

export default FormularioCreacionProductos;