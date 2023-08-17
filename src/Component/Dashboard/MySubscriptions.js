
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Empty, Skeleton, Table, Tooltip } from 'antd';
import { Link } from 'react-router-dom';



export const MySubscriptions = () => {
    const { URL, user, dispatch, addUserData, APP_NAME, setTitle } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [userName, setUserName] = useState(user.data.name);
    const [userPhone, setUserPhone] = useState(user.data.phone_number);
    const [userAbout, setUserAbout] = useState(user.data.about);
    const [isActiveEditPass, setisActiveEditPass] = useState("false");
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);



    useEffect(() => {
        setIsLoading(true);
        postData(`https://eliteblue.net/research-space/api/webs/get-orders`, { user_token: user.data.user_token })
            .then(data => {
                if (data.success != false) {

                    const list = data.order || [];
                    const firstObj = list[0] || {};

                    const cols = [];

                    for (const dta of list) {
                        const col = {
                            key: dta.id,
                            subscription_duration:
                                dta.no_of_pages === 'custom' ?
                                    (dta.custom_duration === 'erp_eight_hrs' ?
                                        '8 hours' : dta.custom_duration === 'erp_tf_hrs' ?
                                            '24 hours' : dta.custom_duration === 'erp_fe_hrs' ?
                                                '48 hours' : dta.custom_duration === 'erp_three_days' ?
                                                    '  3 days' : dta.custom_duration === 'erp_five_days' ?
                                                        '5 days' : dta.custom_duration === 'erp_seven_days' ?
                                                            '  7 days' : dta.custom_duration === 'erp_fourteen_days' ?
                                                                ' 14 days' : dta.custom_duration === 'erp_fourteen_plus_days' ?
                                                                    ' 14+ days' : "") : `${dta.subscription_duration} /mo`,
                            coupon_discount: `$ ${dta.coupon_discount || 0}`,
                            // coupon_discount: dta.no_of_pages === 'custom' ? 'Custom Order' : `$ ${dta.coupon_discount || 0}`,
                            order_total: dta.order_total,
                            grand_total: dta.grand_total,
                            link_title: {
                                title: dta.no_of_pages === 'custom' ? dta.custom_title : dta.title,
                                slug: dta.no_of_pages === 'custom' ? `./subscription?id=${dta.custom_slug}` : `./subscription?slug=${dta.slug}`
                            },
                        }
                        cols.push(col);
                    }
                    setData(cols);
                } else {
                    toast.error(data.message);
                }
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
                toast.error("Something went wrong!");
            });
    }, [])


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




    const columns = [
        {
            title: 'Title',
            dataIndex: 'link_title',
            key: 1,
            ellipsis: {
                showTitle: false,
            },
            render: (title, i) => (
                <Tooltip placement="topLeft" title={title.title}>
                    <Link to={`${title.slug}`}>{title.title}</Link>
                </Tooltip>
            ),
        },
        {
            title: 'Duration',
            dataIndex: 'subscription_duration',

            key: 2,
            ellipsis: {
                showTitle: false,
            },
            render: (subscription_duration) => (
                <p className="mb-0">
                    {subscription_duration || ''}
                </p>
            ),
        },

        {
            title: 'Total Discount',
            dataIndex: 'coupon_discount',
            key: 3,
            ellipsis: {
                showTitle: false,
            },
            render: (coupon_discount) => (
                <p className="mb-0">

                    {coupon_discount}
                </p>
            ),
        },
        {
            title: 'Total Amount',
            dataIndex: 'order_total',
            key: 4,
            ellipsis: {
                showTitle: false,
            },
            render: (order_total) => (
                <p className="mb-0">
                    $ {order_total}
                </p>
            ),
        },
        {
            title: 'Grand Total',
            dataIndex: 'grand_total',
            key: 5,
            ellipsis: {
                showTitle: false,
            },
            render: (grand_total) => (
                <p className="mb-0">
                    $ {grand_total}
                </p>
            ),
        },
    ];





    return (
        <div className="container-fluid px-0">
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'subscriptions'} /></div>

                <div className="col-xl-9 col-lg-9 col-md-8 col-10" >
                    <div className='row w-100 mx-0 px-0 h-100'>
                        <div className="col-12 mx-0 px-0 user-profile h-100">
                            <div className="profile-page text-start">
                                <div className="p-4">
                                    <div className="mb-5">

                                        <h3 className="heading fs-3 mb-3">Manage Subscription</h3>
                                        {isLoading ? <div className="my-4">
                                            <Skeleton active />
                                        </div> :
                                            !data ?
                                                <Empty description="Something went wrong!" />
                                                :
                                                <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}









