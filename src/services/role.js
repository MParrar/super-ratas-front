import clienteAxios from "../config/axios"

export const getRole = async () => {
    try {
        const { data } = await clienteAxios.get('role')
        return data;
    } catch (error) {
        console.log(error)
    }
}