import userReducer from "./Reducer";
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import subscriptionsReducer from "./subscriptionsReducer";


const rootReducer = combineReducers({
    userReducer,
    subscriptionsReducer,
    cartReducer
})

export default rootReducer