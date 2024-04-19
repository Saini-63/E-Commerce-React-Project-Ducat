import { GET_PRODUCT_SUCCESS } from "../constants/product.constant";

let previousProduct = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

const initialState = {
    products: previousProduct ?? [],
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS:
            localStorage.setItem('products', JSON.stringify(action.payload));
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
}