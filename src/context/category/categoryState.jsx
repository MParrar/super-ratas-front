import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { GET_CATEGORIES } from "../../types";
import CategoryContext from "./categoryContext";
import { CategoryReducer } from "./categoryReducer";


const CategoryState = ({ children }) => {
    const initialState = {
        categories: [],
    }

    const [state, dispatch] = useReducer(CategoryReducer, initialState);

    const getCategories = async () => {
        try {
            const respuesta = await clienteAxios.get('categories');
            dispatch({
                type: GET_CATEGORIES,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CategoryContext.Provider
            value={{
                categories: state.categories,
                getCategories
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryState;