import React from 'react'

export const CartItemsz = ({ cartItem, dispatch, removeCartItems, toast }) => {
    return (
        <div class={`col-md-${cartItem.cartItems.length > 0 ? "8" : "12"} cart`}>
            <div class="title">
                <div class="row">
                    <div class="col text-dark fs-3"><h4><b>Shopping Cart</b></h4></div>
                </div>
            </div>
            {cartItem.cartItems.length > 0 ? cartItem.cartItems.map((item) => {
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
    )
}
