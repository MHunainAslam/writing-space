const initialData = {
    user: [],
    couponCode: []
}

const userReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_USER":
            const { data, id } = action.payload;
            // return {
            //     ...state,
            //     user: [
            //         ...state.user,
            //         {
            //             id: id,
            //             data: data

            //         }]
            // }
            // return {
            //     // ...state,
            //     user: [
            //         // ...state.user,
            //         {
            //             id: id,
            //             data: data,
            //         },],
            // }


            return {
                user: [
                    {
                        id: id,
                        data: data,
                    },],
                couponCode: [{
                    code: "",
                    value: ""
                }],
            }


        case "DS_CODE":
            console.log(action.code);
            return {
                user: state.user,
                couponCode: [{
                    code: action.code,
                    value: action.value
                }],
            }
                ;


        case "REMOVE_USER":
            return {
                user: [
                ],
                couponCode: [{
                    code: "",
                    value: ""
                }]
            }
        // case "STYLE":
        //     const { id, style } = action.payload;
        //     // console.log(state.user[0].data);
        //     return {
        //         user: [
        //             // ...state,
        //             ...state.user,
        //             {
        //                 id: id,
        //                 style: style
        //             }
        //         ]
        //     }

        default:
            return state;
    }
}

export default userReducer


// export default wishlistReducer

// export default { userReducer, wishlistReducer }