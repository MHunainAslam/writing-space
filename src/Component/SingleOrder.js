import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Dashboard/Sidebar';
import { Divider, Empty, List, Skeleton, Tabs } from 'antd';
import Details from './OrderComponents/Details';
import Files from './OrderComponents/Files';
import Message from './OrderComponents/Message';
import Note from './OrderComponents/Note';
import Rating from './OrderComponents/Rating';

const SingleOrder = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setDownloading] = useState(false);
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [ordr, setOrder] = useState(false);
    const [file, setFile] = useState(null);
    const order = params.order;

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://eliteblue.net/research-space/api/webs/single-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: order }),
        })
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.order); setIsLoading(false); })
            .catch((err) => {
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);



    const tabs = [
        {
            key: '1',
            label: `Details`,
            children: <div className="bg-white shadow-sm p-3 rounded-3 vh-70"> <Details order={order} setStatus={setStatus} setOrder={setOrder} /></div>,
        },
        ordr &&
        {
            key: '2',
            label: `Files`,
            children: <div className="bg-white shadow-sm p-3 rounded-3 vh-70"><Files order={order} /></div>,
        },
        ordr &&
        {
            key: '3',
            label: `Message`,
            children: <div className="bg-white shadow-sm p-3 rounded-3 vh-70"><Message order={order} /></div>,
        },
        ordr &&
            4 === parseInt(status) ?
            {
                key: '4',
                label: `Rating & Review`,
                children: <div className="bg-white shadow-sm p-3 rounded-3 vh-70"><Rating /></div>,
            } : {},
        ordr &&
        {
            key: '5',
            label: `Note`,
            children: <div className="bg-white shadow-sm p-3 rounded-3 vh-70"><Note /></div>,
        },
    ];



    return (
        <div className="container-fluid px-0">
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'order'} /></div>

                <div className="col-xl-9 col-lg-9 col-md-8 col-10 user-profile">
                    <div className='row w-100 mx-0 px-0 h-100'>
                        <div className="col-12 mx-0 px-0 h-100">
                            <div className="profile-page text-start h-100">
                                <div className="p-4 h-100">
                                    <div className="mb-5 mt-3 h-100">
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <h3 className="heading fs-3 mb-3">Manage Orders</h3>
                                        </div>
                                        <Tabs defaultActiveKey="1" className='mb-0 h-100' items={tabs} />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="profile-page text-start">
                                    <div className="p-4 ps-2">
                                        {isLoading ? <div className="my-4">
                                            <Skeleton active />
                                        </div> :
                                            !data ?
                                                <Empty description="Something went wrong!" />
                                                :
                                                <div className="mb-5 mt-3">
                                                    <div className="row w-100 mx-auto">
                                                        <div className="col-12">
                                                            <h3 className="heading fs-3 mb-3">Your Subscription</h3>
                                                        </div>


                                                        <div className="col-md-8">
                                                            <div className="card rounded-3 subscription">
                                                                <Divider orientation="left">Order Details</Divider>
                                                                <List
                                                                    size="large"
                                                                    bordered
                                                                >
                                                                    <List.Item> <p className='mb-0'>{data?.title}</p> </List.Item>
                                                                </List>
                                                            </div>

                                                            <div className="card rounded-3 subscription mt-3">
                                                                <Divider orientation="left">Details</Divider>
                                                                <List
                                                                    size="large"
                                                                    bordered
                                                                >
                                                                    <List.Item>  <span className='fw-bold'>Details</span></List.Item>
                                                                    <List.Item> <p className='mb-0 d-flex justify-content-between'><span className='fw-bold'>Subtotal: </span>${data?.order_total}</p> </List.Item>
                                                                    <List.Item> <p className='mb-0 d-flex justify-content-between'><span className='fw-bold'>Discount: </span>- ${data?.coupon_discount}</p> </List.Item>
                                                                    <List.Item> <p className='mb-0 d-flex justify-content-between'><span className='fw-bold'>Grand Total: </span>${data?.grand_total}</p> </List.Item>
                                                                </List>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="card rounded-3 subscription">
                                                                <Divider orientation="left">Customer Info</Divider>
                                                                <List
                                                                    size="large"
                                                                    bordered
                                                                >
                                                                    <List.Item> <p className='mb-0'><span className='fw-bold'>Customer</span><br />{data?.billing_first_name}-{data?.billing_last_name}
                                                                    </p> </List.Item>
                                                                    <List.Item>
                                                                        <p className='mb-0'>
                                                                            <span className='fw-bold'>Billing Address</span>
                                                                            <br />
                                                                            {data?.billing_email}
                                                                            <br />
                                                                            {data?.billing_phone}
                                                                            <br />
                                                                            {data?.billing_street_address}
                                                                            <br />
                                                                            {data?.billing_city}
                                                                            <br />
                                                                            {data?.billing_country}
                                                                        </p>
                                                                    </List.Item>
                                                                    <List.Item> <p className='mb-0'><span className='fw-bold'>Subscription Duration</span><br />{data?.subscription_duration}</p> </List.Item>

                                                                </List>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">

                                                        </div>
                                                    </div>

                                                </div>
                                        }
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleOrder