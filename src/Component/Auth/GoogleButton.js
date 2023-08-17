import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


export const GoogleButton = ({ where, continueWithSocials }) => {

    const login = useGoogleLogin({
        onSuccess: async response => {
            const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            });

 
            continueWithSocials('google', data.data, where, window.location.href)

        },
        onError: () => toast.error("Something went wrong!"),
    });

    return (
        <>

            <div className="google-btn d-flex align-items-center" onClick={login}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                </div>
                <div>

                    <p className="btn-text text-white mb-0">{where === "login" ? "Sign in" : "Signup"}  with google</p>

                </div>
            </div>

        </>
    )
}
