import React from "react";
import CardsBooks from "@/components/CardsBooks/CardsBooks";
import styles from "../styles/Home.module.css";
import { useBookContext } from "@/context/BookContext";


function Home() {
  // Utiliza el hook useBookContext para obtener los datos y funciones del contexto
  const { books } = useBookContext();
  
  return (
    <div className={styles.description}>
      {/* //columna izquierda */}
      <div className={styles.descriptionIzq}>
        <h3>Consulta por categorias</h3>
        <p>Poseia</p>
        <p>Poseia</p>
        <p>Poseia</p>
        <p>Poseia</p>
      </div>
      {/* //columna derecha */}
      <div className={styles.descriptionDer}>
        <h3 className={styles.h1}>Bienvenidos</h3>
        <CardsBooks books={books} />
      </div>
    </div>
  );
}

export default Home;
