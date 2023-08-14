import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
// Definición del tipo de objeto "Book"
type Book = {
  id: number;
  title: string;
  authors: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  flag: string;
  currency: string;
  ratingCount: number;
  genre: string[];
  language: string;
  stock: number;
};

// Definición del tipo de objeto para el contexto "BookContextType"
type BookContextType = {
  books: Book[];
};

type BookProviderProps = {
  children: React.ReactNode;
};

// Creación del contexto "BookContext" y establecimiento del valor inicial como "undefined"
const BookContext = createContext<BookContextType | undefined>(undefined);

// Hook personalizado "useBookContext" para consumir el contexto
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext debe usarse dentro de un BookProvider");
  }
  return context;
};

// Componente proveedor "BookProvider" del contexto
export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  // Estado local "books" que almacena la lista de libros
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books"); // Asegúrate de que la ruta sea correcta
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };


  // Creación del objeto "contextValue" con la información del contexto
  const contextValue: BookContextType = {
    books
  };

  // Retorna el componente "BookContext.Provider" que envuelve a los componentes hijos
  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
};
