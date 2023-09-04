import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import decodeJwt from './decodeJwt';
import axios from 'axios';

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local


export default function LoginGoogle() {
    const [nombre, setNombre] = useState<string | null>(null);

    function handleError() {
        console.log("Falla del login Google");

    }

    async function handleSuccess(credentialResponse: CredentialResponse) {
        if (credentialResponse.credential) {
            const { payload } = decodeJwt(credentialResponse.credential)
            console.log("payload credential", payload);
            setNombre(payload.nombre);
            const response = await axios.post(`${bookscapeback}/googleloggin`,payload)
            /*fetch("Colocar ruta aqui", {
                method: "POST",
                body: JSON.stringify({
                    token: credentialResponse.credential
                })
            });*/
            console.log("response", response);
        }
    }

    return ( 
        <div>
            {nombre === null && <GoogleLogin useOneTap onError={handleError} onSuccess={handleSuccess} />}
            {nombre && <p>El usuario se ha iniciado sesion: {nombre}</p>}
        </div>
    )}