import React, { FC, Fragment } from "react";
import usuariosImg from "../../../public/images/🦆 icon _Users icon_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";
import Link from "next/link";
import styles from "../styles.module.css";
import { useUsuarioContext } from "@/context/UsuarioCrudContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface Usuario {
  id: string;
  username: string;
  email: string;
  newPassword: string;
}

const TabUsuarios: FC<{}> = () => {
  const { usuarios, deleteUsuario, setEditarUsuario } = useUsuarioContext();
  const router = useRouter();

  // Confirmar si desea eliminarlo
  const confirmarEliminarUsuario = (id: string) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un usuario que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        deleteUsuario(id);
      }
    });
  };

   // Función para realizar una redirección
   const handleRedireccionar = (usuario: Usuario) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Vas a editar al usuario ${usuario.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditarUsuario(usuario);
        router.push(`/editarUsuario/${usuario.id}`);
      }
    });
  };


  return (
    <Fragment>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2>
            <img src={usuariosImg.src} alt="Logo" />
            Mi perfil
          </h2>
          </div>
        <div className={styles.subTitulo}>
          <p>Modifica tu perfil </p>
          
        </div>
        <div className={styles.resultados}>
        <form>
        <div>
          <label>Usuario</label>
          <input
          className={styles.input}
            type="text"
            placeholder="Usuario"
            name="username"

          />
        </div>
        <div>
          <label>Nueva Contraseña</label>
          <input
          className={styles.input}
            type="text"
            placeholder="Nueva contraseña"
            name="newPassword"
          />
          
        </div>
        <div>
          <label>Correo Electrónico</label>
          <input
          className={styles.input}
            type="text"
            placeholder="email"
            name="email"

          />
        </div>
        {/* agregar mas campos */}
        <button className={styles.button} type="submit">Guardar Cambios</button>
      </form>   
          
        </div>
      </div>
    </Fragment>
  );
};
export default TabUsuarios;
