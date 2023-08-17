import React, { useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Home } from './Component/Home';
import { AnimatePresence } from 'framer-motion';
import { Contact } from './Component/Contact';
import { Login } from './Component/Auth/Login';
import { Register } from './Component/Auth/Register';
import { AppContext } from './context/AppContext';
import { Spinner } from './Component/Spinner';
import { PrivateRoutes } from './PrivateRoutes';
import { NotFound } from './Component/404';
import { MyAccount } from './Component/Dashboard/MyAccount';
import { Forgot } from './Component/Auth/Forgot';
import { toast } from 'react-hot-toast';
import Cart from './Component/Cart';
import Checkout, { Chechkout } from './Component/Chechkout';
import { Product } from './Component/Product';
import { ProductDetails } from './Component/ProductDetails';
import { MySubscriptions } from './Component/Dashboard/MySubscriptions';
import SingleSubscription from './Component/SingleSubscription';
import PrivacyPolicy from './Component/PrivacyPolicy';
import TermsNConditions from './Component/TermsNConditions';
import About from './Component/About';
import Orders from './Component/Dashboard/Orders';
import SingleOrder from './Component/SingleOrder';
import ViewSubscription from './Component/ViewSubscription';
import CustomOrder from './Component/Dashboard/CustomOrder';
import Cookiepolicy from './Component/Cookiepolicy';
import Copyright from './Component/Copyright';


export const MainRoutes = () => {
    const { isPageLoading, addUserData, dispatch, URL } = useContext(AppContext);

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const continueWithSocials = (type, credentials, where, domain) => {

        if (where === 'login') {

            fetch(`${URL}api/web/loginwithsocial`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success != false) {
                        dispatch(addUserData(data.data, []));
                        toast.success(data.message);
                        navigate('/');
                    } else {
                        toast.error(data.message);
                    }
                }).catch((err) => {
                    toast.error("Something went wrong!");
                })
        }
        else if (where === 'signup') {
            if (type === 'facebook') {
                fetch(`${URL}api/web/signupwithsocial`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success != false) {
                            dispatch(addUserData(data.data, []));
                            toast.success(data.message);
                            navigate('/');

                        } else {
                            toast.error(data.message);
                        }
                    }).catch((err) => {
                        toast.error("Something went wrong!");
                    })
            }

            else {
                fetch(`${URL}api/web/signupwithsocial`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success != false) {
                            dispatch(addUserData(data.data, []));
                            toast.success(data.message);
                            navigate('/');

                        } else {
                            toast.error(data.message);
                        }
                    }).catch((err) => {
                        toast.error("Something went wrong!");
                    })
            }
        }

        else {
            toast.error("Something went wrong!");
        }
    }
    return (
        <AnimatePresence>
            {isPageLoading ?
                <div className="my-4">
                    <Spinner />
                </div>
                :
                <Routes key={pathname} location={pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/samples" element={<Product />} />
                    <Route path="/samples/:singleProduct" element={<ProductDetails />} />
                    <Route path="/password/reset" element={<Forgot />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/login" element={<Login continueWithSocials={continueWithSocials} />} />
                    <Route path="/register" element={<Register continueWithSocials={continueWithSocials} />} />
                    <Route path="/cart" element={<Cart />} exact />
                    <Route path="/about" element={<About />} exact />
                    <Route path="/view-subscription/:subscription" element={<ViewSubscription />} exact />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} exact />
                    <Route path="/terms-and-conditions" element={<TermsNConditions />} exact />
                    <Route path="/cookiepolicy" element={<Cookiepolicy />} exact />
                    <Route path="/copyright" element={<Copyright />} exact />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/checkout/:item" element={<Checkout />} exact />
                        <Route path="/my-account" element={<MyAccount />} exact />
                        <Route path="/custom-order" element={<CustomOrder />} exact />
                        <Route path="/orders" element={<Orders />} exact />
                        <Route path="/single-order/:order" element={<SingleOrder />} />
                        <Route path="/my-subscriptions" element={<MySubscriptions />} exact />
                        <Route path="/my-subscriptions/:subscription" element={<SingleSubscription />} exact />
                    </Route>
                </Routes>
            }
        </AnimatePresence>
    )
}