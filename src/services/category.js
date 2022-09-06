import clienteAxios from "../config/axios"

export const createCategory = async (category) => {
    try {
        const { data } = await clienteAxios.post('/categories/add', category);
        return data;
    } catch (error) {
        console.log(error)
    }
}