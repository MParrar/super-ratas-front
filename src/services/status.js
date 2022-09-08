import clienteAxios from "../config/axios"

export const getStatus = async () => {
    try {
        const { data } = await clienteAxios.get('status');
        return data
    } catch (error) {
        console.log(error)
    }
}