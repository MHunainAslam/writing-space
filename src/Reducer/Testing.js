const initialState = { cartItems: [], cartTotalQuantity: 0, cartTotalAmount: 0 }


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CART":
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {


                state.cartItems[itemIndex].cartQuantity += 1;
                state.cartTotalAmount += parseInt(action.payload.price);


            }

            else {


                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartTotalAmount += parseInt(action.payload.price);
                state.cartItems.push(tempProduct);


            }

            return {
                cartItems: state.cartItems, cartTotalQuantity: state.cartTotalQuantity, cartTotalAmount: state.cartTotalAmount
            };
        case "REMOVE_ITEM":
            const removeableItem = state.cartItems.findIndex((item) => item.id === action.payload.id); console.log(removeableItem); default: return state;
    }
} 