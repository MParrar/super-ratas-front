import { GET_CARDS, GET_CARDS_BY_CATEGORY, GET_CARDS_BY_STATUS } from "../../types";


export const CardReducer = (state, action) => {
    switch (action.type) {
        case GET_CARDS_BY_CATEGORY:
        case GET_CARDS:
        case GET_CARDS_BY_STATUS:
            return {
                ...state,
                cards: action.payload
            }
        default:
            return state;
    }
}