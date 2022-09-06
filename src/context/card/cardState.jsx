import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { GET_CARDS, GET_CARDS_BY_CATEGORY } from "../../types";
import CardContext from "./cardContext";
import { CardReducer } from "./cardReducer";


const CardState = ({ children }) => {
    const initialState = {
        cards: [],
    }

    const [state, dispatch] = useReducer(CardReducer, initialState);

    const getCards = async () => {
        try {
            const respuesta = await clienteAxios.get('card');
            dispatch({
                type: GET_CARDS,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getCardsByCategory = async (category) => {
        try {
            const respuesta = await clienteAxios.get(`card/filter-category/${category}`);
            dispatch({
                type: GET_CARDS_BY_CATEGORY,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <CardContext.Provider
            value={{
                cards: state.cards,
                getCards,
                getCardsByCategory
            }}
        >
            {children}
        </CardContext.Provider>
    )
}

export default CardState;