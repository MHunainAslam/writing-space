
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const Sidebar = ({ pageid }) => {
    const { user, removeUserData, dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [permissions, setPermission] = useState([]);
    const [dropdown, setDropdown] = useState(false);

    const Logout = () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(removeUserData(user.id));
            navigate("/login")
        }, 2000);
    }




    useEffect(() => {
        fetch(`https://eliteblue.net/research-space/api/webs/user-permissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_token: user.data.user_token })
        })
            .then(res => res.json())
            .then(json => {
                setPermission(json);

            }).catch(err => {
                toast.error("something went wrong!");
            })
    }, [])

    return (
        <>

            <div className="sidebar active db-bar">
                <div className="logo_content mb-4">
                    <div className="logo">
                        <div className="heading fs-4" style={{ "marginLeft": "5px" }}>{user.data.name}</div>
                    </div>
                </div>
                <ul className="nav_list ps-0 mt-0">
                    <li>
                        <Link className={`${pageid === "account" && "active"}`} to={'/my-account'}>
                            <i class='fa fa-user-circle'></i>
                            <span className="link_names">My Account</span>
                        </Link>
                        <span className="tooltip">My Account</span>
                    </li>
                    <li>
                        <Link className={`${pageid === "subscriptions" && "active"}`} to={'/my-subscriptions'}>
                            <i class='fa fa-comment-dollar'></i>
                            <span className="link_names">Purchase History</span>
                        </Link>
                        <span className="tooltip">Purchase History</span>
                    </li>
                    {permissions.includes("writing-service")
                        &&
                        <li>
                            <Link className={`${dropdown && "active"} justify-content-between dropdown ${pageid === "order" && "bg-main"}`} onClick={() => setDropdown(!dropdown)} to={'#'}>
                                <div>
                                    <i class='fa fa-magic'></i>
                                    <span className="link_names">Manage Orders</span>
                                </div>
                                <i class='fa fa-angle-right angle'></i>
                            </Link>
                            <span className="tooltip">Manage Orders</span>
                            <ul className={`dropdownItems ${dropdown && "active"}`} >
                                <li><Link to="/orders"> Create Project</Link></li>
                            </ul>
                        </li>
                    }

                    <li>
                        <Link className={`${pageid === "custom_order" && "active"}`} to={'/custom-order'}>
                            <i class='fa fa-first-order'></i>
                            <span className="link_names">Create Custom Order</span>
                        </Link>
                        <span className="tooltip">Create Custom Order</span>
                    </li>

                    <li>
                        <a href='#' onClick={Logout}>
                            {isLoading ?
                                <i className='d-flex justify-content-center align-items-center'>
                                    <div className="spinner d-flex justify-content-center align-items-center">
                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </i>
                                :
                                <i class='fa fa-power-off' ></i>
                            }
                            <span className="link_names">Logout</span>
                        </a>
                        <span className="tooltip">Logout</span>
                    </li>
                </ul>
            </div>

        </>
    )
}
