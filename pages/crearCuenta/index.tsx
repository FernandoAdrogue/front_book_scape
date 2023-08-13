import React, { useState } from "react";
import styles from "./crearcuenta.module.css"; // Importa los estilos del módulo CSS

// validaciones
import useValidacion from "../../hooks/useValidacion";
import validarCrearCuenta from "../../validacion/validarCrearCuenta";
import Link from "next/link";

interface ValidacionErrors {
  [key: string]: string;
}

interface UseValidacionProps<T> {
  stateInicial: T;
  validar: (valores: T) => ValidacionErrors;
  fn: () => void;
}

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  passwordRepetida: "",
};

const Crearcuenta = () => {
  const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion({
      stateInicial: STATE_INICIAL,
      validar: validarCrearCuenta,
      fn: crearCuenta,
    });

  const { nombre, email, password, passwordRepetida } = valores;

  async function crearCuenta() {
    try {
      console.log("Creando cuenta...");
    } catch (error: any) {
      console.error("Hubo un error al crear el usuario ", error.message);
      guardarError(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nombre">Tu nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombres y Apellidos"
            name="nombre"
            className={styles.input}
            value={nombre}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errores.nombre && <p>{errores.nombre}</p>}
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            className={styles.input}
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errores.email && <p>{errores.email}</p>}
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Como mínimo 6 caracteres"
            name="password"
            className={styles.input}
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errores.password && <p>{errores.password}</p>}
        <div>
          <label htmlFor="passwordRepetida">
            Vuelve a escribir la contraseña
          </label>
          <input
            type="password"
            id="passwordRepetida"
            placeholder="Repetir la contraseña"
            name="passwordRepetida"
            className={styles.input}
            value={passwordRepetida}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errores.passwordRepetida && <p>{errores.passwordRepetida}</p>}

        {error && <p>{error} </p>}
        <input type="submit" value="Crear Cuenta" className={styles.button} />
      </form>
      <div>
        <p>
          Al crear una cuenta, aceptas las Condiciones de Uso y el Aviso de
          Privacidad de BookScape.
        </p>
      </div>
      <div>
        <p>¿Ya tienes una cuenta? <Link href="/login">Iniciar sesión</Link></p>
      </div>
    </div>
  );
};

export default Crearcuenta;
