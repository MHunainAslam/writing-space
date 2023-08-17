import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { toast } from 'react-hot-toast';



export const FacebookButton = ({ where, continueWithSocials }) => {

    return (
        <>
            <LoginSocialFacebook
                appId='920872965587366'
                onResolve={(res) => {
                    continueWithSocials("facebook", res.data, where, window.location.href);
                }}

                onReject={(err) => {
                    toast.error("Something went wrong!");
                }} >

                <FacebookLoginButton text={`${where === "login" ? "Sign in" : "Signup"}  with facebook`} />
            </LoginSocialFacebook>
        </>
    )
}
