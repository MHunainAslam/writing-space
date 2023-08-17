import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { Spinner } from './Spinner';

export const Product = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    var itm = [
        {
            title: "How to Write Essays",
            description: '  The author of the essay  "How to Write Essays" learned to use the APA citation style, improved his ability to choose the best references for the essays, and use correct grammar for my essay writing too.... Furthermore, English is his second language, and learning such skills was very challenging ',
            img: "https://i1.rgstatic.net/publication/345154413_Why_Is_Python_Programming_Language_Gaining_So_Much_Popularity/links/5f9f9813299bf1b53e59baec/largepreview.png",
            pages: 2,
            downloads: 3,
            words: 342,
            status: "Free",
            slug: ""
        },
        {
            title: "How to Write Essays",
            description: '  The author of the essay  "How to Write Essays" learned to use the APA citation style, improved his ability to choose the best references for the essays, and use correct grammar for my essay writing too.... Furthermore, English is his second language, and learning such skills was very challenging ',
            img: "https://i1.rgstatic.net/publication/330976058_Application_of_python_programming_language_in_measurements/links/5c5e39c692851c48a9c48aa9/largepreview.png",
            pages: 2,
            downloads: 3,
            words: 342,
            status: "Free",
            slug: ""
        },
        {
            title: "How to Restrict Users",
            description: '  The author of the essay  "How to Write Essays" learned to use the APA citation style, improved his ability to choose the best references for the essays, and use correct grammar for my essay writing too.... Furthermore, English is his second language, and learning such skills was very challenging ',
            img: "https://i1.rgstatic.net/publication/320407173_A_COMPARITIVE_ANALYSIS_OF_THE_C_JAVA_AND_PYTHON_LANGUAGES/links/59e2d86b458515393d57fefa/largepreview.png",
            pages: 2,
            downloads: 3,
            words: 342,
            status: "Free",
            slug: ""
        },
        {
            title: "How to Deploy Site in Vercel",
            description: '  The author of the essay  "How to Write Essays" learned to use the APA citation style, improved his ability to choose the best references for the essays, and use correct grammar for my essay writing too.... Furthermore, English is his second language, and learning such skills was very challenging ',
            img: "https://i1.rgstatic.net/publication/330976058_Application_of_python_programming_language_in_measurements/links/5c5e39c692851c48a9c48aa9/largepreview.png",
            pages: 2,
            downloads: 3,
            words: 342,
            status: "Free",
            slug: "how-to-deploy-site-in-vercel"
        },
    ];


    useEffect(() => {
        setIsLoading(true);
        fetch(`https://eliteblue.net/research-space/api/webs/get-papers`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); setIsLoading(false); })
            .catch((err) => {
                setData([]);
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);


    return (
        <>
            <div className="section py-5 text-whtie sec-1 bg-main papers" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-start my-auto text-center">
                            <h1 className="display-4 mb-0 fw-bold text-white">
                                List of Sample Papers
                            </h1>
                            <p className="fs-5 text-light">
                                Find inspiring essay samples today and use them for own papers!
                            </p>
                        </div>
                        <div className="col-12 mt-md-5 mt-3">
                            <ul class="process">
                                <li class="process__item">
                                    <span class="process__number">1</span>
                                    <span class="process__title">Search in Free Essays</span>
                                </li>

                                <li class="process__item">
                                    <span class="process__number">2</span>
                                    <span class="process__title">Download a Free Essay</span>
                                </li>

                                <li class="process__item">
                                    <span class="process__number">3</span>
                                    <span class="process__title">Rewrite essays</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-md-5 pt-3 products">
                <div className="container">
                    <div className="row">
                        {isLoading ? <div className="my-4">
                            <Skeleton active />
                        </div>
                            :
                            data.map((item) => {
                                return <div className="col-12 my-3">
                                    <div className="card rounded-3 p-3 border-muted">
                                        <div className="row">
                                            <div className="col-2">
                                                <img src={"https://i1.rgstatic.net/publication/345154413_Why_Is_Python_Programming_Language_Gaining_So_Much_Popularity/links/5f9f9813299bf1b53e59baec/largepreview.png"} alt="Sample" className='w-100' />
                                            </div>
                                            <div className="col-10 my-auto">

                                                <div className="row w-100 mx-auto">

                                                    <div className="col-8">
                                                        <Link to={item.slug} className="fs-3 text-main fw-normal truncate-1">
                                                            {item.title}
                                                        </Link>
                                                        <p className="mb-0 my-2 truncate-1">
                                                            5  <span className="pages">  pages</span> <span className="words"> (235 words)</span> , <span className="downloads">
                                                                Download </span>54 , <span className="type">
                                                                Free
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="col-4 text-end">
                                                        <Link to={item.slug} className="btn btn-main">
                                                            Preview Sample
                                                        </Link>
                                                    </div>
                                                    <div className="col-12">
                                                        <div class="text my-3" dangerouslySetInnerHTML={{ __html: item.summary }}>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
