import React, { FC, Fragment } from "react";
import money from "../../../public/images/🦆 icon _Dollar Sign icon_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";

import Link from "next/link";
import styles from "../styles.module.css"

const TabPagos: FC<{}> = () => {
  return (
    <Fragment>
      <div className={styles.contenedor}>
      <div className={styles.titulo}>
        <h2><img src={money.src} alt="Logo" />Mis Pagos</h2>  
      </div>
      <div className={styles.resultados}>
              <div className={styles.titulo}></div>
        <table className={styles.tabla}>  
          <thead>
            <tr>     
              <th><input type="checkbox" name="" id="" />Seleccione</th>
              <th>N. Pedido</th>
              <th>N. Carrito</th>
              <th>Libro</th>
              <th>Valor</th>
              <th>Fecha</th>
              <th>Estado transacción</th>
              <th>Modifiar</th>
              <th>Descargar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>01</td>
            <td>01</td>
            <td>The Count of Monte Cristo</td>
            <td>$30.78</td>
            <td>24/08/2023</td>
            <td>Aprobada</td>
            <td className={styles.selectores}><Link href="/admin"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/admin"><img src={del.src} alt="Eliminar" /></Link></td>
            </tr>
          </tbody>
        </table>

      

      </div>
      </div>
      
    </Fragment>
  );
};
export default TabPagos;
