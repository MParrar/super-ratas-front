import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { GET_USERS } from "../../types";
import UserContext from "./userContext";
import { UserReducer } from "./userReducer";


const UserState = ({ children }) => {
    const initialState = {
        users: [],
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




    return (
        <UserContext.Provider
            value={{
                users: state.users,
                getUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserState;