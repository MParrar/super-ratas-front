import { GET_CARDS, GET_CARDS_BY_CATEGORY } from "../../types";


export const CardReducer = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        case GET_CARDS_BY_CATEGORY:
        case GET_CARDS:
            return {
                ...state,
                cards: action.payload
            }
        default:
            return state;
    }
}