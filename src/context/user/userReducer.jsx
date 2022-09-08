import { GET_USERS, LOGIN_ERROR, LOGIN_USER, LOGOUT_USER } from "../../types";


export const UserReducer = (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                message: ""
            }
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload,
                authenticated: false,
                user: null
            }
        case LOGOUT_USER:
            return {
                ...state,
                users: [],
                user: null,
                authenticated: null,
                message: ''
            }
        default:
            return state;
    }
}