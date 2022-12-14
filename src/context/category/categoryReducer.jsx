import { GET_CATEGORIES } from "../../types";


export const CategoryReducer = (state, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }

        default:
            return state;
    }
}