

import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Logowhite from '../assets/research-space-logo-whitee.png';


export const Footer1 = () => {

    const { URL, API_TOKEN } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setIsLoading(true)

        data = JSON.stringify(data);
        fetch(`https://eliteblue.net/research-space/api/webs/newsletter-subscribe?api_token=${API_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                    reset();
                }
                else {
                    toast.error(json.message);
                }
                setIsLoading(false);
            }).catch(err => {
                toast.error("Something Went Wrong!");
                setIsLoading(false);
            })
    };


    return (
        <>
            <div class="mt-5 pt-5 pb-5 footer1">
                <div class="container py-md-4">
                    <div class="row">
                        <div class="col-lg-5 col-xs-12 about-company">
                            <img src={Logowhite} alt="" width={132} />
                            <p class="pr-5 text-white my-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis </p>
                        </div>
                        <div class="col-lg-3 col-xs-12 links">
                            <h4 class="mt-lg-0 mt-sm-3">Quick Links</h4>
                            <ul class="m-0 p-0">
                                {/* <li>- <Link to="/about">About</Link></li>
                                <li>- <Link to="#">Faq's</Link></li> */}
                                <li>- <Link to="/contact">Contact</Link></li>
                                <li>- <Link to="/privacy-policy">Privacy Policy</Link></li>
                                <li>- <Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                                <li>- <Link to="/cookiepolicy">Cookie Policy</Link></li>
                                <li>- <Link to="/copyright">Copyright</Link></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-xs-12 location mt-md-0 mt-4">
                            <h4 class="">News Letter</h4>
                            <form onSubmit={handleSubmit(onSubmit)} class="d-flex gap-2">
                                <input type="text" class={`form-control text-dark w-75 ${errors.email && " is-invalid"}`} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Enter Email Address" />
                                <button type="submit" class="w-25 btn bg-white">
                                    {isLoading ?
                                        <div class="spinner-border text-main" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        : <i class="fas fa-paper-plane text-main" aria-hidden="true"></i>}

                                </button>

                            </form>

                            <div class="social_profile">
                                <ul className='justify-content-start'>
                                    <li><a class="bg-white " target="_blank" href="//instagram.com"><i class="text-main fab fa-instagram" aria-hidden="true"></i></a></li>

                                    <li><a class="bg-white " target="_blank" href="//facebook.com"><i class="text-main fab fa-facebook-f" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">

                <div class="row py-3">
                    <div class="col copyright text-center">
                        <p class=" mb-0"><small class="text-dark">  © Copyright 2022 | All Rights Reserved  | Powered By <Link to="//eliteblue.net" target="_blank" class="text-uppercase text-dark">elite blue technologies</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    )
}
