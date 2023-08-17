import Logo from '../assets/research-space-logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Spinner } from '../Spinner';
import { Button } from 'antd';

export const Header = () => {
    const { user, removeUserData, dispatch } = useContext(AppContext);


    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isActive, setActive] = useState(false);
    const [ismobnav, setmobnav] = useState(true);
    const [ismobnavstore, setmobnavstore] = useState(true);
    const [ismobprofile, setmobprofile] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
        setActive(false);
    }, [pathname])


    const Logout = () => {
        dispatch(removeUserData(user.id));
        navigate("/login")
    }



    const [navCurrent, setNavCurrent] = useState(false);
    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <Link to="/" className="nav-logo">
                        <img src={Logo} alt="Discount Space" className='blogo' width="160" />
                    </Link>
                    <ul className={`${navCurrent && "active"} nav-menu`}>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/samples" className="nav-link">Sample Papers</Link>
                        </li>
                        {/* <li className="nav-item cartNav">
                            <Link to="/cart" className="nav-link" data-cart={cartItems.cartItems.length}>Cart</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li>

                        {user ?
                            <li className="nav-item">

                                <div className="custom-dropdown-area cat-dropdown text-uppercase">
                                    <li className="list-unstyled dropdown-toggle" data-bs-toggle="dropdown"><Link to="#"><i className='fa fa-user-alt me-3'></i>{user.data.name}</Link></li>

                                    <ul className="custom-Dropdown dd" id="style-1" style={{ display: 'block' }}>



                                        <li><Link className="dropdown-item" to={'/my-account'}>My Account</Link></li>
                                        <li><Link className="dropdown-item" onClick={Logout}>Logout</Link></li>



                                    </ul>
                                </div>
                            </li>
                            :
                            // <div className="buttons d-flex justify-content-center">
                            <>
                                <li className='nav-item'>

                                    <Link to={'/login'} className="btn log text-dark px-0 fs-16 py-2">
                                        LOGIN
                                    </Link>
                                </li>
                                <li className='nav-item'>

                                    <Link to="register" className="">

                                        <Button type="primary" size='large' className='d-flex'>
                                            Signup Now
                                        </Button>
                                    </Link>
                                </li>
                            </>

                            // </div>

                        }

                    </ul>
                    <div className={`${navCurrent && "active"} hamburger`} onClick={() => setNavCurrent(!navCurrent)}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </header>
        </>
    )
}
