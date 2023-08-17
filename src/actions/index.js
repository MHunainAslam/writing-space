export const addUserData = (data) => {
    return {
        type: "ADD_USER",
        payload: {
            id: new Date().getTime().toString(),
            data: data,
        }

    }
}

export const setCartItems = (data) => {

    return {
        type: "CART",
        payload: data
    }
}
export const setSubscription = (data) => {

    return {
        type: "SUBSCRIPTION",
        payload: data
    }
}

export const setCouponCode = (code, value) => {

    return {
        type: "DS_CODE",
        code: code,
        value: value
    }
}
export const manageQuantity = (data, type) => {

    return {
        type: "MANAGE_QUANTITY",
        is: type,
        payload: data
    }
}
export const removeCartItems = (data) => {

    return {
        type: "REMOVE_ITEM",
        payload: data
    }
}
export const updateUserData = () => {
    return {
        type: "UPDATE_USER"
    }
}


export const removeUserData = () => {
    return {
        type: "REMOVE_USER"

    }
}

// export const wishlistItems = (data) => {
//     return {
//         type: "WISHLIST",
//         payload: {
//             item_id: new Date().getTime().toString(),
//             items: data
//         }
//     }
// }
// export const updateWishlistItems = (data) => {
//     return {
//         type: "UPDATE_WISHLIST",
//         payload: {
//             item_id: new Date().getTime().toString(),
//             items: data
//         }
//     }
// }