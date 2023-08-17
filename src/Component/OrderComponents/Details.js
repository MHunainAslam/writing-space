import { Alert, Button, Card, Divider, Empty, Form, Input, List, Modal, Skeleton, Upload } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const Details = ({ order, setStatus, setOrder }) => {

    const { URL, user, dispatch, addUserData, APP_NAME } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const [currentProduct, setCurrentProduct] = useState('');
    const [title, setTitle] = useState('');
    const [err, setErr] = useState(false);
    const [Nerr, setNErr] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const showModal = (item) => {
        setOpen(true);
        setCurrentProduct(item);
    };


    useEffect(() => {
        setLoading(true);



        fetch(`${URL}api/webs/fetch-order`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order_id: order, user_token: user.data.user_token }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data.data[0]);
                    setStatus(data.data[0]?.erp_status);
                    setOrder(true);
                } else {
                    toast.error(data.message);
                    setErr(true);
                }

                setLoading(false);
            })
            .catch(() => {
                toast.error('Something went wrong!');
                setLoading(false);
                setNErr(true);
            })
    }, [])
    const onFinish = (values) => {
        console.log(values);
    };


    const [messages, setMessages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = () => {

        setUploading(true);
        const formData = new FormData();


        formData.append('order_id', order);
        formData.append('txt', title);
        formData.append('type', "message");
        formData.append('user_token', user.data.user_token);




        // console.log(ffff);
        setUploading(true);
        fetch(`${URL}api/webs/manage-files`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.success) {

                    toast.success(data.message);

                    // data.path.forEach(item => {
                    //     // console.log(item);
                    // });


                    for (const item of data.path) {
                        setFiles([...files, { file: item, files: data.files, title: data.title, file_id: data.file_id, name: user.data.name, created_at: data.created_at, user_token: user.data.user_token }]);
                    }

                } else {
                    toast.error(data.message);
                }

                setOpen(false);
                setMessages([]);
                setTitle('');
                setUploading(false);
            })
            .catch(() => {
                toast.error('upload failed.');
                setUploading(false);
            })
            .finally(() => {
                setUploading(false);
            });
    };



    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    const now = new Date().getTime();
    const [nowDate, setNowDate] = useState(now);
    const futureDate = new Date(data?.erp_datetime).getTime();
    const timeleft = futureDate - nowDate;



    setInterval(() => {
        setNowDate(new Date().getTime());
    }, 1000);


    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);


    return (
        <>
            <Modal
                title="Inquiry Now"
                open={open}
                onOk={handleUpload}

                confirmLoading={uploading}
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => setOpen(false)}
            >
                <Form
                    form={form}
                    encType='multipart/form-data'
                    name="form_in_modal"
                    onFinish={onFinish}
                    initialValues={{ modifier: 'public' }}
                    layout={'vertical'}
                    style={{ maxWidth: "100%", marginTop: 18 }}
                >
                    {/* <div className='d-flex gap-2'> */}
                    <div className='w-100 d-flex flex-column'>
                        <div className="d-flex w-100">
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Type Message...' />
                        </div>
                    </div>
                    {/* </div> */}
                </Form >
            </Modal >
            <div className="row">
                <div className="col-12">

                    <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">Details</h5>
                        <button className="btn btn-main" onClick={() => showModal(true)}>
                            Post Additional
                        </button>
                    </div>

                </div>
                {isLoading ? <div className="col-12 my-4">
                    <Skeleton active />
                </div> :
                    err ?
                        <Empty className="col-12 my-4" description="Order Not Found!" />
                        :
                        Nerr ?
                            <Empty className="col-12 my-4" description="Something went wrong!" />
                            :
                            <>
                                <div className="col-md-9 mt-3">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-md-4 px-1 my-2">
                                            <Card size="small" className='shadow-sm' bordered={false}>
                                                Order ID : {data.id}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card size="small" className='shadow-sm' bordered={false}>
                                                Number of Pages: {data.erp_number_Pages}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Topic: {data.erp_order_topic}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Spacing: {data.erp_spacing}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Sources: {data.erp_resource_materials}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Customer’s Deadline: {
                                                    data.erp_deadline === 'erp_eight_hrs' ?
                                                        '8 hours' : data.erp_deadline === 'erp_tf_hrs' ?
                                                            '24 hours' : data.erp_deadline === 'erp_fe_hrs' ?
                                                                '48 hours' : data.erp_deadline === 'erp_three_days' ?
                                                                    '  3 days' : data.erp_deadline === 'erp_five_days' ?
                                                                        '5 days' : data.erp_deadline === 'erp_seven_days' ?
                                                                            '  7 days' : data.erp_deadline === 'erp_fourteen_days' ?
                                                                                ' 14 days' : data.erp_deadline === 'erp_fourteen_plus_days' ?
                                                                                    ' 14+ days' : ""
                                                }
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Paper Format: {data.erp_paper_format}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Academic Level: {data.erp_paper_format}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Paper Type: {data.paper_type}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Paper Type file:  <a href={`${URL}public/uploads/${order}/${data.paperformat_file}`} download><i class="fa fa-file fa-2x mx-2" aria-hidden="true"> </i></a>
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Paper format file: <a href={`${URL}public/uploads/${order}/${data.papertype_file}`} download><i class="fa fa-file fa-2x mx-2" aria-hidden="true"> </i></a>
                                            </Card>
                                        </div>
                                        {data.erp_resource_file &&
                                            <div className="col-md-4 px-1 my-2">
                                                <Card className='shadow-sm' size="small" bordered={false}>
                                                    Customer Resource File: <a href={`${URL}public/${data.erp_resource_file}`} download><i class="fa fa-file fa-2x mx-2" aria-hidden="true"> </i></a>
                                                </Card>
                                            </div>
                                        }
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Paper Type description: {data.papertype_desc}
                                            </Card>
                                        </div>
                                        <div className="col-md-4 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Paper format description: {data.paperformat_desc}
                                            </Card>
                                        </div>
                                    </div>
                                    <Divider className='my-2' />
                                    <div className="row w-100 mx-auto">
                                        <div className="col-md-6 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                PowerPoint Slides : {data.erp_powerPoint_slides}
                                            </Card>
                                        </div>
                                        <div className="col-md-6 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                1-Page Summary: {data.erp_page_summary}
                                            </Card>
                                        </div>
                                        <div className="col-md-6 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Statistical Analysis: {data.erp_statistical_analysis}
                                            </Card>
                                        </div>
                                        <div className="col-md-6 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Abstract: {data.erp_abstract_page}
                                            </Card>
                                        </div>
                                        <div className="col-md-6 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                A Copy of Sources: {data.erp_copy_sources}
                                            </Card>
                                        </div>
                                        <div className="col-md-6 px-1 my-2">
                                            <Card className='shadow-sm' size="small" bordered={false}>
                                                Outline in Bullets: {data.erp_paper_outline}
                                            </Card>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 mt-3">
                                    <div className="row">
                                        <div className="col-12 px-1 my-2">
                                            <Card size="small" className='shadow-sm' title="Order Deadline:" bordered={false}>
                                                {data.erp_datetime &&
                                                    `${new Date(data?.erp_datetime)?.getDate()}-${monthNames[new Date(data?.erp_datetime)?.getMonth()].slice(0, 3)}-${new Date(data?.erp_datetime)?.getFullYear()} | ${formatAMPM(new Date(data?.erp_datetime))}`}
                                            </Card>
                                        </div>
                                        <div className="col-12 px-1 my-2">
                                            <Card className='shadow-sm' size="small" title="Time Left:" bordered={false}>
                                                {days < 0 || hours < 0 || minutes < 0 ?
                                                    <Alert message={`${`${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`}`} type='error' />
                                                    : `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
                                                }

                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </>
                }


            </div>
        </>
    )
}

export default Details