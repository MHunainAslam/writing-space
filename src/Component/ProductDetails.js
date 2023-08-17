import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { PromiseButton } from './Buttons/PromiseButton';
import { Spinner } from './Spinner';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Skeleton, Tooltip } from 'antd';
import axios from 'axios'
import { saveAs } from "file-saver";
import { HeartOutlined, HeartFilled, LikeFilled, LikeOutlined, ShoppingCartOutlined } from '@ant-design/icons';


export const ProductDetails = () => {
    const { user } = useContext(AppContext);
    const download = useRef(null);
    const navigate = useNavigate();

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setDownloading] = useState(false);
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const singlePd = params.singleProduct;

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://eliteblue.net/research-space/api/webs/single-paper`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: singlePd }),
        })
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); setIsLoading(false); })
            .catch((err) => {
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);


    const HandleDownload = async () => {
        if (!user) {
            return navigate('/login');
        }

        setDownloading(true);
        await fetch(`https://eliteblue.net/research-space/api/webs/in-papers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: singlePd, user_token: user.data.user_token }),
        })
            .then((response) => response.json())
            .then((actualData) => {
                if (actualData.success === false) {
                    setFile(actualData);
                    setDownloading(false);
                    return toast.error(actualData.message);
                }
                else {
                    setFile(actualData);
                    setDownloading(false);
                    toast.success("Downloading");
                    saveAs(
                        `${actualData.file_path}/${actualData.data.file_upload}`,
                        "download.pdf",
                    );
                }
            })
            .catch((err) => {
                setDownloading(false);
                toast.error("something went wrong!");
            });
        // if (file.success) {

        // }
    }

    return (
        <div className='py-md-5 py-3 bg-light'>
            <div className="container">
                {isLoading ? <div className="my-4">
                    <Skeleton active />
                </div>
                    :
                    <div className="row">
                        <div className="col-md-4 my-md-auto my-3">
                            <img src={"https://i1.rgstatic.net/publication/345154413_Why_Is_Python_Programming_Language_Gaining_So_Much_Popularity/links/5f9f9813299bf1b53e59baec/largepreview.png"} alt="Sample" className='w-100 border-dark border rounded-4' />
                        </div>
                        <div className="col-md-8 my-auto">
                            <div className="mb-3">

                                <a class="fs-2 text-main fw-bold truncate-1" href="#">{data?.title}</a>
                            </div>
                            <div className="my-3">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="fw-bold fs-5 mb-2">Summary</p>

                                    </div>
                                    <div className="col-6 text-end">

                                        <Tooltip title="wishlist">

                                            <HeartFilled />


                                            <HeartOutlined />

                                        </Tooltip>

                                    </div>
                                </div>
                                <div class="text mt-0 truncate-5" dangerouslySetInnerHTML={{ __html: data?.summary }}>
                                </div>
                            </div>
                            <div className="my-3">
                                <button onClick={HandleDownload} className="btn btn-main py-1">
                                    {/* <PromiseButton title={'Download Full Paper'} loading={isDownloading} typ="text-white" /> */}


                                    <Button type="white" className={"text-white"} icon={<DownloadOutlined />} loading={isDownloading} >
                                        Download Full Paper
                                    </Button>


                                </button>
                                {/* <a href={file && file} ref={download} download></a> */}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
