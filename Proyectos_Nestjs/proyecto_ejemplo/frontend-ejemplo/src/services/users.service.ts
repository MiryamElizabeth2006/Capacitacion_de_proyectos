import {api} from '../api/api'
import type { User } from '../interfaces/user.interface'

export const getUsers = async (): Promise<User[]> => {
    const {data} = await api.get ('/users')
    return data
}

export const createUser = async (user: Partial<User>) => {
    const {data} = await api.post ('/users',user)
    return data
}

export const updateUser = async (id: number, user: Partial<User>) => {
    const {data} = await api.patch (`/users/${id}`, user)
    return data
}

export const deleteUser = async (id: number) => {
    await api.delete (`/users/${id}`)
}