import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { PromiseButton } from '../Buttons/PromiseButton';

export const Forgot = () => {

    const { URL, API_TOKEN } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const onSubmit = (data) => {
        let emailD = email;
        setIsLoading(true);
        postData(`${URL}api/reset&api_token=${API_TOKEN}`, { email: emailD })
            .then(data => {
                if (data.success != false) {
                    navigate("/login");
                    reset();
                }
                else {
                    toast.success(data.message);
                }
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
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
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ transition: { duration: 0.3 }, opacity: 0, x: 100 }}>
            <div className="loginMain">

                <form onSubmit={handleSubmit(onSubmit)} className="login-box" method='POST' autoComplete="new-password">
                    <div className="title">
                        <h1>Reset Password</h1>
                    </div>
                    <div className="input-box">
                        <input type="text" name="email" autoComplete={`false`} className={`inputLogin ${errors.email && " is-invalid"}`} id="username" required {...register('email', { pattern: /^\S+@\S+$/i })} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="username">Email</label>
                    </div>

                    {errors.email && <span className='para-sm text-white'>Please Enter a Valid Email</span>}

                    <button type='submit' className='py-0'>
                        <PromiseButton title={"Send Password Reset Link"} loading={isLoading} />
                    </button>
                    <div className="auth-action">
                        <Link to="/login">Login</Link>
                        <a href="#">Forget Password?</a>
                    </div>
                </form>
            </div>

        </motion.div>
    )
}
