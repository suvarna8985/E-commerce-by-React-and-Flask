import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from './slices/ProductSlice'

const store=configureStore({
    reducer:{
        Products:ProductSlice
    }
})
export default store