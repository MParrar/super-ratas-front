import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { GET_USERS, LOGIN_ERROR, LOGIN_USER, LOGOUT_USER } from "../../types";
import UserContext from "./userContext";
import { UserReducer } from "./userReducer";


const UserState = ({ children }) => {
    const initialState = {
        users: [],
        user: null,
        authenticated: null,
        message: ''
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getUsers = async () => {
        try {
            const respuesta = await clienteAxios.get('user');
            dispatch({
                type: GET_USERS,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (user) => {
        try {
            const response = await clienteAxios.post('/user/login', user);
            dispatch({
                type: LOGIN_USER,
                payload: response.data,
            });


        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.message,
            });
            console.log(error.response)
        }
    };

    const logout = () => {
        dispatch({
            type: LOGOUT_USER
        })
    }


    return (
        <UserContext.Provider
            value={{
                users: state.users,
                user: state.user,
                authenticated: state.authenticated,
                message: state.message,
                getUsers,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserState;