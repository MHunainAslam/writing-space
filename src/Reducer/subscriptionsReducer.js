const initialState = {
    subscriptions: [],
}

const subscriptionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBSCRIPTION":
            const { data } = action;
            console.log(data);
        // return {
        //     subscriptions: data
        // };



        case "REMOVE_SUBS_ITEM":

        default:
            return state;
    }
}

export default subscriptionsReducer




