const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CART":
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);



            // if (itemIndex >= 0) {
            //     state.cartItems[itemIndex].cartQuantity += 1;
            //     state.cartItems[itemIndex].cartAmount += parseInt(action.payload.price);
            //     state.cartTotalAmount += parseInt(action.payload.price);
            // }
            // else {
            //     const tempProduct = { ...action.payload, cartQuantity: 1, cartAmount: parseInt(action.payload.price) };
            //     state.cartItems.push(tempProduct);
            //     state.cartTotalAmount += parseInt(action.payload.price);
            // }




            if (itemIndex >= 0) {
                // state.cartItems[itemIndex].cartQuantity += 1;
                // state.cartItems[itemIndex].cartAmount += parseInt(action.payload.price);
                // state.cartTotalAmount += parseInt(action.payload.price);
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1, cartAmount: parseInt(action.payload.price) };
                state.cartItems.push(tempProduct);
                state.cartTotalAmount += parseInt(action.payload.price);
            }

            return {
                cartItems: state.cartItems, cartTotalQuantity: state.cartTotalQuantity, cartTotalAmount: state.cartTotalAmount
            };


        case "MANAGE_QUANTITY":

            const item = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (action.is === "inc") {

                state.cartItems[item].cartQuantity = action.payload.cartQuantity + 1;

                state.cartItems[item].cartAmount = parseInt(action.payload.price) * state.cartItems[item].cartQuantity;

                state.cartTotalAmount += parseInt(action.payload.price);

            }
            else {

                state.cartItems[item].cartQuantity = action.payload.cartQuantity - 1;

                state.cartItems[item].cartAmount = parseInt(action.payload.price) * state.cartItems[item].cartQuantity;

                state.cartTotalAmount -= parseInt(action.payload.price);

            }

            if (state.cartItems[item].cartQuantity <= 0) {
                state.cartItems = state.cartItems.filter(item => item.id != action.payload.id);
            }

            return {
                cartItems: state.cartItems, cartTotalQuantity: state.cartTotalQuantity, cartTotalAmount: state.cartTotalAmount
            };


        case "REMOVE_ITEM":
            state.cartItems = state.cartItems.filter(item => item.id != action.payload.id);
            return {
                cartItems: state.cartItems, cartTotalQuantity: state.cartTotalQuantity, cartTotalAmount: state.cartTotalAmount - action.payload.cartAmount
            };

        default:
            return state;
    }
}

export default cartReducer




