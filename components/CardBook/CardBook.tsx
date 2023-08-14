import React from "react";
import styles from "./CardBook.module.css";
import Link from "next/link";
import { IoIosCart } from "react-icons/io";
import Rating from "../Rating/Rating";
import { useBookContext } from "@/context/BookContext";

type CardBookProps = {
  id: number;
  title: string;
  authors: string;
  price: number;
  genre: string[];
  image: string;
  ratingCount: number;
};

const CardBook: React.FC<CardBookProps> = ({
  id,
  title,
  authors,
  price,
  image,
  ratingCount,
}) => {
  return (
    <div className={styles.imageContainer}>
      <Link href={`/detalle/${id}`} className={styles.card}>
        <div>
          <img src={image} alt={title} className={styles.image} />
          <Rating ratingCount={ratingCount} />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.cardAuthors}>{authors}</h3>
          <p className={styles.cardPrice}>Price: ${price}</p>
        </div>
      </Link>
      <Link href={`/carrito-de-compra/${id}`}>
        <button className={styles.button} type="button">
          Comprar
        </button>
      </Link>{" "}
    </div>
  );
};

export default CardBook;
