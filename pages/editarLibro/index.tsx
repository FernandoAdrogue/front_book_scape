import React from "react";

const EditarProducto = () => {
  return (
    <div>
      <div>
        <h2>Editar Libro</h2>
      </div>
      <form>
        <div>
          <label>Title</label>
          <input type="text" placeholder="Title" name="title" />
        </div>
        <div>
          <label>Portada</label>
          <input type="text" placeholder="Portada" name="portada" />
        </div>
        <div>
          <label>Autor</label>
          <input type="text" placeholder="Autor" name="autor" />
        </div>
        <div>
          <label>Precio</label>
          <input type="number" placeholder="Precio" name="precio" />
        </div>
        <div>
          <label>Fecha</label>
          <input type="number" placeholder="Año de publicacion" name="fecha" />
        </div>
        {/* agregar mas campos */}
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

export default EditarProducto;
