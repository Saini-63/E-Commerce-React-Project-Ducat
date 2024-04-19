import {
    put,
    takeLatest
} from "redux-saga/effects"
import { ADD_CART_START, GET_CART_START } from "../constants/cart.constant"
import { addCartToFirebase, getCartFromFirebase } from "../services/cart.service"
import { addCartError, getCartError, getCartStart, getCartSuccess } from "../actions/cart.action"


function* getCart() {
    try {
        let result = yield getCartFromFirebase()
        yield put(getCartSuccess(result))
    } catch (error) {
        yield put(getCartError(error.message))
    }
}

function* addCart({
    payload
}) {
    console.log("fasfasf");
    try {
        yield addCartToFirebase(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(addCartError(error.message))
    }
}

export default function* cart() {
    yield takeLatest(GET_CART_START, getCart)
    yield takeLatest(ADD_CART_START, addCart)
}