import { Button, Empty, Form, Input, List, Modal, Skeleton, Upload } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { DownloadOutlined } from '@ant-design/icons';

const Message = ({ order }) => {


    const { URL, user, dispatch, addUserData, APP_NAME } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);


    const [currentProduct, setCurrentProduct] = useState('');
    const [title, setTitle] = useState('');
    const [err, setErr] = useState('');
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        fetch('https://eliteblue.net/research-space/api/webs/fetch-files', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order_id: order }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === 2) {
                    setErr('No Files Was Found!');
                }
                else if (data.success) {
                    toast.success(data.message);
                    setFiles(data.data);

                } else {
                    toast.error(data.message);

                }

                // setOpen(false)
                setLoading(false);
            })
            .catch(() => {
                toast.error('upload failed.');
                setLoading(false);
            })
    }, [])

    const showModal = (item) => {
        setOpen(true);
        setCurrentProduct(item);
    };


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


        setUploading(true);
        fetch('https://eliteblue.net/research-space/api/webs/manage-files', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.success) {

                    toast.success(data.message);


                    setFiles([...files, { type: data.type, files: data.files, title: data.title, file_id: data.file_id, name: user.data.name, created_at: data.created_at, user_token: user.data.user_token }]);

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
                        <h5 className="fw-bold">Messages</h5>
                        <button className="btn btn-main" onClick={() => showModal(true)}>
                            Type Message
                        </button>
                    </div>

                </div>
                <div className="col-12 my-3 filesItem" style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                }}>

                    {isLoading ? <div className="my-5">
                        <Skeleton active />
                    </div>
                        :
                        !files.length ?
                            err ?
                                <div className="my-5">
                                    <Empty description={`${err}`} />
                                </div>
                                :
                                <div className="my-5">
                                    <Empty description="Something went wrong!" />
                                </div>
                            :
                            files.map((item, i) => {
                                return item.type === 'message' && <div key={i}>
                                    <div className={`fileItem ${item.user_token === user.data.user_token ? 'me' : 'you'}`}>
                                        {/* {

                                            i == 0 || (item.created_at) != (files[i - 1].created_at) ? "Showw" : "noo"

                                        } */}
                                        <div className="fileUserName d-flex justify-content-between">
                                            <p >
                                                {item.user_token === user.data.user_token ? 'You' : item.name}
                                            </p>
                                            <p className=" ">
                                                {item.created_at}
                                            </p>
                                        </div>
                                        <div className='w-100 d-flex align-items-end justify-content-between'>
                                            <div className='mainFileP'>
                                                {item.files.map((itm) => {
                                                    return <div className='str'>
                                                        <a href={`//eliteblue.net/research-space/${itm.file}`} className="fileIcon text-uppercase fw-bold" download={itm.file_name}>
                                                            {/* <DownloadOutlined /> */}
                                                            {itm.file_name.split('.')[1]}
                                                        </a>
                                                        <p className="mb-0 fileName">
                                                            {itm.file_name}
                                                        </p>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                {item.title &&
                                                    <p className="mb-0">
                                                        {item.title}
                                                    </p>
                                                }
                                            </div>
                                            {/* <div className="col-12 text-end">
                                        <p className="mt-3 mb-0 dateTime">
                                            {item.created_at}
                                        </p>
                                    </div> */}
                                        </div>
                                    </div>
                                </div>
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default Message