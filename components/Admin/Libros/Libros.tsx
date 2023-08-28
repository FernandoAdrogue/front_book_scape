import React, { FC, Fragment } from "react";
import libros from "../../../public/images/🦆 icon _categories major_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";
import Link from "next/link";
import styles from "../styles.module.css";
import { useBookContext } from "@/context/BookContext";
import { useCrudBookContext } from "@/context/CrudBookContext";
import Swal from "sweetalert2";

const TabLibros: FC<{}> = () => {
  const { books } = useBookContext();
  const { deleteBook } = useCrudBookContext();

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
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        deleteBook(id);
      }
    });
  };

  return (
    <Fragment>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2>
            <img src={libros.src} alt="Logo" />
            Libros
          </h2>
          <span>
            <input type="search" name="" id="" className={styles.buscador} />
            <img src={buscar.src} alt="buscador" />
          </span>
        </div>
        <div className={styles.subTitulo}>
          <p>Busca y modifica las Ordenes de Pedidos </p>
          <div>
            <Link href="/nuevoLibro">
              <button className={styles.button} type="submit">
                Nuevo Libro
              </button>
            </Link>
            <Link href="/">
              <button className={styles.button} type="submit">
                Exportar Libros
              </button>
            </Link>
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
              {books.length === 0 ? "No hay Libros disponibles": (books.map((book, index) => (
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
                    <Link href="/editarLibro/">
                      <img src={modify.src} alt="Modificar" />
                    </Link>
                  </td>
                  <td className={styles.selectores}>
                    <button
                      className={styles.deletebutton}
                      onClick={() => confirmarEliminarLibro(book.id_book)}
                    >
                      <img src={del.src} alt="Eliminar" />
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default TabLibros;
