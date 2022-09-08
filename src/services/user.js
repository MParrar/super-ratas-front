import clienteAxios from "../config/axios"

export const createUser = async (user) => {
    try {
        const { data } = await clienteAxios.post('user/add', user)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const editUser = async (user) => {
    try {
        const { data } = await clienteAxios.put(`user/update/${user.id}`, user)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (user) => {
    try {
        const { data } = await clienteAxios.delete(`user/delete/${user.id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}