import React, { createContext, FC, useContext, useState } from "react";
import { useBookContext } from "@/context/BookContext"; // Importa tu contexto de libros existente
import Swal from "sweetalert2";
import axios from "axios";
import { Icon } from "semantic-ui-react";

// Crear el contexto de la API de eliminación de libros
type Authors = {
  name: string;
};

type NewBookData = {
  title: string;
  published_date: number;
  price: number;
  image: string;
  Authors: Authors[];
};

interface CrudBookContextType {
  deleteBook: (id_book: number) => Promise<void>;
  newBook: (bookNew: NewBookData) => void;
  errorNewBook: boolean
}

type CrudBookProviderProps = {
  children: React.ReactNode;
};

const CrudBookContext = createContext<CrudBookContextType | undefined>(
  undefined
);

// Hook personalizado "useBookContext" para consumir el contexto
export const useCrudBookContext = () => {
  const context = useContext(CrudBookContext);
  if (!context) {
    throw new Error(
      "useBookDeleteContext debe usarse dentro de un BookProvider"
    );
  }
  return context;
};

// Proporciona un componente de contexto que envuelve a tus componentes
export const CrudBookProvider: React.FC<CrudBookProviderProps> = ({
  children,
}) => {
  const { books, setBooks } = useBookContext();
  const [errorNewBook, setErrorNewBook] = useState(false)

  // Agregar Libros
  const newBook = (bookNew: NewBookData) => {
    try {
      // insertar en la base de datos
      console.log("Agregando a la base de datos");
      
      // Agregar el nuevo libro al estado
      const updatedBooks = [...books, bookNew];
    
      setBooks(updatedBooks); // faltan las demas propiedades del libro
  
      // Mostrar alerta de éxito
      Swal.fire("¡Agregado!", "El libro se ha agregado correctamente.", "success");
    } catch (error) {
      console.error("Error al agregar el libro:", error);
      setErrorNewBook(true); 

      // Alerta de  error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo"
      });
    }
  };
  // Eliminar Libros
  const deleteBook = async (id_book: number) => {
    try {
      // Lógica para realizar el borrado lógico en la base de datos
      console.log(
        `borrando en la base de datos, pasando a false active ${id_book}`
      );
      
      // Recargar la lista de libros después de eliminar
      const bookActualizado = books.filter((book) => book.id_book !== id_book);
      setBooks(bookActualizado);

      // Si se elimina, mostrar alerta
      Swal.fire("Eliminado!", "El libro se eliminó correctamente.", "success");
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      throw error;
    }
  };

  const CrudBookContextValue: CrudBookContextType = {
    deleteBook,
    newBook,
    errorNewBook,
  };

  return (
    <CrudBookContext.Provider value={CrudBookContextValue}>
      {children}
    </CrudBookContext.Provider>
  );
};
