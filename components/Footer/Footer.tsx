import React from "react";
import styles from "./Footer.module.css";
import vector from "../../public/images/Vector.png";
import instagram from "../../public/images/🦆 icon _instagram fill icon_.png";
import logo from "../../public/images/BookScapeLogo.png";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";


const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>

      <div className={styles.logo}>
        <img src={logo.src} alt="" />
      </div>
      <div className={styles.SearchBar}>
            Que quieres leer Hoy?
            <SearchBar />{" "}
          </div>
      <div className={styles.redes}>
        {" "}
        <img src={vector.src} alt="facebook" />
        <img src={instagram.src} alt="instagram" />
      </div>
      
      <div className={styles.links}>
        <p>Mi Cuenta <br /> 
        Carrito<br />
        Terminos y Condiciones<br />
        </p>
      </div>    

    </div>
    <div className={styles.developer}>Desarrollado Por EbookScape TM. 2023</div>
    </div>
  );
};

export default Footer;
