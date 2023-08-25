import React, { useState } from "react";
import styles from "./index.module.css";
import Tabs from "@components/Admin/Tabs";
// Tabs Components
import TabUsuarios from "@/components/Admin/Usuarios";
import TabLibros from "@/components/Admin/Libros";
import TabPedidos from "@/components/Admin/Pedidos";

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Usuarios",
    index: 1,
    Component: TabUsuarios
  },
  {
    label: "Libros",
    index: 2,
    Component: TabLibros
  },
  {
    label: "Pedidos",
    index: 3,
    Component: TabPedidos
  }
];

export default function Admin() {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  
    return (
      <div className={styles.contenedor}>
        <h1>Panel de Administrador</h1>
        <h2>Bienvenido:  aqui puede editar sus preferencias</h2>
        <br />
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
      </div>
    );
  }