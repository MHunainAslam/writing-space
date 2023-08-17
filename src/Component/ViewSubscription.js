




import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Skeleton, Slider, Tooltip } from 'antd';


const ViewSubscription = () => {


    const params = useParams();


    const [isLoading, setIsLoading] = useState(false);
    const [noOfPages, setNoOfPages] = useState({ min: 0, max: 100 });
    const [data, setData] = useState(null);
    const [price, setPrice] = useState(0);
    const [permission, setPermission] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://eliteblue.net/research-space/api/webs/view-subscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: params.subscription }),
        })
            .then((response) => response.json())
            .then((actualData) => { setData(actualData); setIsLoading(false); setPermission(actualData.data.permission); setPrice(parseInt(actualData.data.minimum_pages_allowed)); setNoOfPages({ min: parseInt(actualData.data.minimum_pages_allowed), max: parseInt(actualData.data.maximum_pages_allowed) }) })
            .catch((err) => {
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);

    return (
        <div className='py-md-5 py-3 bg-light'>
            <div className="container">
                {isLoading ? <div className="my-4">
                    <Skeleton active />
                </div>
                    :
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`${data?.image_path}/${data?.data.image}`} alt="Sample" className='w-100 border-dark border rounded-4' />
                        </div>
                        <div className="col-md-8 my-auto">
                            <div className="mb-3">

                                <a class="fs-2 text-main fw-bold truncate-1" href="#">{data?.data.title}</a>

                            </div>
                            <div className="my-3">

                                <div className="row">

                                    <div className="col-12">

                                        <p className="fw-bold fs-5 mb-2">Summary</p>

                                    </div>

                                </div>
                                <div class="text mt-0 " dangerouslySetInnerHTML={{ __html: data?.data.description }}>
                                </div>
                                {
                                    permission === 'writing-service' &&
                                    <div className="row">
                                        <div className="col-12">
                                            <Slider
                                                min={noOfPages.min}
                                                max={noOfPages.max}
                                                onChange={(e) => setPrice(e)}
                                            />
                                        </div>

                                    </div>
                                }
                            </div>
                            {data &&
                                <div className="my-3 d-flex">


                                    <Link className="btn btn-main"
                                        to={{
                                            pathname: `/checkout/${data?.data.slug}`,
                                            search: `${permission === `writing-service` ? `?pages=${price}` : `?pages=none`}`,
                                            state: { fromDashboard: true }
                                        }}
                                    >Buy Now</Link>
                                    <div className='d-flex align-items-center flex-column ms-3'>
                                        <div className='d-flex gap-2 align-items-center'>

                                            <strike class="text-end fs-sm">$  {permission === `writing-service` ? parseInt(data?.data.compare_price_per_page) * price : data.data.compare_price}</strike>
                                            <div class="text-end">$ {permission === `writing-service` ? parseInt(data?.data.actual_price_per_page) * price : data.data.actual_price}</div>
                                        </div>
                                        <p className="mb-0 truncate-2 text-start">
                                            /{data.data.subscription_duration} Month
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ViewSubscription