import clienteAxios from "../config/axios"

export const createCard = async (card) => {
    try {
        const { data } = await clienteAxios.post('card/add', card);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const editCard = async (card) => {
    try {
        const { data } = await clienteAxios.put(`/card/update/${card.id}`, card);
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const changeStatusCard = async (card) => {
    console.log('Status')
    try {
        const { data } = await clienteAxios.put(`/card/change-status/${card.id}`, card);
        return data;
    } catch (error) {

    }
}


export const buyCard = async (buyer) => {
    try {
        const { data } = await clienteAxios.post(`/card/buy`, buyer);
        return data;
    } catch (error) {
        console.log(error)
    }
}