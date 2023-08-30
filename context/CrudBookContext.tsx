import React, { createContext, FC, useContext, useState } from "react";
import { useBookContext } from "@/context/BookContext"; // Importa tu contexto de libros existente
import Swal from "sweetalert2";
import axios from "axios";
import { Icon } from "semantic-ui-react";


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


interface CrudBookContextType {
  deleteBook: (id_book: number) => Promise<void>;
  newBook: (bookNew: Book) => void;
  editBooks: (editBook: Book) => void;
  errorNewBook: boolean;
  setEditarBook: React.Dispatch<React.SetStateAction<Book | null>>;
  editarBook: Book | null;
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
  // obtener el libro que vamos a editar
  const [editarBook, setEditarBook] = useState<Book | null>(null);

  // Agregar Libros
  const newBook = (bookNew: Book) => {
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

  // editar libros
  const editBooks = (editBook: Book) => {
      try {
        console.log(`Editar libros ${editBook.title}`);
        // mandar el producto editado a la api

        const librosEditados = books.map((book) => book.id_book === editBook.id_book ? book = editBook : book );
        
        setBooks(librosEditados)
      } catch (error) {
        
      }
  }


  const CrudBookContextValue: CrudBookContextType = {
    deleteBook,
    newBook,
    errorNewBook,
    setEditarBook,
    editarBook,
    editBooks,
  };

  return (
    <CrudBookContext.Provider value={CrudBookContextValue}>
      {children}
    </CrudBookContext.Provider>
  );
};
