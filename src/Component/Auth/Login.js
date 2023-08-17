import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { PromiseButton } from '../Buttons/PromiseButton';
import { GoogleButton } from './GoogleButton';
import { FacebookButton } from './FacebookButton';

export const Login = ({ continueWithSocials }) => {

    const { URL, dispatch, addUserData, setTitle, API_TOKEN, APP_NAME, setWishlistItems, setHeartedTags, user } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // user && navigate("/my-account");
    useEffect(() => {
        setTitle(`Login${APP_NAME}`);
    }, [])
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur" });


    const onSubmit = (data) => {
        let emailD = email;
        let passwordD = password;
        setIsLoading(true);
        postData(`https://eliteblue.net/research-space/api/webs/signin`, { email: emailD, password: passwordD })
            .then(data => {
                // console.log(data.data.user_token);
                console.log(data);
                if (data.success != false) {

                    // fetch(`${URL}api/web/react-items?user_token=${data.data.user_token}&type=wishlist&api_token=${API_TOKEN}`)
                    //     .then((response) => response.json())
                    //     .then((actualData) => { setWishlistItems(actualData); })

                    // fetch(`${URL}api/web/getgoals`, {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ user_token: user.data.user_token })
                    // })
                    //     .then((response) => response.json())
                    //     .then((actualData) => { setHeartedTags(JSON.parse(actualData[0].keywords)); })


                    dispatch(addUserData(data.data));

                    toast.success(data.message);
                    navigate("/my-account");
                    reset();
                } else {
                    toast.error(data.message);
                }
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
                console.log(err);
                toast.error("Something went wrong!");

            });

    };

    async function postData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>            <div className="loginMain">

            <form onSubmit={handleSubmit(onSubmit)} className="login-box" method='POST' autoComplete="off">
                <div className="fs-5">
                    <h1 className='fs-4 fw-bold'>LOGIN YOUR ACCOUNT</h1>
                </div>
                <div className="input-box">
                    <input type="text" name="email" autoComplete={`false`} className={`inputLogin ${errors.email && " is-invalid"}`} id="username" required {...register('email', { pattern: /^\S+@\S+$/i })} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="username">Email</label>
                </div>

                {errors.email && <span className='para-sm text-dark'>Please Enter a Valid Email</span>}

                <div className="input-box">
                    <input type="password" name="password" autoComplete="off" className="input pass-input" id="password" required {...register('password', { minLength: 8 })} onChange={(e) => setPassword(e.target.value)} />

                    <div></div>
                    <label htmlFor="password">Password</label>
                </div>
                {errors.password && <span className='para-sm text-dark'>Password Must 8 Character</span>}
                {/* <div className="remember-me">
                        <input type="checkbox" checked name="" id="checkbox" />
                        <label htmlFor="checkbox" className='ps-2'>Remember Me</label>
                    </div> */}
                <button type='submit' className='py-2'>
                    <PromiseButton title={"Login"} typ='text-white' loading={isLoading} />
                </button>
                <div className="or"></div>
                <div className="mb-3 glButton">

                    <GoogleButton continueWithSocials={continueWithSocials} where={'login'} />

                </div>
                <div className="my-3 fbButton">

                    <FacebookButton continueWithSocials={continueWithSocials} where={'login'} />

                </div>
                <div className="auth-action">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
            </form>
        </div>

        </motion.div>
    )
}
