import {
    ADD_USER_ERROR, ADD_USER_START, ADD_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_START,
    DELETE_USER_SUCCESS, GET_USER_ERROR, GET_USER_START, GET_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_START,
    UPDATE_USER_SUCCESS
} from "../constants/user.constant"



// GET USER
export const getUserStart = () => ({
    type: GET_USER_START,

})

export const getUserSuccess = (products) => ({
    type: GET_USER_SUCCESS,
    payload: products,
})

export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    payload: error,
})

// ADD USER
export const addUserStart = (product) => ({
    type: ADD_USER_START,
    payload: product,
})

export const addUserSuccess = (product) => ({
    type: ADD_USER_SUCCESS,
    payload: product,
})

export const addUserError = (error) => ({
    type: ADD_USER_ERROR,
    payload: error,
})

// DELETE USER
export const deleteUserStart = (product) => ({
    type: DELETE_USER_START,
    payload: product,

})

export const deleteUserSuccess = (product) => ({
    type: DELETE_USER_SUCCESS,
    payload: product,
})

export const deleteUserError = (error) => ({
    type: DELETE_USER_ERROR,
    payload: error,
})

// UPDATE USER
export const updateUserStart = (product) => ({
    type: UPDATE_USER_START,
    payload: product,
})

export const updateUserSuccess = (product) => ({
    type: UPDATE_USER_SUCCESS,
    payload: product,
})

export const updateUserError = (error) => ({
    type: UPDATE_USER_ERROR,
    payload: error,
})