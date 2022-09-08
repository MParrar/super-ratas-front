import clienteAxios from "../config/axios"

export const createCategory = async (category) => {
    try {
        const { data } = await clienteAxios.post('/categories/add', category);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const editCategory = async (category) => {
    try {
        const { data } = await clienteAxios.put(`/categories/update/${category.id}`, category);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory = async (category) => {
    try {
        const { data } = await clienteAxios.delete(`/categories/delete/${category.id}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}