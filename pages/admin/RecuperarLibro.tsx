import React, { useState } from "react";
import styles2 from "./styles.module.css";
import logo from "../../public/images/BookScapeLogo.png";
import Link from "next/link";
import { useBookContext } from "@/context/BookContext";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import libros from "../../public/images/🦆 icon _categories major_.png";
import modify from "../../public/images/🦆 icon _Pen Square_.png";
import del from "../../public/images/🦆 icon _Times Circle_.png";
import styles from "../../components/Admin/styles.module.css";

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

const RecuperarLibro = () => {
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

  // traer los libros borrados
  
  return (
    <div>
      <div className={styles2.contenedor}>
        <div className={styles2.liner}>
          <div className={styles2.logo}>
            <Link href="/">
              <img src={logo.src} alt="Logo" />
            </Link>
          </div>
        </div>
        <div>
          <h3>Panel de Administrador</h3>
        </div>
        <div className={styles2.menu}>
          <div className={styles.contenedor}>
            <div className={styles.titulo}>
              <h2>
                <img src={libros.src} alt="Logo" />
                Recuperar Libros
              </h2>
            </div>
            <div className={styles.subTitulo}>
              <p>Busca y modifica los libros borrados</p>
              <div className={styles.tabsContainer}>
                
              </div>
            </div>
            <div className={styles.resultados}>
              <div className={styles.titulo}></div>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" name="" id="" />
                      Seleccione
                    </th>
                    <th>Imagen</th>
                    <th>Titulo</th>
                    <th>Autor</th>
                    <th>Valor</th>
                    <th>Fecha</th>
                    <th>Modifiar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0
                    ? "No hay Libros disponibles"
                    : books.map((book, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" name="" id="" />
                          </td>
                          <td className={styles.libro}>
                            <img src={book.image} alt={book.title} />
                          </td>
                          <td>{book.title}</td>
                          <td>
                            {book.Authors.map((obj: any, index: any) => (
                              <span key={index}>{obj.name}</span>
                            ))}
                          </td>
                          <td>${book.price}</td>
                          <td>{book.published_date}</td>
                          <td className={styles.selectores}>
                            <button
                              type="button"
                              onClick={() => handleRedireccionar(book)}
                              className={styles.deletebutton}
                            >
                              <img src={modify.src} alt="Modificar" />
                            </button>
                          </td>
                          <td className={styles.selectores}>
                            <button
                              className={styles.deletebutton}
                              onClick={() =>
                                confirmarEliminarLibro(book.id_book)
                              }
                            >
                              <img src={del.src} alt="Eliminar" />
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          Si tiene alguna duda puede contactar al Desarrollador BookScape
        </div>
      </div>
    </div>
  );
};

export default RecuperarLibro;
