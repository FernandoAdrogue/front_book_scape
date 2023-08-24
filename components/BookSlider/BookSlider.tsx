import React, { useState, useEffect } from "react";
import { useBookContext } from "@/context/BookContext";
import styles from "./BookSlider.module.css";
import Rating from "../Rating/Rating";
import { useAuthContext } from "@/context/AuthContext";
import Link from 'next/link';

const BooksSlider: React.FC = () => {
  const { user, isAuthenticated, rutaLogin } = useAuthContext();
  const { books } = useBookContext();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Ordena los libros por calificación promedio en orden descendente
  const sortedBooks = [...books].sort((a, b) => b.rating_ave - a.rating_ave);
  const topRatedBooks = sortedBooks.slice(0, 5);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topRatedBooks.length);
      }, 10000); // Cambiar cada 10 segundos
    };

    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
      }
    };

    startInterval();

    return () => {
      stopInterval();
    };
  }, [topRatedBooks.length]);

  const goToNextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topRatedBooks.length);
  };

  const goToPreviousBook = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topRatedBooks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.topratedbooksslider}>
      <h2>Libros Destacados</h2>
      <div className={styles.slider}>
        {topRatedBooks
          .slice(currentIndex, currentIndex + 5)
          .map((book, index) => (
            <div
              key={book.id_book}
              className={`${styles.slideritem} ${
                index === 0 ? styles.active : ""
              }`}
            >
              <img src={book.image} alt={book.title} className={styles.image} />
              <Rating rating_ave={book.rating_ave} />
              <h3>{book.title}</h3>
              <p>Calificación Promedio: {book.rating_ave}</p>
              <p>{book.description}</p>
              {isAuthenticated() && user ? (
              <>
                <Link href={"http://mpago.li/2NZfEab"}>
                  <button
                    data-preference-id="97116827-f207eb10-4eb8-4fc2-b6b4-2836e6ad3aa8"
                    className={styles.button}
                    type="button"
                  >
                    Comprar
                  </button>
                  <br />
                </Link>
              </>
            ) : <Link href={"/login"}>
            <button className={styles.button} type="button" onClick={() => rutaLogin("http://mpago.li/2NZfEab")}>
              Comprar
            </button>
            <br />
          </Link>}
            </div>
          ))}
      </div>
      <div className={styles.sliderButtons}>
        <button
          className={styles.sliderButton}
          onClick={goToPreviousBook}
          disabled={currentIndex === 0}
        >
          &lt; Anterior
        </button>
        <button
          className={styles.sliderButton}
          onClick={goToNextBook}
          disabled={currentIndex === topRatedBooks.length - 1}
        >
          Siguiente &gt;
        </button>
      </div>
    </div>
  );
};

export default BooksSlider;
