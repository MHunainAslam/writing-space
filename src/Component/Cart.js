import React from 'react'
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, Route, Routes } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Checkout from './Chechkout';

const Cart = () => {

    const { cartItems, manageQuantity, dispatch, removeCartItems } = useContext(AppContext);

    return (
        <>
            <div className="sec pt-md-5 pt-3 bg-white">
                <div className="container">
                    <div class="card cart shadow-none">
                        <div class="row">
                            <div class={`col-md-${cartItems.cartItems.length > 0 ? "8" : "12"} cart`}>
                                <div class="title">
                                    <div class="row">
                                        <div class="col text-dark fs-3"><h4><b>Shopping Cart</b></h4></div>
                                    </div>
                                </div>
                                {cartItems.cartItems.length > 0 ? cartItems.cartItems.map((item) => {
                                    return <div class="row border-top border-bottom">
                                        <div class="row main align-items-center">
                                            <div class="col-2"><img class="img-fluid" src={`https://eliteblue.net/research-space/images/media/${item.image}`} /></div>
                                            <div class="col">
                                                <div class="row text-muted">{item.title}</div>
                                                <div class="row truncate-1" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                            </div>
                                            <div class="col increment d-flex justify-content-end">
                                                <button >-</button><p class="mb-0 border">{item.cartQuantity}</p><button >+</button>
                                                {/* <button onClick={() => dispatch(manageQuantity(item, "dec"))}>-</button><p class="mb-0 border">{item.cartQuantity}</p><button onClick={() => dispatch(manageQuantity(item, "inc"))}>+</button> */}
                                            </div>
                                            <div class="col prize">$ {item.cartAmount} <button class="bg-transparent border-0 close" onClick={() => { dispatch(removeCartItems(item)); toast.success("Item Removed!") }}>&#10005;</button></div>
                                        </div>
                                    </div>
                                }) : <p>Cart is Empty!</p>}
                            </div>


                            {cartItems.cartItems.length > 0 &&
                                <div class="col-md-4 summary">
                                    <div><h5><b>Summary</b></h5></div>
                                    <hr />
                                    <div class="row">
                                        <div class="col pe-0" >ITEMS {cartItems.cartItems.length}</div>
                                        <div class="col text-right">$ {cartItems.cartTotalAmount}</div>
                                    </div>
                                    <div class="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                        <div class="col">TOTAL PRICE</div>
                                        <div class="col text-right">$ {cartItems.cartTotalAmount}</div>
                                    </div>
                                    <Link class="btn btn-main" to="/checkout">CHECKOUT</Link>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart