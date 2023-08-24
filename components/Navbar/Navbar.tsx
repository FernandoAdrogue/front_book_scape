import React from "react";
import Link from "next/link";
import logo from "../../public/images/BookScapeLogo.png";
import styles from "../Navbar/NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { IoIosCart } from "react-icons/io";
import { IoMdPerson, IoLogoWhatsapp } from "react-icons/io";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthContext();

  const usuario = true;
  return (
    <nav>
      <div className={styles.liner}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
        </div>
        <div className={styles.contanier}>
          <div className={styles.SearchBar}>
            <SearchBar />
          </div>

          {isAuthenticated() && user ? (
            <>
              <div className={styles.usuario}>
                <p>Hola {user.username}</p>
                <button
                  type="button"
                  onClick={logout}
                  className={styles.button}
                >
                  Cerrar Sesión
                </button>
              </div>
              <Link href="/carritoDeCompra" className={styles.Iconos}>
                Carrito <IoIosCart />
              </Link>
            </>
          ) : (
            <>
            <Link href="/carritoDeCompra" className={styles.Iconos}>
                Carrito <IoIosCart />
              </Link>
              <Link href="/login" className={styles.Text}>
                Identifícate
                <IoMdPerson />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
