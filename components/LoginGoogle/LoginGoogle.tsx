import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import decodeJwt from './decodeJwt';
import axios from 'axios';
import { useRouter } from 'next/router'; // Importa useRouter de Next.js

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

export default function LoginGoogle() {
    const [nombre, setNombre] = useState<string | null>(null);
    const router = useRouter(); // Obtiene la instancia de router de Next.js

    function handleError() {
        console.log("Falla del login Google");
    }

    async function handleSuccess(credentialResponse: CredentialResponse) {
        if (credentialResponse.credential) {
            const credenciales = {
                token: credentialResponse.credential
            }
            const { payload } = decodeJwt(credentialResponse.credential);
            setNombre(payload.email);
            console.log("esto es payload.email: ", payload.email);

            try {
                const response = await axios.post(`${bookscapeback}/users/googleloggin`, payload);

                // Verifica si la respuesta del servidor es "aprobado" antes de redirigir
                if (response.data.message === "Login succesfully!") {
                    // Redirige al usuario a la ruta "/"
                    router.push("/");
                } else {
                    console.log("La respuesta del servidor no fue aprobada");
                }
            } catch (error) {
                console.error("Error al comunicarse con el servidor:", error);
            }
        }
    }

    return ( 
        <div>
            {nombre === null && <GoogleLogin useOneTap onError={handleError} onSuccess={handleSuccess} />}
            {nombre && <p>El usuario se ha iniciado sesión: {nombre}</p>}
        </div>
    );
}