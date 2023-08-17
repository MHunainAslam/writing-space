
import {
    Button,
    Empty,
    Form,
    Input,
    Select,
    Skeleton,
    Space,
} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Spinner } from './Spinner';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PromiseButton } from './Buttons/PromiseButton';

const { Option } = Select;

const Checkout = () => {
    const params = useParams();
    const item = params.item;
    const order_id = params.item;
    const query = new URLSearchParams(window.location.search);
    const pages = query.get('pages')
    const [data, setData] = useState([]);
    const { user, cartItems, setCouponCode, discountCode, dispatch } = useContext(AppContext);
    const [isDtLoading, setIsDtLoading] = useState(false);
    const [couponLoading, setCouponLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [dicountField, setDiscountField] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);

    const [form] = Form.useForm();

    const [isLoading, setisLoading] = useState(false)
    const [price, setPrice] = useState({ regular_price: 0, discount_price: 0 })

    const navigator = useNavigate();


    // discountCode = {
    //     value: 20,
    //     code : "T645tyhbs"
    // }
    useEffect(() => {
        setIsDtLoading(true);

        async function fetchData() {
            await fetch(`https://eliteblue.net/research-space/api/webs/${pages === 'custom' ? 'single-custom-order' : 'single-subscription'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: item }),
            })
                .then((response) => response.json())
                .then((actualData) => {

                    setData(actualData);

                    setIsDtLoading(false);



                    if (pages === 'custom') {

                        if (actualData.data[0].is_paid === 1) {
                            setError(true);
                        }
                        else {
                            setPrice({ regular_price: null, discount_price: parseInt(actualData?.data[0].order_price) });

                            if (actualData?.data[0].is_paid === 1) {
                                setError(true);
                            }
                        }
                    }
                    else {

                        if (pages === 'none') {
                            setPrice({ regular_price: parseInt(actualData?.data.compare_price), discount_price: parseInt(actualData?.data.actual_price) })
                        }
                        else {
                            setPrice({ regular_price: parseInt(actualData?.data.compare_price_per_page) * pages, discount_price: parseInt(actualData?.data.actual_price_per_page) * pages })
                            if (isNaN(parseInt(pages)) || parseInt(actualData.data?.minimum_pages_allowed) > pages || parseInt(actualData.data?.maximum_pages_allowed) < pages || pages === null) {
                                setError(true);
                            }
                        }
                    }


                })
                .catch((err) => {
                    setIsDtLoading(false);
                    toast.error("something went wrong!");
                }
                );
        }

        fetchData()


    }, []);







    const onFinish = (values) => {
        setisLoading(true);

        // values.coupon_discount = otherFields.coupon_discount
        // values.grand_total = otherFields.grand_total
        // values.order_total = otherFields.order_total


        // {
        //     discountValue || discountCode.value
        //         ?
        //         (discountValue ?
        //             <>
        //                 <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
        //                     <div class="col text-start">DISCOUNT ({discountValue && `${discountValue}%`})</div>
        //                     <div class="col text-end">- ${(data.data?.price * discountValue / 100)} </div>
        //                 </div>
        //                 <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
        //                     <div class="col text-start">GRAND TOTAL</div>
        //                     <div class="col text-end">${data.data?.price - (data.data?.price * discountValue / 100)} </div>
        //                 </div>
        //             </>

        //             :
        //             <>

        //                 <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
        //                     <div class="col text-start">DISCOUNT ({discountCode.value && `${discountCode.value}%`})</div>
        //                     <div class="col text-end">- ${(data.data?.price * discountCode.value / 100)} </div>
        //                 </div>
        //                 <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
        //                     <div class="col text-start">GRAND TOTAL</div>
        //                     <div class="col text-end">${data.data?.price - (data.data?.price * discountCode.value / 100)} </div>
        //                 </div>
        //             </>)
        //         :
        //         <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
        //             <div class="col text-start">GRAND TOTAL</div>
        //             <div class="col text-end">${data.data?.price} </div>
        //         </div>
        // }




        if (discountValue || discountCode.value) {
            if (discountValue) {
                console.log("if");
                values.coupon_discount = discountValue ? price.discount_price * discountValue / 100 : 0
                values.grand_total = price.discount_price - (price.discount_price * discountValue / 100)
                values.order_total = price.discount_price
            }
            else {
                console.log("else");
                values.coupon_discount = discountCode.value ? price.discount_price * discountCode.value / 100 : 0
                values.grand_total = price.discount_price - (price.discount_price * discountCode.value / 100)
                values.order_total = price.discount_price
                // setOtherFields({ ...otherFields, coupon_discount: discountCode.value ? discountCode.value : 0, grand_total: JSON.parse(price.discount_price) - (JSON.parse(price.discount_price) * discountCode.value / 100), order_total: JSON.parse(price.discount_price) })
            }
        }
        else {
            values.grand_total = price.discount_price;
            values.order_total = price.discount_price;

            // setOtherFields({ ...otherFields, grand_total: JSON.parse(price.price) })
            // setOtherFields({ ...otherFields, grand_total: JSON.parse(price.price), order_total: JSON.parse(price.price) })
        }

        // console.log(values.coupon_discount,
        //     values.grand_total,
        //     values.order_total,);

        fetch(`https://eliteblue.net/research-space/api/webs/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then(res => res.json())
            .then(json => {

                toast.success(json.message);
                setisLoading(false);
                if (json.success) {
                    navigator('/my-subscriptions');
                }

                // fetch(`https://eliteblue.net/research-space/api/webs/user-permissions`, {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ user_token: user.data.user_token }),
                // })
                //     .then((response) => response.json())
                //     .then((json) => {

                //         console.log(json);

                //     })
                //     .catch((err) => {
                //         console.log(err);
                //         setIsDtLoading(false);
                //         toast.error("something went wrong!");
                //     });


            }).catch(err => {
                toast.error("Something Went Wrong!");
                setisLoading(false);
            })
    };


    const onCoupon = (code) => {
        setCouponLoading(true);
        console.log(code);
        fetch(`https://eliteblue.net/research-space/api/webs/coupon-discount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ discount_code: code }),
        })
            .then(res => res.json())
            .then(json => {

                if (json.success) {
                    toast.success(json.message);
                    if (!discountCode.code) {
                        // dispatch(setCouponCode(code, parseInt(json.data.value)));
                    }
                    setDiscountValue(parseInt(json.data.value));
                }
                else {
                    toast.error(json.message);
                    setDiscountValue(0);
                }
                setCouponLoading(false);

            }).catch(err => {
                setDiscountValue(0);
                toast.error("Something Went Wrong!");
                setCouponLoading(false);
            })
    }

    const proceedPayment = useRef(null);

    // const [otherFields, setOtherFields] = useState(
    //     {
    //         grand_total: 0,

    //         coupon_discount: 0,

    //         order_total: 0
    //     }
    // );

    // useEffect(() => {

    //     setTimeout(() => {

    //         if (discountValue || discountCode.value) {
    //             if (discountValue) {

    //                 setOtherFields({ ...otherFields, coupon_discount: discountValue ? discountValue : 0, grand_total: JSON.parse(data.data?.price) - (JSON.parse(data.data?.price) * discountValue / 100), order_total: JSON.parse(data.data?.price) })
    //             }
    //             else {
    //                 setOtherFields({ ...otherFields, coupon_discount: discountCode.value ? discountCode.value : 0, grand_total: JSON.parse(data.data?.price) - (JSON.parse(data.data?.price) * discountCode.value / 100), order_total: JSON.parse(data.data?.price) })
    //             }
    //         }
    //         else {
    //             setOtherFields({ ...otherFields, grand_total: JSON.parse(data.data?.price) })
    //             setOtherFields({ ...otherFields, grand_total: JSON.parse(data.data?.price), order_total: JSON.parse(data.data?.price) })
    //         }

    //         console.log(otherFields);
    //         console.log(JSON.parse(data.data?.price));

    //     }, 1000);

    // }, [data]);




    // {
    //     grand_total: discountValue || discountCode.value ? discountValue ? data.data?.price - (data.data?.price * discountValue / 100) : data.data?.price - (data.data?.price * discountCode.value / 100) : data.data?.price,

    //     coupon_discount: discountValue || discountCode.value ? discountValue ? discountCode.value : 0 : 0,

    //     order_total: discountValue || discountCode.value ? discountValue ? data.data?.price : data.data?.price : data.data?.price
    // }


    return (
        <>
            <div className="sec pt-md-5 pt-3 bg-white">

                <div className="container">
                    <div class="card cart shadow-none p-0 rounded-0">
                        {isError ?
                            <div class="row p-0">
                                <div className="col-12 cart p-md-5">
                                    <Empty description="Something went wrong!" />
                                </div>
                            </div>
                            :
                            <div class="row p-0">

                                <div class={`col-md-8 cart`}>
                                    <div class="title">
                                        <div class="row">
                                            <div class="col text-dark fs-3"><h4><b>Shopping Cart</b></h4></div>
                                        </div>
                                    </div>
                                    {data.data ?

                                        <Form
                                            layout="vertical"
                                            form={form}
                                            name="register"
                                            className='row w-100 mx-auto p-0'
                                            onFinish={onFinish}
                                            scrollToFirstError
                                        >
                                            <div className='row'>
                                                <div className="d-none">

                                                    <Form.Item
                                                        name="user_token"
                                                        initialValue={user?.data.user_token}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    {
                                                        pages === 'custom' &&
                                                        <div>

                                                            <Form.Item
                                                                name="is_custom_order"
                                                                initialValue={1}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                                name="custom_order_id"
                                                                initialValue={order_id}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                        </div>
                                                    }

                                                    <Form.Item
                                                        name="discount_code"
                                                        initialValue={discountCode?.code}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="no_of_pages"
                                                        initialValue={pages}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    <Form.Item
                                                        name="order_total"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="grand_total"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="coupon_discount"
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    {/* <input type="text" name='order_total' value={otherFields.order_total} />
                                                <input type="text" name='grand_total' value={otherFields.grand_total} />
                                                <input type="text" name='coupon_discount' value={otherFields.coupon_discount} /> */}

                                                    <Form.Item
                                                        name="subscription_id"
                                                        initialValue={data.data.id}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                </div>
                                                <div className="col-md-6">

                                                    <Form.Item
                                                        name="first_name"
                                                        label="First Name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your First Name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        name="last_name"
                                                        label="Last Name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Last Name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        name="phone"
                                                        label="Phone"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Phone!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                        initialValue={user.data.email}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Email!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="Zip Code"
                                                        name="zip_code"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Zip Code!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">


                                                    <Form.Item
                                                        name="country"
                                                        label="Select Country"
                                                        rules={[{ required: true, message: 'Please select your country!' }]}
                                                    >
                                                        <Select placeholder="" className='country'>
                                                            <Option value="china">China</Option>
                                                            <Option value="usa">U.S.A</Option>
                                                        </Select>

                                                    </Form.Item>


                                                </div>

                                                <div className="col-md-6">
                                                    <Form.Item
                                                        name="city"
                                                        label="City"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your City!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        name="state"
                                                        label="State"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your State!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>

                                                <div className="col-md-6">
                                                    <Form.Item
                                                        name="apartment_detail"
                                                        label="Apartment Details"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Apartment Details!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>

                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="Street Address"
                                                        name="street_address"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Street Address!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                                <div className="d-none">

                                                    <Form.Item>
                                                        <button className="btn py-1 btn-main" ref={proceedPayment}>
                                                            <Button type="white" htmlType="submit" className='text-white' loading={isLoading}>
                                                                Proceed Payment
                                                            </Button>
                                                        </button>
                                                    </Form.Item>

                                                </div>
                                            </div>
                                        </Form>
                                        : <div className="my-4">
                                            <Skeleton active={true} />
                                        </div>

                                    }
                                </div>


                                <div class="col-md-4 summary rounded-0">

                                    {!isDtLoading ?

                                        data.data &&

                                        <div className='d-flex flex-column h-100 justify-content-between'>
                                            <div>
                                                <div><h5><b>Summary</b></h5></div>
                                                <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                                    <div className="col">
                                                        <div className="row">
                                                            {pages != 'custom'
                                                                &&
                                                                <div className="col-2">
                                                                    <img src={`${data.image_path}/${data.data.image}`} alt="" className="w-100" />
                                                                </div>
                                                            }
                                                            <div className={`col-${pages != 'custom' ? '10' : '12'} my-auto`}>
                                                                <div className="row">
                                                                    <div className="col-8 my-auto">

                                                                        <p className="mb-0 truncate-1 text-start fw-bold">
                                                                            {pages === 'custom' ? data.data[0].erp_subject_name : data.data.title}
                                                                            &nbsp;

                                                                        </p>
                                                                        {pages != 'custom'
                                                                            &&
                                                                            <p className="mb-0 truncate-2 text-start" >
                                                                                /{data.data.subscription_duration} Month
                                                                            </p>
                                                                        }
                                                                    </div>
                                                                    <div className="col-4 my-auto text-end">
                                                                        {price.regular_price && <strike class="text-end fs-sm">$ {price.regular_price}</strike>}
                                                                        <div class="text-end">$ {price.discount_price}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                                    <div class="col text-start">TOTAL PRICE</div>
                                                    <div class="col text-end">$ {price.discount_price}</div>
                                                </div>

                                                <div className="row my-2">
                                                    <Form
                                                        name="dynamic_form_nest_item"
                                                        className='py-0'
                                                        onFinish={(e) => {
                                                            if (discountCode.code) {
                                                                onCoupon(e.coupon_code);
                                                            }
                                                            else {
                                                                onCoupon(e.coupon_code.coupon_code);
                                                            }
                                                        }
                                                        }
                                                        autoComplete="off"
                                                    >

                                                        {discountCode.code ?

                                                            <div className='w-100 mx-auto'>
                                                                <div className="">

                                                                    <Form.Item className='w-100 mb-2'
                                                                        name="coupon_code"
                                                                        initialValue={discountCode.code}
                                                                        rules={[{ required: true, message: 'Missing Discount Code' }]}
                                                                    >
                                                                        <Input placeholder="Discount Code" />
                                                                    </Form.Item>
                                                                </div>
                                                                <div className="">
                                                                    <Form.Item>
                                                                        <button className="btn btn-main py-0 w-100">
                                                                            <PromiseButton title={'Apply'} loading={couponLoading} typ={'text-white w-100'} />
                                                                        </button>
                                                                        {/* <Button type="primary" loading={couponLoading} htmlType="submit">
                                                                        Apply
                                                                    </Button> */}
                                                                    </Form.Item>
                                                                </div>
                                                            </div>
                                                            :
                                                            <Form.List name="coupon_code">
                                                                {(fields, { add, remove }) => (
                                                                    <>
                                                                        {fields.map(({ key, name, ...restField }) => (
                                                                            <div key={key} className=' '>
                                                                                <div className=" ">

                                                                                    <Form.Item className='w-100 mb-2'
                                                                                        {...restField}
                                                                                        name="coupon_code"
                                                                                        rules={[{ required: true, message: 'Missing Discount Code' }]}
                                                                                    >
                                                                                        <Input placeholder="Discount Code" />
                                                                                    </Form.Item>
                                                                                    {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                                                                                </div>
                                                                                <div className=" ">

                                                                                    {dicountField > 0 &&

                                                                                        // <Form.Item >
                                                                                        //     <Button type="primary" onClick={console.log(fields)} loading={couponLoading} htmlType="submit">
                                                                                        //         Apply
                                                                                        //     </Button>
                                                                                        // </Form.Item>

                                                                                        <Form.Item>
                                                                                            <button className="btn btn-main py-0 w-100">
                                                                                                <PromiseButton title={'Apply'} loading={couponLoading} typ={'text-white w-100'} />
                                                                                            </button>
                                                                                            {/* <Button type="primary" loading={couponLoading} htmlType="submit">
                                                                                            Apply
                                                                                        </Button> */}
                                                                                        </Form.Item>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                        {!fields.length >= 1 &&
                                                                            <Form.Item>
                                                                                <Button type="dashed" onClick={() => { setDiscountField(dicountField + 1); add(); }} block icon={<PlusOutlined />}>
                                                                                    Add Discount Code
                                                                                </Button>
                                                                            </Form.Item>
                                                                        }
                                                                    </>
                                                                )}
                                                            </Form.List>

                                                        }


                                                    </Form>
                                                </div>
                                            </div>
                                            <div className="">

                                                {discountValue || discountCode.value
                                                    ?
                                                    (discountValue ?
                                                        <>
                                                            <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                                                <div class="col text-start">DISCOUNT ({discountValue && `${discountValue}%`})</div>
                                                                <div class="col text-end">- ${(price.discount_price * discountValue / 100)} </div>
                                                            </div>
                                                            <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                                                <div class="col text-start">GRAND TOTAL</div>
                                                                <div class="col text-end">${price.discount_price - (price.discount_price * discountValue / 100)} </div>
                                                            </div>
                                                        </>

                                                        :
                                                        <>

                                                            <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                                                <div class="col text-start">DISCOUNT ({discountCode.value && `${discountCode.value}%`})</div>
                                                                <div class="col text-end">- ${(price.discount_price * discountCode.value / 100)} </div>
                                                            </div>
                                                            <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                                                <div class="col text-start">GRAND TOTAL</div>
                                                                <div class="col text-end">${price.discount_price - (price.discount_price * discountCode.value / 100)} </div>
                                                            </div>
                                                        </>)
                                                    :
                                                    <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                                        <div class="col text-start">GRAND TOTAL</div>
                                                        <div class="col text-end">${price.discount_price} </div>
                                                    </div>
                                                }




                                                <button className="btn py-1 btn-main w-100" onClick={() => proceedPayment.current.click()}>
                                                    <Button type="white" htmlType="submit" className='text-white w-100' loading={isLoading}>
                                                        Proceed Payment
                                                    </Button>
                                                </button>

                                            </div>
                                        </div>
                                        :
                                        <div className="my-4">
                                            <Skeleton active />
                                        </div>

                                    }
                                </div>
                            </div>
                        }


                    </div>
                </div>
            </div>

            {/* <div className="sec pt-md-5 pt-3 bg-white">
            <div className="container">

            

            </div>
        </div> */}
        </>

    );
};

export default Checkout;