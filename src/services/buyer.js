import clienteAxios from "../config/axios"

export const getBuyers = async (buyer) => {
    try {
        const { data } = await clienteAxios.post(`card/buyer`, buyer)
        return data
    } catch (error) {
        console.log(error)
    }
}