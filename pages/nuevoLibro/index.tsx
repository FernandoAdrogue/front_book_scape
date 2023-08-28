import React, { useState } from "react";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useRouter } from "next/router";

type Author = {
    name: string;
    // Agrega otras propiedades si es necesario
  };
  
  

type  NuevoLibroData = {
    title: string;
    published_date: number;
    price: number;
    image: string;
    Authors: Author[];
}

const NuevoLibro = () => {
  const { newBook, errorNewBook } = useCrudBookContext();
  const router = useRouter();
 
  const [nuevoLibroData, setNuevoLibroData] = useState<NuevoLibroData>({
    title: "",
    published_date: 0,
    price: 0,
    image: "",
    Authors: [
      {
        name: "",
      },
    ],
  });

  // Cuando el administrador haga submit
  const submitNuevoLibro = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario

    // Si no hay errores

    // Crear el nuevo Libro
    newBook(nuevoLibroData);
    router.push("/admin")
  };

  return (
    <div>
      <div>
        <h2>Agregar Nuevo Libro</h2>
      </div>
      <form onSubmit={submitNuevoLibro}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={nuevoLibroData.title}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Portada</label>
          <input
            type="text"
            placeholder="Portada"
            name="portada"
            value={nuevoLibroData.image}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                image: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Autor</label>
          <input
            type="text"
            placeholder="Autor"
            name="autor"
            value={nuevoLibroData.Authors[0] ? nuevoLibroData.Authors[0].name : ""}
            onChange={(e) => {
              const newAuthors = [
                {
                  name: e.target.value,
                },
              ];
              setNuevoLibroData((prevData) => ({
                ...prevData,
                Authors: newAuthors,
              }));
            }}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            placeholder="Precio"
            name="precio"
            value={nuevoLibroData.price}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                price: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div>
          <label>Fecha</label>
          <input
            type="number"
            placeholder="Año de publicación"
            name="fecha"
            value={nuevoLibroData.published_date}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                published_date: Number(e.target.value),
              }));
            }}
          />
        </div>
        {/* agregar mas campos */}
        <button type="submit">Agregar Libro</button>
      </form>
      {/* agregarle estilos al error */}
      {errorNewBook ? <p>Hubo un error al cargar el libro</p> : null}
    </div>
  );
};

export default NuevoLibro;
