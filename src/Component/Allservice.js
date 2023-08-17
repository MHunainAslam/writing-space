import { Alert, Button, Empty, Form, Input, InputNumber, Modal, Pagination, Popover, Segmented, Skeleton, Steps, Tooltip } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Allservice = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isErr, setIsError] = useState(false);
    const [slider, setSlider] = useState([]);
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);
    const [currentProduct, setCurrentProduct] = useState('');
    const [open, setOpen] = useState(false);
    const { URL, setCartItems, cartItems, user, dispatch, style, setStyle, APP_NAME, setTitle, heartedTags } = useContext(AppContext);


    useEffect(() => {
        setTitle(`Home${APP_NAME}`);
        fetch(`https://eliteblue.net/research-space/api/webs/subscription`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); setIsLoading(false); setImg(actualData.image_path); })
            .catch((err) => {
                setData([]);
                setIsError(true);
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);
    const showModal = (item) => {
        setOpen(true);
        setCurrentProduct(item);
    };
    return (
        <>
            <div class="section py-5 text-whtie sec-1 bg-main papers">
                <div class="container"><div class="row"><div class="col-md-12 text-start my-auto text-center"><h1 class="display-4 mb-0 fw-bold text-white">What are you looking for?</h1></div>
              </div></div></div>
            <div className="container my-5">
                <div className="row">
                    {data.map((item) => {
                        return <div className="col-lg-4 col-md-6 col-12 my-3" key={item.id}>
                            <Link to={`/view-subscription/${item.slug}`} >

                                <div class="product-card h-100 rounded-1">
                                    <div className="d-flex">
                                        <div class="product-tumb col-4">
                                            <img src={`${img}/${item.image}`} alt="" />
                                        </div>
                                        <div class="product-details col-8">
                                            <h6><a href="">{item.title}</a></h6>
                                            <p className='service-card-desc-home' dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                        </div>
                                    </div>
                                    <div class="product-bottom-details">
                                        {item.permission === 'inquire' &&
                                            <div className='mb-3'>
                                                <Alert message="Our limit is exceed!" type="info" />
                                            </div>
                                        }
                                        <div className='align-items-center justify-content-between'>

                                            <div class="product-price text-center">
                                                {/* {item.compare_price_per_page && */}

                                                <strike className="fs-sm">
                                                    ${item.permission === `writing-service` ? parseInt(item.compare_price_per_page) * parseInt(item.minimum_pages_allowed) : item.compare_price}&nbsp;&nbsp;
                                                </strike>

                                                {/* } */}
                                                $<span className='pe-4'>{item.permission === `writing-service` ? parseInt(item.actual_price_per_page) * parseInt(item.minimum_pages_allowed) : item.compare_price}</span>
                                                /{item.subscription_duration} Months
                                            </div>
                                            <div class="product-links w-100 text-center my-3">
                                                {
                                                    item?.permission != 'inquire'
                                                        ?
                                                        <Link className="py-2 btn btn-main" to={`/view-subscription/${item.slug}`} >
                                                            Buy Now
                                                        </Link>
                                                        :
                                                        <Tooltip placement="top" title={"Inquire Now"}>
                                                            <button className="py-2 btn btn-main type-light text-white" onClick={() => showModal(item.id)}>
                                                                Notify Me
                                                            </button>
                                                        </Tooltip>
                                                }
                                                {/* <button className="py-2 btn btn-main" onClick={() => addToCart(item)} >
                                                                        Buy Now
                                                                    </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Allservice