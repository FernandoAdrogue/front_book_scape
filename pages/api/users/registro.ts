import { NextApiRequest, NextApiResponse } from "next";
import { getUsers, addUser } from "../../../db/user";

interface ValoresUsuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {

      const valores: ValoresUsuario = req.body;
      const nuevoUsuario = {
        id: getUsers().length + 1,
        nombre: valores.nombre,
        email: valores.email,
        password: valores.password,
      };

      addUser(nuevoUsuario);

      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el usuario" });
    }
  }

  if (req.method === "GET") {
    try {
      const users = getUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
