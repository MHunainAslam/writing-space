import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { AppContext } from '../context/AppContext';
import { PromiseButton } from './Buttons/PromiseButton';

export const Contact = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { APP_NAME, URL, API_TOKEN, setTitle } = useContext(AppContext);
    // setTitle(`${APP_NAME}Contact`);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {

        setTitle(`Contact${APP_NAME}`);
    }, [])

    const onSubmit = (data) => {
        setIsLoading(true)

        data = JSON.stringify(data);

        fetch(`https://eliteblue.net/research-space/api/webs/contact`, {
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

            <>
                <div class="container-fluid">
                    <div class="row shadow-sm">
                        <div class="col-md-12 py-3">
                            <h1 class="text-uppercase text-black m-0">Contact Us</h1>
                        </div>
                    </div>
                </div>
                <div className="sect py-md-5 py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 mx-auto py-5 contact_pg">
                                <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" className='bg-second p-md-5 p-3 mx-0 shadow p-3 shadow-sm rounded-4 text-center'>
                                    <div className="row">
                                        <div className="col-12">
                                            <h1 class="fs-1 fw-sm-bold text-black mb-2 text-uppercase">
                                                NEED HELP WITH SOMETHING?
                                            </h1>
                                            <p className="para">

                                                Please Fill the form below and we'll get back to you as soon as possible. Thank You

                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <input type="hidden" {...register('domain')} name="domain" value={window.location.host} />
                                        </div>
                                        <div className="col-12">
                                            <div className="input-container">
                                                <input {...register('name', { required: true })} type="text" name="name" class={`input ${errors.name && "form-control is-invalid"}`} placeholder='.' />
                                                <label htmlFor="">Your Name*</label>
                                            </div>

                                        </div>
                                        <div className="col-12">

                                            <div className="input-container mb-2">
                                                <input type="email" name="email" class={`input ${errors.email && "form-control is-invalid"}`} placeholder='.' {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                                                <label htmlFor="">Your E-Mail Address*</label>
                                            </div>
                                            {errors.email && <span className='para-sm text-white'>Please Enter a Valid Email</span>}


                                        </div>
                                        <div className="col-12">

                                            <div className="input-container">
                                                <input type="text" name="subject" class={`input ${errors.subject && "form-control is-invalid"}`} placeholder='.' {...register('subject', { required: true })} />
                                                <label htmlFor="">Subject*</label>
                                            </div>

                                        </div>
                                        <div className="col-12">

                                            <div className="input-container textarea">
                                                <textarea name="message" class={`input ${errors.message && "form-control is-invalid"}`} placeholder='.' {...register('message', { required: true })}></textarea>
                                                <label htmlFor="">Message
                                                </label>
                                            </div>

                                        </div>
                                        <div className="col-12">
                                            <button className="bg-signature btn py-0 rounded-3 text-white px-md-4 px-3" type="submit">
                                                <PromiseButton title={"Submit"} loading={isLoading} typ={'text-white fs-5'} />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="test" {...register('example')} />
                <input {...register('exampleRequired', { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input type="submit" />
            </form> */}
        </>

    )
}
