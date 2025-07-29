import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './features/Product';
import cartReducer from './features/Cart';
import categoryReducer from './features/Category';
import commonReducer from './features/Common';



const rootReducer = combineReducers({
    productState: productReducer,
    cartState: cartReducer,
    categoryState: categoryReducer,
    commonState: commonReducer

})


const store = configureStore({
    reducer: rootReducer,
})


export default store;