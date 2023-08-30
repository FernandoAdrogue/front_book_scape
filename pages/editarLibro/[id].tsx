import React, { useState, useEffect } from "react";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useRouter } from "next/router";


// Definición del tipo de objeto "Book"
type Author = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Tags = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Book = {
  id_book: number;
  title: string;
  Authors: Author[];
  published_date: number;
  price: number;
  description: string;
  rating_ave: number;
  image: string;
  page_count: number;
  Tags: Tags[];
  Language: string;
};


const EditarProducto = () => {

  const router = useRouter();

  const { editarBook, editBooks, setEditarBook } = useCrudBookContext();

  // Nuevo state de libros
  const [editBook, setEditBook] = useState<Book>({
    id_book: 0, 
    title: "",
    published_date: 0,
    description: "",
    rating_ave: 0,
    price: 0,
    image: "",
    page_count: 0,
    Authors: [
      {
        name: "",
      },
    ],
    Tags: [
      {
        name: "",
      },
    ],
    Language: "",
  });

  // Llenar el state automáticamente
  useEffect(() => {
    if (editarBook) {
      setEditBook(editarBook);
    }
  }, [editarBook]);

  // Actualizar un campo específico del formulario
  const onChangeFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditBook({
      ...editBook,
      [name]: value,
    });
  };

  const submitEditarLibro = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los cambios o realizar cualquier otra lógica
    editBooks(editBook)// toma el nuevo producto
    setEditarBook(null);
    router.push("/admin")
  };


  return (
    <div>
      <div>
        <h2>Editar Libro</h2>
      </div>
      <form onSubmit={submitEditarLibro}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={editBook?.title}
            onChange={onChangeFormulario}
            // onChange={(e) => {
            //   setNuevoLibroData((prevData) => ({
            //     ...prevData,
            //     title: e.target.value,
            //   }));
            // }}
          />
        </div>
        <div>
          <label>Portada</label>
          <input
            type="text"
            placeholder="Portada"
            name="portada"
            value={editBook?.image}
            onChange={onChangeFormulario}
            // onChange={(e) => {
            //   setNuevoLibroData((prevData) => ({
            //     ...prevData,
            //     image: e.target.value,
            //   }));
            // }}
          />
        </div>
        <div>
          <label>Autor</label>
          <input
            type="text"
            placeholder="Autor"
            name="autor"
            value={editBook?.Authors[0] ? editBook.Authors[0].name : ""}
            onChange={onChangeFormulario}
            // onChange={(e) => {
            //   const newAuthors = [
            //     {
            //       name: e.target.value,
            //     },
            //   ];
            //   setNuevoLibroData((prevData) => ({
            //     ...prevData,
            //     Authors: newAuthors,
            //   }));
            // }}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            placeholder="Precio"
            name="precio"
            value={editBook?.price}
            onChange={onChangeFormulario}
            // onChange={(e) => {
            //   setNuevoLibroData((prevData) => ({
            //     ...prevData,
            //     price: Number(e.target.value),
            //   }));
            // }}
          />
        </div>
        <div>
          <label>Fecha</label>
          <input
            type="number"
            placeholder="Año de publicación"
            name="fecha"
            value={editBook?.published_date}
            onChange={onChangeFormulario}
            // onChange={(e) => {
            //   setNuevoLibroData((prevData) => ({
            //     ...prevData,
            //     published_date: Number(e.target.value),
            //   }));
            // }}
          />
        </div>
        {/* agregar mas campos */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
