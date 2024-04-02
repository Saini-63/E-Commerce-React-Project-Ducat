import {
    ADD_USER_ERROR, ADD_USER_START, ADD_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_START,
    DELETE_USER_SUCCESS, GET_USER_ERROR, GET_USER_START, GET_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_START,
    UPDATE_USER_SUCCESS
} from "../constants/user.constant"



// GET USER
export const getUserStart = () => ({
    type: GET_USER_START,

})

export const getUserSuccess = (users) => ({
    type: GET_USER_SUCCESS,
    payload: users,
})

export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    payload: error,
})

// ADD USER
export const addUserStart = (user) => ({
    type: ADD_USER_START,
    payload: user,
})

export const addUserSuccess = (user) => ({
    type: ADD_USER_SUCCESS,
    payload: user,
})

export const addUserError = (error) => ({
    type: ADD_USER_ERROR,
    payload: error,
})

// DELETE USER
export const deleteUserStart = (user) => ({
    type: DELETE_USER_START,
    payload: user,

})

export const deleteUserSuccess = (user) => ({
    type: DELETE_USER_SUCCESS,
    payload: user,
})

export const deleteUserError = (error) => ({
    type: DELETE_USER_ERROR,
    payload: error,
})

// UPDATE USER
export const updateUserStart = (user) => ({
    type: UPDATE_USER_START,
    payload: user,
})

export const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    payload: user,
})

export const updateUserError = (error) => ({
    type: UPDATE_USER_ERROR,
    payload: error,
})