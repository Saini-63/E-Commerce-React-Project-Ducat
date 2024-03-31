import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./category.reducer";
import { productReducer } from "./products.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
})