import { takeLatest, put } from "redux-saga/effects";
import { ADD_CATEGORY_START, DELETE_CATEGORY_START, GET_CATEGORY_START } from "../constants/category.constant";
import { addCategoryToFirebase, deleteCategoryToFirebase, getCategoryFromFirebase } from "../services/category.service";
import { addCategoryError, getCategoryError, getCategoryStart, getCategorySuccess } from "../actions/category.action";

function* addCategory({ payload }) {
    try {
        yield addCategoryToFirebase(payload);
    } catch (error) {
        yield put(addCategoryError(error.message));
    }
}

function* getCategory({ payload }) {
    try {
        let result = yield getCategoryFromFirebase();
        //console.log(result);
        yield put(getCategorySuccess(result));
    } catch (error) {
        yield put(getCategoryError(error.message));
    }
}

function* deleteCategory({ payload }) {
    try {
        yield deleteCategoryToFirebase(payload);
        yield put(getCategoryStart());
    } catch (error) {
        yield put(getCategoryError(error.message));
    }
}

export default function* category() {
    yield takeLatest(ADD_CATEGORY_START, addCategory);
    yield takeLatest(GET_CATEGORY_START, getCategory);
    yield takeLatest(DELETE_CATEGORY_START, deleteCategory);
}