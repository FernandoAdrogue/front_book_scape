import React, { FC, Fragment, useState } from "react";
import libros from "../../../public/images/🦆 icon _categories major_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";
import Link from "next/link";
import styles from "../styles.module.css";
import { useBookContext } from "@/context/BookContext";
import { useCrudBookContext } from "@/context/CrudBookContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

type Language = {
  language: string;
};
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
  isbn: number;
  title: string;
  Authors: Author[];
  published_date: number;
  price: number;
  description: string;
  rating_ave: number;
  image: string;
  page_count: number;
  Tags: Tags[];
  Language: Language;
};

const TabLibros: FC<{}> = () => {
  const { books } = useBookContext();
  const { deleteBook, setEditarBook } = useCrudBookContext();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  

  // Confirmar si desea eliminarlo
  const confirmarEliminarLibro = (id: any) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un libro que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        deleteBook(id);
      }
    });
  };

  // Función para realizar una redirección
  const handleRedireccionar = (book: Book) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Vas a editar el libro ${book.title} de ${book.Authors.map(
        (author) => author.name
      )}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditarBook(book);
        router.push(`/editarLibro/${book.id_book}`);
      }
    });
  };

  const confirmarAgregarLibro = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas agregar un nuevo libro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, agregar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/nuevoLibro`);
      }
    });
  };

  return (
    <Fragment>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2>
            <img src={libros.src} alt="Logo" />
            Mis Libros
          </h2>
        </div>
        <div className={styles.resultados}>
          <div className={styles.titulo}></div>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Reseña</th>
                <th>Descargar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>The Count of Monte Cristo
                </td>
                <td>Alexandre Dumas
                </td>
                <td className={styles.selectores}><Link href="/admin"><img src={modify.src} alt="Modificar" /></Link></td>
                <td></td>
              
              </tr>
                  
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default TabLibros;
