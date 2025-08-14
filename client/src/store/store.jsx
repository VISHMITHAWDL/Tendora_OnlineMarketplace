import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './features/Product';
import cartReducer from './features/Cart';
import categoryReducer from './features/Category';
import commonReducer from './features/Common';
import userReducer from './features/User';


const rootReducer = combineReducers({
    productState: productReducer,
    cartState: cartReducer,
    userState: userReducer,
    categoryState: categoryReducer,
    commonState: commonReducer

})


const store = configureStore({
    reducer: rootReducer,
})


export default store;